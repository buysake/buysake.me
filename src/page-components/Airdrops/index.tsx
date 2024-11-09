'use client';

import { AirdropItem } from '@/lib/types';
import {
  backIconStyle,
  backStyle,
  contentStyle,
  sectionWrapperStyle,
  pageTitleStyle,
  headStyle,
  pageDescriptionStyle,
  itemsStyle,
} from './index.css';
import { Image } from '@/components/Image';
import { AirdropCard } from '@/components/AirdropCard';

type Props = {
  airdrops: AirdropItem[];
};

export const AirdropsPage = ({ airdrops }: Props) => {
  return (
    <div className={contentStyle}>
      <a className={backStyle} href="/">
        <Image
          className={backIconStyle}
          src={'/images/buysakeme.png'}
          alt="トップページ"
          webpSrc=""
        />
      </a>
      <div className={sectionWrapperStyle}>
        <div className={headStyle}>
          <h1 className={pageTitleStyle}>お金拾い</h1>
          <p className={pageDescriptionStyle}>
            札束の殴り合いには参加せず、穴場探しに徹するのが基本方針。
          </p>
        </div>
      </div>
      <div className={sectionWrapperStyle}>
        <div className={itemsStyle}>
          {airdrops.map((item, i) => (
            <AirdropCard item={item} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
