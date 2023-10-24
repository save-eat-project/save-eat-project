import { HomeContent } from "@/components/content/home"
import { LoginGuard } from "@/components/guard"
import { Logo2Icon } from "@/components/icon"
import { HeaderLayout, PageLayout } from "@/components/layout"

function HomeHeader() {
	return <HeaderLayout
		title={<Logo2Icon height={24} />}
	/>
}

export default function HomePage() {
	return <LoginGuard>
		<PageLayout
			header={<HomeHeader />}
			content={<HomeContent />}
		/>
	</LoginGuard>
}
