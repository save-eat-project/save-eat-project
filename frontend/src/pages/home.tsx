import styles from '@styles/home.module.css';
import { MapComponent } from '../component/mapComponent';
import { SearchComponent } from '../component/searchComponent';
import kakaoMapContext from '../hook/kakaoMapContext';
import { useRef, useState } from 'react';

export function HomePage() {
  const [mapElement, setMapElement] = useState<kakao.maps.Map|null>(null)
  return <div className={styles.title}>
    <img src="logo.png" />
    <kakaoMapContext.Provider value={{mapElement, setMapElement}}>
      <SearchComponent/>
      <MapComponent/>
    </kakaoMapContext.Provider>
  </div>
}