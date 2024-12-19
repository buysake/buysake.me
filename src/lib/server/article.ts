import { readFileSync, readdirSync } from 'fs';
import { Article, ArticleMetadataJson, TimelineItem } from '../types';
import { parseISO } from 'date-fns';
import { marked, Tokens } from 'marked';
import ogs from 'open-graph-scraper';
import { OgObject } from 'open-graph-scraper/dist/lib/types';
import Encoding from 'encoding-japanese';
import { sep } from 'path';

const ARTICLE_DIR = `${process.cwd()}/articles`;
const METADATA_FILE = 'metadata.json';
const CONTENT_FILE = 'content.md';

export const getArticlePaths = () => {
  return (
    readdirSync(ARTICLE_DIR, {
      recursive: true,
      withFileTypes: true,
    })
      // METADATA_FILE or CONTENT_FILE 以外のファイルは除外
      .filter(({ name }) => [METADATA_FILE, CONTENT_FILE].includes(name))
      // ディレクトリでgroup by
      .reduce(
        (prev, dirent) => {
          const dir = dirent.path;
          const name = dirent.name;
          const foundIndex = prev.findIndex((p) => p.dir === dir);
          return foundIndex === -1
            ? [...prev, { dir, files: [name] }]
            : prev.map((p, i) =>
                i === foundIndex ? { ...p, files: [...p.files, name] } : p
              );
        },
        [] as { dir: string; files: string[] }[]
      )
      // METADATA_FILE & CONTENT_FILE どちらも存在するディレクトリに絞る
      .filter(
        ({ files }) =>
          files.includes(METADATA_FILE) && files.includes(CONTENT_FILE)
      )
      .map(({ dir }) => {
        const slug = dir.split(sep).findLast(() => true) ?? '';
        return { dir, slug };
      })
  );
};

export const getArticleList = (): TimelineItem[] => {
  return getArticlePaths().map(({ dir, slug }) => {
    const json = readFileSync(`${dir}/metadata.json`);
    const metadata = JSON.parse(json.toString()) as ArticleMetadataJson;
    return {
      type: 'self',
      date: parseISO(metadata.date),
      tags: metadata.tags,

      link: {
        href: `/articles/${slug}`,
        title: metadata.title,
      },
    };
  });
};

export const getArticle = async (slug: string): Promise<Article | null> => {
  const paths = getArticlePaths();
  const path = paths.find((p) => p.slug === slug);
  if (!path) return null;

  const markdown = readFileSync(`${path.dir}/content.md`);
  const json = readFileSync(`${path.dir}/metadata.json`);
  const metadata = JSON.parse(json.toString()) as ArticleMetadataJson;
  const html = await markdownToRawHtml(markdown.toString());

  return {
    title: metadata.title,
    date: parseISO(metadata.date),
    tags: metadata.tags,
    body: html,
  };
};

type TokenSingleLink = Tokens.Generic & {
  ogp?: OgObject;
  appleMusic?: { originalUrl: string };
  spotifyMusic?: { originalUrl: string };
  tweet?: { originalUrl: string };
  youtube?: { originalUrl: string };
};

export const markdownToRawHtml = (json: string) => {
  const tokenType = 'singlelink';

  marked.use({
    extensions: [
      {
        level: 'inline',
        name: tokenType,
        tokenizer: (src) => {
          const reg = /^https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+$/;
          const cap = reg.exec(src);
          if (cap) {
            return {
              type: tokenType,
              raw: cap[0],
              url: cap[0],
            } as TokenSingleLink;
          }
          return undefined;
        },
        renderer: (token) => {
          if (token.appleMusic) {
            return makeAppleMusicEmbed(token.appleMusic.originalUrl);
          }
          if (token.spotify) {
            return makeSpotifyEmbed(token.spotify.originalUrl);
          }
          if (token.youtube) {
            return makeYouTubeEmbed(token.youtube.originalUrl);
          }
          if (token.tweet) {
            return makeTweetEmbed(token.tweet.originalUrl);
          }
          if (token.ogp) {
            return makeOGPHtml(token.ogp, token.url);
          }
          return new marked.Renderer().link.call(
            this,
            token.url,
            token.url,
            token.url
          );
        },
      },
    ],
    walkTokens: async (token) => {
      if (token.type === tokenType) {
        token.appleMusic = detectAppleMusic(token.url);
        token.spotify = detectSpotify(token.url);
        token.tweet = detectTweet(token.url);
        token.youtube = detectYouTube(token.url);
        if (token.appleMusic || token.spotify || token.tweet || token.youtube) {
          return;
        }
        token.ogp = await fetchOGP(token.url);
      }
    },
    async: true,
  });

  return marked(json);
};

