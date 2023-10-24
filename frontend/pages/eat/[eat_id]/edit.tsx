import { useRouter } from "next/router"

export default function EatEditPage() {
	const { eat_id } = useRouter().query
	return <div>
		EatEditPage: {eat_id}
	</div>
}
