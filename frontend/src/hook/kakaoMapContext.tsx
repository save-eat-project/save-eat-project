import React, {createContext} from "react";

const kakaoMapContext = createContext<{
    mapElement:kakao.maps.Map|null,
    setMapElement(map:kakao.maps.Map|null):void
}>(null!);

export default kakaoMapContext;