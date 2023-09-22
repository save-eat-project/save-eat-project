import { SpoqaHanSansNeoFont } from "@/lib/font"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import styled from 'styled-components'
import BackIcon from '@material-design-icons/svg/round/arrow_back_ios_new.svg'
import { Button } from "antd"


const PageContainer = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	background-color: #f3f3f3;
	display: flex;
	flex-direction: column;
	max-width: 480px;
	margin: 0 auto;
`

type LayoutProps = {
	header?: ReactNode,
	footer?: ReactNode,
	content?: ReactNode,
}
export function PageLayout(props: LayoutProps) {
	return <PageContainer className={SpoqaHanSansNeoFont.className}>
		{props.header}
		{props.content}
		{props.footer}
	</PageContainer>
}

type HeaderContainerProps = {
	transparent?: boolean
}
const HeaderContainer = styled.div<HeaderContainerProps>`
	height: 48px;
	background-color: ${props => props.transparent ? 'transparent' : 'white'};
	position: relative;
	
	.left {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		padding-left: 4px;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.title {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.right {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		padding-right: 4px;

		display: flex;
		align-items: center;
		justify-content: center;
	}
`

type HeaderLayoutProps = {
	transparent?: boolean
	left?: ReactNode,
	title?: ReactNode,
	right?: ReactNode,
}
export function HeaderLayout(props: HeaderLayoutProps) {
	return <HeaderContainer transparent={props.transparent}>
		<div className={'title'}>{props.title}</div>
		<div className={'left'}>{props.left}</div>
		<div className={'right'}>{props.right}</div>
	</HeaderContainer>
}


type NavigationHeaderProps = {
	transparent?: boolean
	title?: ReactNode,
	right?: ReactNode,
}
export function NavigationHeader(props: NavigationHeaderProps) {
	const router = useRouter()

	function navigateBack() {
		router.back()
	}

	return <HeaderLayout
		left={
			<Button
				type="link"
				icon={<BackIcon height={24} width={24} />}
				onClick={navigateBack}
			/>
		}
		{...props}
	/>
}