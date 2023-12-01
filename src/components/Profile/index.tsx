import { GitHub, Twitter } from 'react-feather';

import { Image } from '@/components/Image';

import {
  biographyStyle,
  contentStyle,
  iconStyle,
  iconWrapperStyle,
  linkLabelIconStyle,
  linkLabelStyle,
  linkLabelTextStyle,
  linksStyle,
  nameStyle,
  textWrapperStyle,
} from './index.css';

export const Profile = () => {
  const links = [
    { Icon: Twitter, text: '@buy_sake', href: 'https://twitter.com/buy_sake' },
    { Icon: GitHub, text: 'buysake', href: 'https://github.com/buysake' },
  ];

  return (
    <div className={contentStyle}>
      <div className={iconWrapperStyle}>
        <Image
          src="images/icon.jpg"
          webpSrc=""
          alt="sake"
          className={iconStyle}
        />
      </div>
      <div className={textWrapperStyle}>
        <h3 className={nameStyle}>sake</h3>
        <p className={biographyStyle}>
          公営賭博の自動化をやっているElixirエンジニア。TypeScriptも好き。
        </p>
        <div className={linksStyle}>
          {links.map(({ Icon, text, href }, i) => (
            <a className={linkLabelStyle} key={i} href={href} target="_blank">
              <div className={linkLabelIconStyle}>
                <Icon width={15} height={15} />
              </div>
              <p className={linkLabelTextStyle}>{text}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
