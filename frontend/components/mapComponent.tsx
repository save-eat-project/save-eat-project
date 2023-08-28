import React, { ReactEventHandler, useEffect, useState } from 'react'
import styles from 'styles/mapComponent.module.css'
import useGeolocation from '../hooks/useGeolocation'
import { MARKER_TYPE, MarkerComponent } from '../components/markerComponent'

//https://www.npmjs.com/package/@types/kakaomaps
//https://apis.map.kakao.com/web/

//prettier 설치
//https://velog.io/@dum6894/%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-vscode-prettier-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%82%AC%EC%9A%A9%EB%B2%95

//state 인터페이스
interface State {
    currentLocation?: {
        lat: number
        lng: number
    }
    kakaoMap?: kakao.maps.Map
    markerPosition?: [number, number]
}

//마커 정보 인터페이스
interface customOverlay {
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
const TEMPORARY_MARKER_ARRAY: customOverlay[] = [
    {
        name: '할매칼국수',
        address: '서울 강서구 월정로 108 해창위너스빌',
        star: 4.0,
        lat: 37.52881156943704,
        lng: 126.83914457889723,
        img: '/test_pic.png',
    },
    {
        name: 'ALLPUB',
        address: '서울 강서구 강서로5나길 118 2층 ALLPUB',
        star: 4.0,
        lat: 37.528443203079554,
        lng: 126.84158337385955,
        img: '',
    },
    {
        name: '하서랑 만두 국수',
        address: '서울 강서구 곰달래로 105 1층',
        star: 3.5,
        lat: 37.53053291184251,
        lng: 126.84451199458245,
        img: '',
    },
]

export function MapComponent() {
    const [state, setState] = useState<State>({})
    const location = useGeolocation()

    //Initialize시 Map 생성 useEffect
    useEffect(() => {
        let container = document.getElementById('map')
        if (!container) return
            
        let map = new kakao.maps.Map(container, {
            //지도의 중심좌표.
            center: new kakao.maps.LatLng(37.511337, 127.012084),

            //지도의 레벨(확대, 축소 정도)
            level: 8,
        })
        
        //zoom레벨 오른쪽아래로 설정(기본 왼쪽아래)
        map.setCopyrightPosition(kakao.maps.CopyrightPosition.BOTTOMRIGHT, true)

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

        setState({
            ...state,
            kakaoMap: map,
        })
    }, [])

    //GeoLocation(내 위치 찾기) 기능 useEffect
    useEffect(() => {
        SaveLocation()
    }, [location.loaded])

    //state.currentLocation 업데이트될 때 호출.
    //지도를 현재 위치로 이동하며, 현재 위치에 마커를 생성합니다.
    useEffect(() => {
        if (!state.currentLocation) return
        if (!state.kakaoMap) return

        var { lat, lng } = state.currentLocation

        // var lat = state.currentLocation.lat
        // var lng = state.currentLocation.lng

        state.kakaoMap.setCenter(new kakao.maps.LatLng(lat, lng))
        state.kakaoMap.setLevel(3)

        setState({
            ...state,
            markerPosition: [lat, lng],
        })
    }, [state.currentLocation])

    function SaveLocation() {
        if (location.loaded === true) {
            if (!location.coordinates) return

            const lat = location.coordinates.lat
            const lng = location.coordinates.lng

            //GeoLocation이 성공적으로 Load됐을 경우, state.location에 위도경도를 set
            //이후 아래 useEffect가 렌더링 됐을 때 호출
            setState({
                ...state,
                currentLocation: {
                    lat: lat,
                    lng: lng,
                },
            })
        } else if (location.loaded === false) {
            if (location.error?.code !== undefined) {
                console.log(
                    'Geolocation Load Error\n' +
                        'code : ' +
                        location.error?.code +
                        '\n' +
                        'message : ' +
                        location.error?.message
                )
            }
        }
    }

    return (
        <div>
            <div className={styles.mapContainer}>
                <div id="map" className={styles.kakaoMap}></div>
                <button className={styles.locationButton} onClick={SaveLocation}>
                    <div className={styles.locationButtonImage}></div>
                    <div className={styles.locationButtonText}>내 위치</div>
                </button>
                {state.markerPosition ? (
                    <MarkerComponent
                        position={state.markerPosition}
                        markerType={MARKER_TYPE.MYLOCATION}
                        kakaoMap={state.kakaoMap!}
                    />
                ) : null}
            </div>
            {TEMPORARY_MARKER_ARRAY.map((markerInfo: customOverlay, index: number) => {
                const onCustomOverlayClick = () => {
                    console.log(markerInfo.name)
                }

                return (
                    <MarkerComponent
                        key={index}
                        children={
                            <>
                                <div className={styles.markerBubbleContainer}>
                                    <div
                                        className={styles.markerBubble}
                                        onClick={onCustomOverlayClick}
                                    >
                                        <div className={styles.titleBox}>
                                            <div className={styles.iconBox}></div>
                                            <div className={styles.restaurantName}>
                                                {markerInfo.name}
                                            </div>
                                            <div className={styles.starRateBox}>
                                                <div className={styles.starImg}></div>
                                                <div className={styles.starRate}>
                                                    {markerInfo.star}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.contentBox}>
                                            <div className={styles.imageBox}>
                                                <div
                                                    className={styles.img}
                                                    style={{
                                                        backgroundImage: `url(${markerInfo.img})`,
                                                    }}
                                                ></div>
                                            </div>
                                            <div className={styles.infoBox}>
                                                {markerInfo.address}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        position={[markerInfo.lat, markerInfo.lng]}
                        markerType={MARKER_TYPE.CUSTOM_OVERLAY}
                        kakaoMap={state.kakaoMap!}
                    />
                )
            })}
        </div>
    )
}
