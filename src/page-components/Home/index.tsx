'use client';

import { Profile } from '@/components/Profile';
import { contentStyle, sectionWrapperStyle } from './index.css';
import { groupingTimeline } from '@/lib/client/timeline';
import { TimelineItem } from '@/lib/types';
import { Timeline } from '@/components/Timeline';

type Props = {
  timeline: TimelineItem[];
};

export const HomePage = (props: Props) => {
  return (
    <div className={contentStyle}>
      <div className={sectionWrapperStyle}>
        <Profile />
      </div>
      <div className={sectionWrapperStyle}>
        <Timeline timeline={groupingTimeline(props.timeline)} />
      </div>
    </div>
  );
};
