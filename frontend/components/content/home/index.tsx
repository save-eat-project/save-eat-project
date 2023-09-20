import { useLogout } from "@/hook/user";
import { Button } from "antd";

export function HomeContent() {
	const logout = useLogout()
	return <div>
		<Button onClick={() => logout.mutate()}>{'로그아웃'}</Button>
	</div>
}