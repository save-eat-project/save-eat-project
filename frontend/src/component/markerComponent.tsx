import { useEffect, useState, useContext } from "react"
import kakaoMapContext from "../hook/kakaoMapContext"

//https://www.npmjs.com/package/@types/kakaomaps
//https://apis.map.kakao.com/web/

interface MarkerProps{
    position: [number, number]
}

export function MarkerComponent(props:MarkerProps) {
    const mapContext = useContext(kakaoMapContext)
    const [marker] = useState(() => new kakao.maps.Marker)
    const map = mapContext.mapElement
        
    useEffect(() => {
        marker.setMap(map)
        return() => {
            marker.setMap(null)
        }
    }, [])

    useEffect(() => {
        marker.setPosition(
            new kakao.maps.LatLng(...props.position)
        )
    }, [props.position])

    return (
        <main>       
        </main>
    )
}