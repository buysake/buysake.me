import { getArticle, getArticlePaths } from '@/lib/server/article';
import { ArticlePage } from '@/page-components/Article';

export const generateStaticParams = () => {
  return getArticlePaths().map((slug) => ({ slug }));
};

type Props = {
  params: {
    slug: string;
  };
};

export default async function Article({ params }: Props) {
  const article = await getArticle(params.slug);
  return <ArticlePage article={article} />;
}
