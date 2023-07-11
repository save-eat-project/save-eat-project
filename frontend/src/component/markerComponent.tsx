import { useEffect, useState, useContext } from 'react'
import kakaoMapContext from '../hook/kakaoMapContext'

//https://www.npmjs.com/package/@types/kakaomaps
//https://apis.map.kakao.com/web/

export enum MARKER_TYPE {
    SEARCH,
    MYLOCATION,
}

interface MarkerProps {
    position: [number, number]
    markerType: MARKER_TYPE
    kakaoMap: kakao.maps.Map
}

export function MarkerComponent(props: MarkerProps) {
    const [marker] = useState(() => new kakao.maps.Marker())

    useEffect(() => {
        marker.setMap(props.kakaoMap)
        return () => {
            marker.setMap(null)
        }
    }, [])

    useEffect(() => {
        if (props.markerType == MARKER_TYPE.MYLOCATION) {
            // 마커 이미지의 이미지 주소입니다
            var imageSize = new kakao.maps.Size(48, 48)
            var imageSrc = './NewCurrentPoint_Red.svg'
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

            marker.setImage(markerImage)
            marker.setPosition(new kakao.maps.LatLng(...props.position))
        } else if (props.markerType == MARKER_TYPE.SEARCH) {
            marker.setPosition(new kakao.maps.LatLng(...props.position))
        }
    }, [props])

    return <></>
}
