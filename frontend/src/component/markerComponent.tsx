import { useEffect, useState, useContext } from "react"
import kakaoMapContext from "../hook/kakaoMapContext"

//https://www.npmjs.com/package/@types/kakaomaps
//https://apis.map.kakao.com/web/

export enum MARKER_TYPE{
    SEARCH,
    MYLOCATION
}

interface MarkerProps{
    position: [number, number]
    markerType: MARKER_TYPE
}

export function MarkerComponent(props:MarkerProps) {
    const mapContext = useContext(kakaoMapContext)
    const [searchMarker] = useState(() => new kakao.maps.Marker)
    const [locationMarker] = useState(() => new kakao.maps.Marker)
    const map = mapContext.mapElement
        
    useEffect(() => {
        searchMarker.setMap(map)
        locationMarker.setMap(map)
        return() => {
            searchMarker.setMap(null)
            locationMarker.setMap(null)
        }
    }, [])

    useEffect(() => {
        if(props.markerType == MARKER_TYPE.MYLOCATION){
            
            // 마커 이미지의 이미지 주소입니다
            var imageSize = new kakao.maps.Size(48, 48) 
            var imageSrc = './NewCurrentPoint_Red.svg' 
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize) 
        
            locationMarker.setImage(markerImage);
            locationMarker.setPosition(
                new kakao.maps.LatLng(...props.position)
            )
        }else if(props.markerType == MARKER_TYPE.SEARCH){
            searchMarker.setPosition(
                new kakao.maps.LatLng(...props.position)
            )
        }
    }, [props])

    return (
        <>       
        </>
    )
}