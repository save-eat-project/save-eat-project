import { SpoqaHanSansNeoFont } from "@/lib/font"
import { ReactNode } from "react"
import styled from 'styled-components'


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

const HeaderContainer = styled.div`
	height: 48px;
	background-color: white;
	position: relative;
	/* display: flex; */

	.left {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;

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

		display: flex;
		align-items: center;
		justify-content: center;
	}
`

type NavigationHeaderProps = {
	left?: ReactNode,
	title?: ReactNode,
	right?: ReactNode,
}
export function NavigationHeader(props: NavigationHeaderProps) {
	return <HeaderContainer>
		<div className={'left'}>{props.left}</div>
		<div className={'title'}>{props.title}</div>
		<div className={'right'}>{props.right}</div>
	</HeaderContainer>
}