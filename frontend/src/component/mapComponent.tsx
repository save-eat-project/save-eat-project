import React, { useEffect, useState } from "react";
import styles from '@styles/home.module.css';
import useGeolocation from '../hook/useGeolocation';

//https://www.npmjs.com/package/@types/kakaomaps
//https://apis.map.kakao.com/web/

interface Props{
    currentLocation?:{
        lat:number;
        lng:number
    }
    kakaoMap?:kakao.maps.Map
};

interface Marker {
    /** Marker Title */
    title: string;
    /** category */
    category: string;
    /** Latitude */
    star: number;
    /** Latitude */
    lat: number;
    /** Longitude */
    lng: number;
}

const TEMPORARY_MARKER_ARRAY:Marker[] = [
    {
        title:"케인인님",
        category:"한식",
        star:4.5,
        lat:37.50099124412733,
        lng:126.92195582690313
    },
    {
        title:"하더놈",
        category:"한식",
        star:4.0,
        lat:37.55462296347773,
        lng:126.97055261672732 
    },
    {
        title:"NAGA",
        category:"한식",
        star:3.5,
        lat:37.49994497956837,
        lng:126.92031146347219  
    }
];

export function MapComponent(props:Props) {
    const [state,setState] = useState(props);
    const location = useGeolocation();

    const mapStyle = {
        width: "80%",
        height: "600px",
    };
    
    //Initialize Map 생성 useEffect
    useEffect(() => {
        let container = document.getElementById('map');
        
        let options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(37.511337, 127.012084), //지도의 중심좌표.
            level: 8 //지도의 레벨(확대, 축소 정도)
        };
    
        if(!container) return;
        
        let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴    
        map.setCopyrightPosition(kakao.maps.CopyrightPosition.BOTTOMRIGHT, true);   //zoom레벨 오른쪽아래로 설정(기본 왼쪽아래)

        TEMPORARY_MARKER_ARRAY.map((marker) => {
            var position = new kakao.maps.LatLng(marker.lat, marker.lng);
            new kakao.maps.Marker({
                map: map,
                position: position,
                icon: {
                    content: `<div class="${styles.markerContainer}">
                            <div class="${styles.markerBubble}">                            
                                <div class="${styles.leftBox}">
                                    <img src="/fork.png">
                                    </img>
                                </div>
                                <div class="${styles.rightBox}">
                                    <div class="${styles.restaurantName}">
                                    ${marker.title}
                                    </div>
                                    <div class="${styles.bottom}">
                                        <div class="${styles.score}">
                                        ☆${marker.star}
                                        </div>
                                        <div class="${styles.category}">
                                        ${marker.category}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
                }
            });
        });

        setState({
            ...state,
            kakaoMap:map
        })
    }, []);

    //GeoLocation(내 위치 찾기) 기능 useEffect
    useEffect(() => {
        if(location.loaded === true){            
            if(!location.coordinates)
                return;

            const lat = location.coordinates.lat;
            const lng = location.coordinates.lng;

            //GeoLocation이 성공적으로 Load됐을 경우, state.location에 위도경도를 set
            //이후 아래 useEffect가 렌더링 됐을 때 호출
            setState({
                ...state,
                currentLocation:{                        
                    lat:lat,
                    lng:lng
                }
            });
        }else if(location.loaded === false){
            if(location.error?.code !== undefined){
                console.log("Geolocation Load Error\n"
                + "code : " + location.error?.code + "\n"
                + "message : " + location.error?.message);
            }            
        }
    }, [location.loaded]);
    
    //state.currentLocation 업데이트될 때 호출.
    //지도를 현재 위치로 이동하며, 현재 위치에 마커를 생성합니다.
    useEffect(() => {
        if(!state.currentLocation)
            return;

        var lat = state.currentLocation.lat;
        var lng = state.currentLocation.lng;

        //zoom level
        //~6(100km)
        //7(50km)
        //8(30km)
        //9(20km)
        //10(10km)
        //11(5km)
        //12(3km)
        //13(1km)
        //14(500m)  
        //15(300m)
        //16(100m)
        //17(50m)
        //18(30m)   
        //19(20m)
        //20(10m)
        //21~(5m)

        if(!state.kakaoMap) return;
        
        // state.kakaoMap.setCenter(new kakao.maps.LatLng(lat, lng));
        // state.kakaoMap.setLevel(3);
        
        //내 현재 위치 마커로 찍기
        var position = new kakao.maps.LatLng(lat, lng);
        new kakao.maps.Marker({
            map: state.kakaoMap,
            position: position,
        });
        
        setState({
            ...state,
            currentLocation:{                        
                lat:lat,
                lng:lng
            }
        });        
    }, [state.currentLocation]);

    return (
        <main>         
            <h1>지도</h1>
            <div id="map" style={mapStyle}></div>            
        </main>
    )
}