const makeOGPHtml = (ogp: OgObject, url: string) => {
  const { ogTitle, ogUrl, ogDescription, ogImage } = ogp;

  const imgHtml = ogImage
    ? `<img src="${ogImage[0].url}" />`
    : `<span class="empty"></span>`;

  return `<a class="ogp" target="_blank" href="${url}">
            <span class="img">
              ${imgHtml}
            </span>
            <span class="text">
              <span>${new URL(ogUrl ?? url).host}</span>
              <span class="title">${ogTitle}</span>
              <span>${ogDescription ?? ''}</span>
            </span>
          </a>`;
};

const makeTweetEmbed = (url: string) => {
  return `
    <blockquote class="twitter-tweet"><p lang="ja" dir="ltr"></p><a href="${url.replace(/x\.com/, 'twitter.com')}"></a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  `;
};

const makeAppleMusicEmbed = (url: string) => {
  const src =
    url.replace(/music\.apple\.com/, 'embed.music.apple.com') +
    '&app=music&itsct=music_box_player&itscg=30200&ls=1&theme=light';

  return `
    <iframe id="embedPlayer" src="${src}" frameborder="0" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" allow="autoplay *; encrypted-media *; clipboard-write" height="190" style="width: 100%; overflow: hidden; border-radius: 10px; transform: translateZ(0px); animation: 2s ease 0s 6 normal none running loading-indicator; background-color: rgb(228, 228, 228);"></iframe>
  `;
};

const makeSpotifyEmbed = (url: string) => {
  const src = url.replace(
    /open\.spotify\.com\/track\//,
    'open.spotify.com/embed/track/'
  );

  return `
    <iframe style="border-radius:12px; aspect-ratio: 16/4; min-height: 160px;" src="${src}" width="100%" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
  `;
};

const makeYouTubeEmbed = (url: string) => {
  const v = new URL(url).searchParams.get('v');
  const t = new URL(url).searchParams.get('t');
  const query = t ? `?start=${t}` : '';

  return `
    <iframe width="100%" style="aspect-ratio: 16/9;" src="https://www.youtube.com/embed/${v}${query}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `;
};

const fetchOGP = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      'user-agent':
        'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)',
    },
  }).catch(() => null);

  if (!response) {
    return null;
  }

  const uint8ArrayHtml = await response
    .arrayBuffer()
    .then((buffer) => new Uint8Array(buffer));

  const convertedHtml = Encoding.codeToString(
    Encoding.convert(uint8ArrayHtml, 'UNICODE')
  );

  const res = await ogs({
    html: convertedHtml,
  });

  if (res.result) {
    return res.result;
  }

  return null;
};

const detectTweet = (url: string) => {
  const match = url.match(
    /https:\/\/(twitter|x)\.com\/[A-Za-z0-9_]{1,}\/status\/[0-9]{18,}/
  );

  if (match) {
    return {
      originalUrl: url,
    };
  }

  return undefined;
};

const detectAppleMusic = (url: string) => {
  const data = new URL(url);
  const matchPath = !!(data.host + data.pathname).match(
    /music.apple.com\/[^\/].+\/album\/([^\/].+)/
  );
  const matchQuery = !!data.searchParams.get('i');

  if (matchPath && matchQuery) {
    return {
      originalUrl: url,
    };
  }

  return undefined;
};

const detectSpotify = (url: string) => {
  const match = url.match(/open\.spotify\.com\/track\/[A-Za-z0-9]{1,}/);

  if (match) {
    return {
      originalUrl: url,
    };
  }

  return undefined;
};

const detectYouTube = (url: string) => {
  const match = url.match(/youtube\.com\/watch\?v=/);
  if (match) {
    return {
      originalUrl: url,
    };
  }

  return undefined;
};
