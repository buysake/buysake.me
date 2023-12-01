'use client';

import { FileText } from 'react-feather';
import { GroupedTimeline } from '@/lib/timeline';
import {
  contentStyle,
  dateBlockStyle,
  emptySpaceStyle,
  headIconInnerStyle,
  headIconStyle,
  headStyle,
  headTextStyle,
  itemsWrapperStyle,
  itemWrapperStyle,
} from './index.css';
import { TimelineCard } from '../TimelineCard';

type Props = {
  timeline: GroupedTimeline;
};

export const Timeline = ({ timeline }: Props) => {
  return (
    <div className={contentStyle}>
      <div className={dateBlockStyle}>
        <div className={emptySpaceStyle} />
      </div>
      {timeline.map(({ distance, items }, index) => (
        <div key={index} className={dateBlockStyle}>
          <div className={headStyle}>
            <div className={headIconStyle}>
              <div className={headIconInnerStyle}>
                <FileText width={16} height={16} />
              </div>
            </div>
            <p className={headTextStyle}>{distance}</p>
          </div>
          <div className={itemsWrapperStyle}>
            {items.map((item, index) => (
              <div key={index} className={itemWrapperStyle}>
                <TimelineCard item={item} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
