import { FooterComponent } from "@/components/FooterComponent";
import { HeaderComponent } from "@/components/HeaderComponent";
import { MypageComponent1 } from "./MypageComponent";

export default function MyPage() {
    return (
        <>
            <HeaderComponent />
            <MypageComponent1 />
            <FooterComponent />
        </>
    )
}