import React, { useEffect, useState, useContext } from "react"
import styles from '@styles/mapComponent.module.css'
import useGeolocation from '../hook/useGeolocation'
import kakaoMapContext from "../hook/kakaoMapContext"
import {MARKER_TYPE, MarkerComponent} from "../component/markerComponent"

//https://www.npmjs.com/package/@types/kakaomaps
//https://apis.map.kakao.com/web/

//state 인터페이스
interface State{
    currentLocation?:{
        lat:number
        lng:number
    }
    kakaoMap?:kakao.maps.Map
    markerPosition?:[number, number]
}

//마커 정보 인터페이스
interface Marker {
    /** place name */
    name: string
    /** place address */
    address: string
    /** star rate */
    star: number
    /** Latitude */
    lat: number
    /** Longitude */
    lng: number

    /** ImagePath */
    img: string
}

//테스트용 임시 마커 DB
const TEMPORARY_MARKER_ARRAY:Marker[] = [
    {
        name:"할매칼국수",
        address:"서울 강서구 월정로 108 해창위너스빌",
        star:4.0,
        lat:37.52881156943704,
        lng:126.83914457889723,
        img: ""
    },
    {
        name:"ALLPUB",
        address:"서울 강서구 강서로5나길 118 2층 ALLPUB",
        star:4.0,
        lat:37.528443203079554,
        lng:126.84158337385955,
        img: ""
    },
    {
        name:"하서랑 만두 국수",
        address:"서울 강서구 곰달래로 105 1층",
        star:3.5,
        lat:37.53053291184251,
        lng:126.84451199458245,
        img: "" 
    }
]

export function MapComponent() {
    var mapContext = useContext(kakaoMapContext)
    const [state,setState] = useState<State>({})
    const location = useGeolocation()

    //Initialize시 Map 생성 useEffect
    useEffect(() => {
        let container = document.getElementById('map')           
        if(!container) return
        
        let map = new kakao.maps.Map(container, {
            center: new kakao.maps.LatLng(37.511337, 127.012084), //지도의 중심좌표.
            level: 8 //지도의 레벨(확대, 축소 정도)            
        })
        map.setCopyrightPosition(kakao.maps.CopyrightPosition.BOTTOMRIGHT, true)   //zoom레벨 오른쪽아래로 설정(기본 왼쪽아래)

        var markers = TEMPORARY_MARKER_ARRAY.map((marker) => {
            var position = new kakao.maps.LatLng(marker.lat, marker.lng)
            return new kakao.maps.CustomOverlay({
                map: map,
                position: position,
                content: `<div class="${styles.markerContainer}">
                            <div class="${styles.markerBubble}">        
                                <div class="${styles.titleBox}">   
                                    <div class="${styles.iconBox}">                            
                                        <div class="${styles.img}">    
                                        </div>                                  
                                    </div>                                         
                                    <div class="${styles.restaurantName}">  
                                        ${marker.name}       
                                    </div>               
                                    <div class="${styles.starRate}">                                           
                                        <div>                          
                                            <div class="${styles.img}">    
                                            </div>                                      
                                            <div>    
                                                ${marker.star}    
                                            </div>  
                                        </div>       
                                    </div>     
                                </div> 
                                <div class="${styles.contentBox}">    
                                    <div class="${styles.imageBox}">    
                                        <div
                                            class="${styles.img}" 
                                        > 
                                               
                                        </div>                          
                                    </div>                          
                                    <div class="${styles.infoBox}">   
                                        ${marker.address}        
                                    </div>                          
                                </div>                                  
                            </div>
                        </div>`
                
            })
        })      
        
        //마커 클러스터 테스트코드
        // var clusterer = new kakao.maps.MarkerClusterer(
        //     {
        //         markers: markers,
        //         map: map,
        //         gridSize: 35,
        //         averageCenter: true,
        //         minLevel: 6,
        //         disableClickZoom: true,
        //         // styles: [{
        //         //     width : '53px', height : '52px',
        //         //     background: 'url(cluster.png) no-repeat',
        //         //     color: '#fff',
        //         //     textAlign: 'center',
        //         //     lineHeight: '54px'
        //         // }]
        //     }
        // )

        mapContext.setMapElement(map)

        setState({
            ...state,
            kakaoMap:map
        })
    }, [])

    //GeoLocation(내 위치 찾기) 기능 useEffect
    useEffect(() => {
        SaveLocation()
    }, [location.loaded])
    
    //state.currentLocation 업데이트될 때 호출.
    //지도를 현재 위치로 이동하며, 현재 위치에 마커를 생성합니다.
    useEffect(() => {
        if(!state.currentLocation)
            return

        if(!state.kakaoMap)
            return

        var lat = state.currentLocation.lat
        var lng = state.currentLocation.lng
        
        state.kakaoMap.setCenter(new kakao.maps.LatLng(lat, lng))
        state.kakaoMap.setLevel(3)

        setState({
            ...state,
            markerPosition:[lat,lng]
        })
    }, [state.currentLocation])

    const onCurrentLocationClick = () => {
        SaveLocation()
    }

    function SaveLocation(){        
        if(location.loaded === true){            
            if(!location.coordinates)
                return

            const lat = location.coordinates.lat
            const lng = location.coordinates.lng

            //GeoLocation이 성공적으로 Load됐을 경우, state.location에 위도경도를 set
            //이후 아래 useEffect가 렌더링 됐을 때 호출
            setState({
                ...state,
                currentLocation:{                        
                    lat:lat,
                    lng:lng
                }
            })
        }else if(location.loaded === false){
            if(location.error?.code !== undefined){
                console.log("Geolocation Load Error\n"
                + "code : " + location.error?.code + "\n"
                + "message : " + location.error?.message)
            }            
        }
    }

    return (
        <div>         
            <h1>지도</h1>
            <div className={styles.mapContainer}>
                <div id="map" className={styles.kakaoMap}></div>
                <button className={styles.locationButton} onClick={onCurrentLocationClick}>
                    <div className={styles.locationButtonImage}></div>
                    <div className={styles.locationButtonText}>
                        내 위치
                    </div>     
                </button>  
                {
                    (state.markerPosition)
                    ?<MarkerComponent position={state.markerPosition} markerType={MARKER_TYPE.MYLOCATION}/>
                    :null                
                }                          
            </div>
        </div>
    )
}