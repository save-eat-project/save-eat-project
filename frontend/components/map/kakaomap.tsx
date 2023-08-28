import Script from "next/script";
import { Component, ReactNode, useEffect, useState } from "react";

export function KakaoMap({children}: { children: any }) {    
    const [ready, setReady] = useState(false)
    //쿼터 제한
    //https://developers.kakao.com/docs/latest/ko/quota/common
    //기본 지도 JS SDK 30만건
    //키워드 장소 검색 10만건
    //주소 검색 10만건

    return <>
        <Script
                src={
                    `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&libraries=services,clusterer&autoload=false`
                }
                onLoad={
                    () => {
                        kakao.maps.load(()=>{
                            setReady(true)
                        })
                    }
                    
                }
            >
        </Script>
        {ready ? children : null}
    </>
}
