declare namespace kakao.maps{
    interface MarkerClusterOptions {
      map?: Map;
      markers?: CustomOverlay[];
      gridSize?: number;
      averageCenter?: boolean;
      minLevel?: number;
      minClusterSize?: number;
      styles?: object;
      texts?: string[]|(() => void);
      calculator?: number[];
      disableClickZoom?: boolean;
      clickable?: boolean;
      hoverable?: boolean;
    }
    class MarkerClusterer extends services.MarkerCluster{
        constructor(options?: MarkerClusterOptions)
    }
}