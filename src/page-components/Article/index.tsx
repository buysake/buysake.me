'use client';

import { Article } from '@/lib/types';
import { ArticleBody } from '@/components/ArticleBody';
import { ArticleMetadata } from '@/components/ArticleMetadata';
import {
  backIconStyle,
  backStyle,
  bodyWrapperStyle,
  contentStyle,
  metadataWrapperStyle,
} from './index.css';
import { Image } from '@/components/Image';

type Props = {
  article: Article;
};

export const ArticlePage = ({ article }: Props) => {
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

      <div className={metadataWrapperStyle}>
        <ArticleMetadata {...article} />
      </div>
      <div className={bodyWrapperStyle}>
        <ArticleBody html={article.body} />
      </div>
    </div>
  );
};
