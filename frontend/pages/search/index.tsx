import { FooterComponent } from "@/components/FooterComponent"
import { HeaderComponent, SearchHeader } from "@/components/HeaderComponent"
import { SearchComponent } from "./SearchComponent"

export default function SearchPage() {
    return (
        <>
            <SearchHeader />
            <SearchComponent />
            <FooterComponent />
        </>
    )
}