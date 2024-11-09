'use client';

import { AirdropItem } from '@/lib/types';
import {
  contentStyle,
  descriptionStyle,
  linkIconStyle,
  linkStyle,
  linkTextStyle,
  linksWrapperStyle,
  projectLinkIconStyle,
  projectStyle,
  rowHeadStyle,
  rowStyle,
  tagDotStyle,
  tagStyle,
  tagTextStyle,
  tagsWrapperStyle,
  titleStyle,
} from './index.css';
import { AIRDROP_TYPE_NAMES } from '@/lib/costs';
import { Link } from 'react-feather';
import { useMemo } from 'react';

type Props = {
  item: AirdropItem;
};

export const AirdropCard = ({ item }: Props) => {
  const links = useMemo(() => {
    return [
      item.links.original_url
        ? {
            text: '公式の補足情報',
            href: item.links.original_url,
          }
        : null,
      item.links.pro_tweet_link
        ? {
            text: '先人の紹介ツイート',
            href: item.links.pro_tweet_link,
          }
        : null,
      item.links.pro_referral_link
        ? {
            text: `先人のリファ(${item.links.pro_referral_link.code})`,
            href: item.links.pro_referral_link.url,
          }
        : null,
      item.links.my_referral_link
        ? {
            text: `${item.links.pro_referral_link ? '私の' : ''}リファ(${item.links.my_referral_link.code})`,
            href: item.links.my_referral_link.url,
          }
        : null,
    ].filter((v): v is { text: string; href: string } => !!v);
  }, [item.links]);

  return (
    <div className={contentStyle}>
      <h4 className={titleStyle}>{item.title}</h4>

      <div className={rowStyle}>
        <p className={rowHeadStyle}>CATEGORIES</p>
        <div className={tagsWrapperStyle}>
          {item.types.map((tag, k) => (
            <div key={k} className={tagStyle}>
              <div className={tagDotStyle({ type: tag })}></div>
              <p className={tagTextStyle}>{AIRDROP_TYPE_NAMES[tag]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={rowStyle}>
        <p className={rowHeadStyle}>PROJECT</p>
        <div className={projectStyle}>
          <p className={descriptionStyle}>{item.project}</p>
          <a
            className={projectLinkIconStyle}
            target="_blank"
            href={item.project_url}
          >
            <Link width={14} height={14} />
          </a>
        </div>
      </div>

      <div className={rowStyle}>
        <p className={rowHeadStyle}>NOTE</p>
        <p className={descriptionStyle}>{item.description}</p>
      </div>

      <div className={rowStyle}>
        <p className={rowHeadStyle}>LINKS</p>
        <div className={linksWrapperStyle}>
          {links.map((link, k) => (
            <a key={k} className={linkStyle} target="_blank" href={link.href}>
              <div className={linkIconStyle}>
                <Link width={12} height={12} />
              </div>
              <p className={linkTextStyle}>{link.text}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
