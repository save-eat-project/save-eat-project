import React, { useEffect, useState } from "react";
import styles from '@styles/home.module.css';
import useGeolocation from '../hook/useGeolocation';

/*
네이버지도 API
https://navermaps.github.io/maps.js.ncp/docs/naver.maps.Map.html
*/

interface Props{
    currentLocation?:{
        lat:number;
        lng:number
    }
    naverMap?:naver.maps.Map
};

interface Marker {
    /** Marker Title */
    title: string;
    /** Latitude */
    lat: number;
    /** Longitude */
    lng: number;
}

const TEMPORARY_MARKER_ARRAY:Marker[] = [
    {
        title:"케인인님",
        lat:37.50099124412733,
        lng:126.92195582690313
    },
    {
        title:"하더놈",
        lat:37.55462296347773,
        lng:126.97055261672732 
    },
    {
        title:"NAGA",
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

    const markerStyle ={
        position: "absolute",
        right: "100px",
        top: "100px",
        borderLeft: "20px solid transparent",
        borderRight: "20px solid transparent",
        borderTop: "30px solid #22ac38"
    }
    
    //Initialize Map 생성 useEffect
    useEffect(() => {
        const mapOptions: naver.maps.MapOptions = {
            center: new naver.maps.LatLng(37.511337, 127.012084),
            zoom: 13,
        };

        const map = new naver.maps.Map("map", mapOptions);

        TEMPORARY_MARKER_ARRAY.map((marker) => {
            var position = new naver.maps.LatLng(marker.lat, marker.lng);
            new naver.maps.Marker({
                position: position,
                map: map,           
            });
        });
        setState({
            ...state,
            naverMap:map
        })
    }, []);

    //GeoLocation(내 위치 찾기) 기능 useEffect
    useEffect(() => {
        if(location.loaded === true){            
            if(!location.coordinates)
                return;
            
            //GeoLocation이 성공적으로 Load됐을 경우, state.location에 위도경도를 set
            //이후 아래 useEffect가 렌더링 됐을 때 호출
            setState({
                ...state,
                currentLocation:{                        
                    lat:location.coordinates.lat,
                    lng:location.coordinates.lng
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

        if(!state.naverMap) return;
        state.naverMap.morph(new naver.maps.LatLng(lat, lng), 18);
        // var position = new naver.maps.LatLng(lat, lng);
        var position = new naver.maps.LatLng(37.52818267851292, 126.84215524162691  );

        new naver.maps.Marker({
            map: state.naverMap,
            position: position,
            icon:{
                content:`<div class="${styles.markerContainer}">
                            <div class="${styles.markerBubble}">                            
                                <div class="${styles.leftBox}">
                                    <img src="/fork.png">
                                    </img>
                                </div>
                                <div class="${styles.rightBox}">
                                    <div class="${styles.restaurantName}">
                                    끼얏호우
                                    </div>
                                    <div class="${styles.bottom}">
                                        <div class="${styles.score}">
                                        ☆4.5
                                        </div>
                                        <div class="${styles.category}">
                                        한식
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
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