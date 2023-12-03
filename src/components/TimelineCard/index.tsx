'use client';

import { format } from 'date-fns';
import { TimelineItem } from '@/lib/types';
import {
  contentStyle,
  hostStyle,
  logoStyle,
  metaStyle,
  metaTextStyle,
  titleStyle,
} from './index.css';
import { useMemo } from 'react';
import { Image } from '../Image';

type Props = {
  item: TimelineItem;
};

export const TimelineCard = ({ item }: Props) => {
  const [iconSrc, hostSite, target] = useMemo(() => {
    if (item.type === 'zenn') {
      return ['images/zenn.png', 'Zenn', '_blank'];
    }

    if (item.type === 'note') {
      return ['images/note.png', 'note', '_blank'];
    }

    if (item.type === 'self') {
      return ['images/buysakeme.png', 'buysake.me', undefined];
    }

    return ['', '', undefined];
  }, [item.type]);

  return (
    <a className={contentStyle} target={target} href={item.link.href}>
      <h4 className={titleStyle}>{item.link.title}</h4>
      <div className={metaStyle}>
        <div className={hostStyle}>
          <Image
            src={iconSrc}
            alt={item.type}
            webpSrc={''}
            className={logoStyle}
          />
          <p className={metaTextStyle}>{hostSite}</p>
        </div>
        <p className={metaTextStyle}>{format(item.date, 'yyyy/MM/dd')}</p>
      </div>
    </a>
  );
};
