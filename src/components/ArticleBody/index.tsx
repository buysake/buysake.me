import { bodyContentStyle } from './index.css';

type Props = {
  html: string;
};

export const ArticleBody = ({ html }: Props) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className={bodyContentStyle}
    />
  );
};
