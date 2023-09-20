import { LoginContent } from "@/components/content/login";
import { PageLayout, NavigationHeader } from "@/components/layout";


function LoginHeader() {
  return <NavigationHeader title={'로그인'} />
}


export default function LoginPage() {
  return <PageLayout
    header={<LoginHeader />}
    content={<LoginContent />}
  />
}