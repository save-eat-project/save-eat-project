import { HomeContent } from '@/components/content/home';
import { Logo2Icon } from '@/components/icon';
import { NavigationHeader, PageLayout } from '@/components/layout';

function HomeHeader() {
  return <NavigationHeader
    title={<Logo2Icon height={24} />}
  />
}

export default function HomePage() {
  return <PageLayout
    header={<HomeHeader />}
    content={<HomeContent />}
  />
}
