import { useEffect, ReactNode, useMemo } from 'react'
import { createRoot } from 'react-dom/client'

//https://www.npmjs.com/package/@types/kakaomaps
//https://apis.map.kakao.com/web/

export enum MARKER_TYPE {
    SEARCH,
    MYLOCATION,
    CUSTOM_OVERLAY,
}

interface MarkerProps {
    children?: ReactNode
    position: [number, number]
    markerType: MARKER_TYPE
    kakaoMap: kakao.maps.Map
}

export function MarkerComponent(props: MarkerProps) {
    const marker = useMemo(() => new kakao.maps.Marker(), [])
    const customOverlay = useMemo(() => new kakao.maps.CustomOverlay(), [])

    useEffect(() => {
        const element = document.createElement('div')
        const root = createRoot(element)

        if (props.markerType == MARKER_TYPE.MYLOCATION) {
            var imageSize = new kakao.maps.Size(48, 48)
            var imageSrc = './NewCurrentPoint_Red.svg'
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

            marker.setImage(markerImage)
        } else if (props.markerType == MARKER_TYPE.CUSTOM_OVERLAY) {
            const position = new kakao.maps.LatLng(...props.position)

            customOverlay.setMap(props.kakaoMap)
            customOverlay.setPosition(position)

            customOverlay.setContent(element)

            root.render(props.children)
        }

        return () => {
            marker.setMap(null)
            customOverlay.setMap(null)
            root.unmount()
        }
    }, [])

    useEffect(() => {
        if (
            props.markerType == MARKER_TYPE.SEARCH ||
            props.markerType == MARKER_TYPE.MYLOCATION
        ) {
            marker.setMap(props.kakaoMap)
        } else if (props.markerType == MARKER_TYPE.CUSTOM_OVERLAY) {
            customOverlay.setMap(props.kakaoMap)
        }
    }, [props.kakaoMap])

    useEffect(() => {
        if (
            props.markerType == MARKER_TYPE.MYLOCATION ||
            props.markerType == MARKER_TYPE.SEARCH
        ) {
            marker.setPosition(new kakao.maps.LatLng(...props.position))
        }
    }, [props.position])

    return <></>
}
