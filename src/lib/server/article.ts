import { readFileSync, readdirSync } from 'fs';
import { Article, ArticleMetadataJson, TimelineItem } from '../types';
import { parseISO } from 'date-fns';
import { marked } from 'marked';
import ogs from 'open-graph-scraper';
import { OgObject } from 'open-graph-scraper/dist/lib/types';
import Encoding from 'encoding-japanese';

const ARTICLE_DIR = `${process.cwd()}/articles`;

export const getArticlePaths = (): string[] => {
  return readdirSync(ARTICLE_DIR);
};

export const getArticleList = (): TimelineItem[] => {
  return getArticlePaths().map((path) => {
    const json = readFileSync(`${ARTICLE_DIR}/${path}/metadata.json`);
    const metadata = JSON.parse(json.toString()) as ArticleMetadataJson;
    return {
      type: 'self',
      date: parseISO(metadata.date),
      tags: metadata.tags,

      link: {
        href: `/articles/${path}`,
        title: metadata.title,
      },
    };
  });
};

export const getArticle = async (slug: string): Promise<Article> => {
  const markdown = readFileSync(`${ARTICLE_DIR}/${slug}/content.md`);
  const json = readFileSync(`${ARTICLE_DIR}/${slug}/metadata.json`);
  const metadata = JSON.parse(json.toString()) as ArticleMetadataJson;
  const html = await markdownToRawHtml(markdown.toString());

  return {
    title: metadata.title,
    date: parseISO(metadata.date),
    tags: metadata.tags,
    body: html,
  };
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
              ogp: null,
            };
          }
          return undefined;
        },
        renderer: (token) => {
          if (token.ogp) {
            return makeOGPHtml(token.ogp, token.url);
          } else {
            return new marked.Renderer().link.call(
              this,
              token.url,
              token.url,
              token.url
            );
          }
        },
      },
    ],
    walkTokens: async (token) => {
      if (token.type === tokenType) {
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
              <span>${new URL(ogUrl ?? '').host}</span>
              <span class="title">${ogTitle}</span>
              <span>${ogDescription}</span>
            </span>
          </a>`;
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
