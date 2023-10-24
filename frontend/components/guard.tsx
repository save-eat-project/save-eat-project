import { useLoginStatusQuery, useUserActive } from "@/hook/user"
import { ReactNode, useEffect } from "react"

import { LogoIcon } from "@/components/icon"
import { LoadingOutlined } from "@ant-design/icons"
import { useRouter } from "next/router"
import styled from "styled-components"

const SplashContainer = styled.div<{ visible?: boolean }>`
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    flex-direction: column;
    opacity: ${props => props.visible ? 1 : 0};
    transition: opacity 0.2s ease-in-out;
`

type SplashCoverProps = {
	visible: boolean,
}
export function SplashCover(props: SplashCoverProps) {
	return <SplashContainer visible={props.visible}>
		<LogoIcon height={200} width={200} />
		<LoadingOutlined style={{ fontSize: 36, marginTop: 36 }} spin />
	</SplashContainer>
}

type LoginGuardProps = {
	children?: ReactNode,
}
export function LoginGuard(props: LoginGuardProps) {
	const { isSuccess, data: loginStatus } = useLoginStatusQuery()
	const router = useRouter()

	useEffect(() => {
		if (!isSuccess) return
		switch (loginStatus) {
			case false:
			case "logout":
				router.replace("/login")
				break
		}
	}, [isSuccess, loginStatus])

	if (isSuccess) {
		switch (loginStatus) {
			case true:
			case "logout":
				return props.children
		}
	}

	return <SplashCover visible />
}
