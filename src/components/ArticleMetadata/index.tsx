import { Calendar, Tag } from 'react-feather';
import { format } from 'date-fns';

import { Article } from '@/lib/types';

import {
  kvIconWrapperStyle,
  kvStyle,
  kvTextStyle,
  kvsStyle,
  titleStyle,
} from './index.css';

type Props = Pick<Article, 'tags' | 'date' | 'title'>;

export const ArticleMetadata = ({ date, title, tags }: Props) => {
  return (
    <div>
      <h1 className={titleStyle}>{title}</h1>
      <div className={kvsStyle}>
        <div className={kvStyle}>
          <div className={kvIconWrapperStyle}>
            <Calendar size={14} height={14} />
          </div>
          <p className={kvTextStyle}>{format(date, 'yyyy/MM/dd')}</p>
        </div>
        <div className={kvStyle}>
          <div className={kvIconWrapperStyle}>
            <Tag size={14} height={14} />
          </div>
          <p className={kvTextStyle}>{tags?.join(',')}</p>
        </div>
      </div>
    </div>
  );
};
