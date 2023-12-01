import { fetchTimelines } from '@/lib/timeline';
import { HomePage } from '@/page-components/Home';

export default async function Home() {
  const timeline = await fetchTimelines();
  return <HomePage timeline={timeline} />;
}
