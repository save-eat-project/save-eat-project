import { useEffect, useState, useContext, ReactNode, useMemo } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

//https://www.npmjs.com/package/@types/kakaomaps
//https://apis.map.kakao.com/web/

interface MarkerProps {
    children: ReactNode
    position: [number, number]
    kakaoMap: kakao.maps.Map
}

export function CustomOverlay(props: MarkerProps) {
    const customOverlay = useMemo(() => new kakao.maps.CustomOverlay(), [])

    useEffect(() => {
        customOverlay.setMap(props.kakaoMap)
    }, [props.kakaoMap])

    useEffect(() => {
        const element = document.createElement('div')
        const root = createRoot(element)

        const position = new kakao.maps.LatLng(...props.position)

        customOverlay.setMap(props.kakaoMap)
        customOverlay.setPosition(position)

        customOverlay.setContent(element)

        root.render(props.children)
        return () => {
            customOverlay.setMap(null)
            root.unmount()
        }
    }, [])

    return null
}
