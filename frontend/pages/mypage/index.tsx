import { NavigationHeader, PageLayout } from "@/components/layout";


function MypageHeader() {
   return <NavigationHeader title="마이페이지" /> 
}

export default function MyPage() {
    return <PageLayout
        header={<MypageHeader />}
    />
}