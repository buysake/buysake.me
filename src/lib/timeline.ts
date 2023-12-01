import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
import { XMLParser } from 'fast-xml-parser';

const NOTE_RSS = 'https://note.com/buy_sake/rss';
const ZENN_RSS = 'https://zenn.dev/buy_sake/feed';

export type TimelineType = 'zenn' | 'note';

export type TimelineItem = {
  date: Date;
  type: TimelineType;
  link: {
    title: string;
    href: string;
  };
};

export type GroupedTimeline = Array<{
  distance: string;
  date: Date;
  items: Array<TimelineItem>;
}>;

// TODO: tzの話
export const groupingTimeline = (items: TimelineItem[]) => {
  const grouped = items
    .reduce((acc, item) => {
      const distance = calcDistanceNow(item.date);

      const foundIndex = acc.findIndex((v) => v.distance === distance);

      return foundIndex == -1
        ? [
            ...acc,
            {
              distance: distance,
              date: item.date,
              items: [item],
            },
          ]
        : acc.map((v, index) => {
            if (index === foundIndex) {
              return {
                ...v,
                items: [...v.items, item].sort((a, b) =>
                  a.date < b.date ? 1 : -1
                ),
              };
            }
            return v;
          });
    }, [] as GroupedTimeline)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return grouped;
};

export const fetchTimelines = async () => {
  return Promise.all([
    fetchTimeline(NOTE_RSS, 'note'),
    fetchTimeline(ZENN_RSS, 'zenn'),
  ]).then(([note, zenn]) => [...note, ...zenn]);
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
      return xml.rss.channel.item.map((v: any) => ({
        type,
        date: new Date(v.pubDate),
        link: {
          title: v.title,
          href: v.link,
        },
      }));
    });
};

export const calcDistanceNow = (date: Date) => {
  const distance = formatDistanceToNow(date, { addSuffix: true });

  return distance.match(/year/)
    ? formatDistanceToNowStrict(date, { addSuffix: true, unit: 'month' })
    : distance;
};
