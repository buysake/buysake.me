import { getArticle, getArticlePaths } from '@/lib/server/article';
import { ArticlePage } from '@/page-components/Article';

export const generateStaticParams = () => {
  return getArticlePaths().map((slug) => ({ slug }));
};

export const generateMetadata = async ({ params }: Props) => {
  const article = await getArticle(params.slug);

  const url = `https://buysake.me/article/${params.slug}`;

  const title = article.title;

  return {
    title: article.title,
    description: null,
    openGraph: {
      url,
      description: null,
      images: ['/opengraph-image.png'],
    },
    twitter: {
      title,
      url,
      description: null,
      images: ['/opengraph-image.png'],
    },
    alternates: {
      canonical: url,
    },
  };
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
