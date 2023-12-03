import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
import { GroupedTimeline, TimelineItem } from '../types';

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

export const calcDistanceNow = (date: Date) => {
  const distance = formatDistanceToNow(date, { addSuffix: true });

  return distance.match(/year/)
    ? formatDistanceToNowStrict(date, { addSuffix: true, unit: 'month' })
    : distance;
};
