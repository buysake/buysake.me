'use client';

import { format } from 'date-fns';
import { TimelineItem } from '@/lib/timeline';
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
  const [iconSrc, hostSite] = useMemo(() => {
    if (item.type === 'zenn') {
      return ['images/zenn.png', 'Zenn'];
    }

    if (item.type === 'note') {
      return ['images/note.png', 'note'];
    }

    return ['', ''];
  }, [item.type]);

  return (
    <a className={contentStyle} target={'_blank'} href={item.link.href}>
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
