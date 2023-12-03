import { readFileSync, readdirSync } from 'fs';
import { Article, ArticleMetadataJson, TimelineItem } from '../types';
import { parseISO } from 'date-fns';
import { marked } from 'marked';

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
  const html = await marked(markdown.toString());

  return {
    title: metadata.title,
    date: parseISO(metadata.date),
    tags: metadata.tags,
    body: html,
  };
};
