import { getAirdropList } from '@/lib/server/airdrop';
import { AirdropsPage } from '@/page-components/Airdrops';
import { Metadata } from 'next';

const description = 'いわゆるエアドロが狙えそうなプロジェクトやキャンペーン';
const url = 'https://buysake.me/airdrops';

export const metadata: Metadata = {
  title: 'お金拾い',
  description,
  openGraph: {
    url,
    description,
    images: ['/opengraph-image.png'],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    description,
    images: ['/opengraph-image.png'],
  },
  alternates: {
    canonical: url,
  },
};

export default async function Airdrops() {
  const airdrops = getAirdropList();

  return <AirdropsPage airdrops={airdrops} />;
}
