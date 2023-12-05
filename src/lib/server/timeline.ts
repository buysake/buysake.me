import { XMLParser } from 'fast-xml-parser';
import { RssFeed, TimelineItem } from '../types';
import { getArticleList } from './article';

const NOTE_RSS = 'https://note.com/buy_sake/rss';
const ZENN_RSS = 'https://zenn.dev/buy_sake/feed';

const IGNORE_TAG = 'ポエム';

export const fetchTimelines = async (ignoreTag = IGNORE_TAG) => {
  return Promise.all([
    fetchTimeline(NOTE_RSS, 'note'),
    fetchTimeline(ZENN_RSS, 'zenn'),
    getArticleList(),
  ])
    .then(([note, zenn, self]) => [...note, ...zenn, ...self])
    .then((ts) => ts.filter((t) => !(t?.tags ?? []).includes(ignoreTag)));
};

const fetchTimeline = async (
  url: string,
  type: TimelineItem['type']
): Promise<Array<TimelineItem>> => {
  return fetch(url)
    .then((r) => r.text())
    .then((xml) => {
      const parser = new XMLParser();
      return parser.parse(xml);
    })
    .then((xml) => {
      return xml.rss.channel.item.map((v: RssFeed) => ({
        type,
        date: new Date(v.pubDate),
        link: {
          title: v.title,
          href: v.link,
        },
      }));
    });
};
