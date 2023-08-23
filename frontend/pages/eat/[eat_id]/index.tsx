import { useRouter } from "next/router"

export default function EatViewPage() {
    const { eat_id } = useRouter().query

    return <div>
        EatViewPage: {eat_id}
    </div>
}