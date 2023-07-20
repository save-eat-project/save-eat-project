import React, { useEffect, useState, useContext } from 'react'
import styles from '@styles/searchComponent.module.css'
import { MARKER_TYPE, MarkerComponent } from '../component/markerComponent'
import {
    LeftOutlined,
    RightOutlined,
    SearchOutlined,
    AudioOutlined,
} from '@ant-design/icons'
import { Input } from 'antd'

//https://www.npmjs.com/package/@types/kakaomaps
//https://apis.map.kakao.com/web/

//state 인터페이스
interface State {
    //Geolocation 후크로 받아온 현재 위치
    currentLocation?: {
        lat: number
        lng: number
    }

    //카카오맵 API Place검색 서비스를 통해 받아온 결과
    search?: {
        result: any[] //검색된 가게정보와 같은 실질적인 정보
        status: kakao.maps.services.Status //검색결과 상태
        pagination: kakao.maps.services.Pagination //페이지관련 콜백 및 정보
    }

    //검색결과 지도로 이동 시 사용할 마커의 위도좌도 좌표
    markerPosition?: [number, number]

    kakaoMap?: kakao.maps.Map
}

export function SearchComponent() {
    const { Search } = Input

    const [state, setState] = useState<State>({
        currentLocation: undefined,
        search: undefined,
        markerPosition: undefined,
        kakaoMap: undefined,
    })

    useEffect(() => {
        let container = document.getElementById('map')
        if (!container) return

        let map = new kakao.maps.Map(container, {
            //지도의 중심좌표.
            center: new kakao.maps.LatLng(37.511337, 127.012084),
        })

        map.setLevel(8)

        setState({
            ...state,
            kakaoMap: map,
        })
    }, [])

    const onSearchButtonClick = (value: string) => {
        console.log(value)
        if (value === '') return

        //장소검색 콜백
        var SearchCallback = function (
            result: any[],
            status: kakao.maps.services.Status,
            pagination: kakao.maps.services.Pagination,
        ) {
            //검색결과가 정상적으로 반환됐을 때.
            if (
                status === kakao.maps.services.Status.OK ||
                status === kakao.maps.services.Status.ZERO_RESULT
            ) {
                setState({
                    ...state,
                    search: {
                        result: result,
                        status: status,
                        pagination: pagination,
                    },
                })
                //검색결과 에러 발생 시
            } else {
                var status: kakao.maps.services.Status
                var pagination: kakao.maps.services.Pagination

                //state에 저장된 검색결과 비어있는 데이터로 덮어쓰기
                setState({
                    ...state,
                    search: undefined,
                })
            }
        }

        var places = new kakao.maps.services.Places(undefined!)

        places.keywordSearch(value, SearchCallback, {
            location: state.kakaoMap?.getCenter(), //현재 지도의 Center를 지정합니다.
            category_group_code: 'FD6', //카테고리그룹을 음식점으로 지정합니다.
            sort: kakao.maps.services.SortBy.ACCURACY, //정확한 결과로 검색합니다.
            size: MAX_DISPLAYED_SEARCHRESULT, //한 페이지에 몇개의 결과를 띄울 것인지 선택합니다. (기본 15)
        })
    }

    //검색결과 출력함수
    function SearchResultReturn() {
        if (!state.search) return <div>검색 결과가 없습니다.</div>

        const jsonString = JSON.stringify(state.search.result)
        const jsonObject = JSON.parse(jsonString)

        //총 검색결과 나누기 15로 몇 개의 페이지가 존재하는지 계산합니다.
        //webpack config의 상수로 선언되어있습니다.
        const maxPage = Math.ceil(
            state.search.pagination.totalCount / MAX_DISPLAYED_SEARCHRESULT,
        )

        if (maxPage === 0) {
            return <div>검색 결과가 없습니다.</div>
        }

        return (
            <>
                {jsonObject.map((element: any, index: number) => {
                    //지도로 이동 버튼 클릭
                    const onSelectButtonClick = () => {
                        const { x: lng, y: lat } = element

                        if (!state.kakaoMap) return

                        //마커가 지도 중앙에 보이도록 이동합니다.
                        const latlng = new kakao.maps.LatLng(lat, lng)
                        state.kakaoMap.setCenter(latlng)
                        state.kakaoMap.setLevel(2)

                        //MarkerComponent를 호출하기 위해 state를 set합니다.
                        setState({
                            ...state,
                            markerPosition: [lat, lng],
                        })
                    }
                    return (
                        <li
                            className={styles.SearchCard}
                            key={index}
                            onClick={onSelectButtonClick}
                        >
                            <div className={styles.Top}>
                                <div className={styles.PlaceName}>
                                    {element.place_name}
                                </div>
                                <div className={styles.Buttons}>
                                    <button>선택</button>

                                    <div className={styles.DivideLine} />

                                    <button
                                        className={styles.Url}
                                        onClick={() =>
                                            window.open(
                                                `${element.place_url}`,
                                                '_blank',
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className={styles.Content}>
                                <div className={styles.Category}>
                                    {element.category_name.replace(
                                        '음식점 > ',
                                        '',
                                    )}
                                </div>
                                <div className={styles.Address}>
                                    {element.road_address_name}
                                </div>
                                <div className={styles.Phone}>
                                    {'전화번호 : ' +
                                        (element.phone === ''
                                            ? '등록되지 않음'
                                            : element.phone)}
                                </div>
                            </div>
                        </li>
                    )
                })}
                <div className={styles.Page}>
                    <LeftOutlined
                        className={styles.LeftButton}
                        disabled={
                            state.search.pagination.hasPrevPage ? false : true
                        }
                        onClick={() => state.search?.pagination.prevPage()}
                    />
                    <div className={styles.PageNumber}>
                        {state.search.pagination.current + ' / ' + maxPage}
                    </div>
                    <RightOutlined
                        className={styles.RightButton}
                        disabled={
                            state.search.pagination.hasNextPage ? false : true
                        }
                        onClick={() => state.search?.pagination.nextPage()}
                    />
                </div>
            </>
        )
    }

    return (
        <>
            <div className={styles.SearchTextContainer}>
                <Search
                    placeholder="input search text"
                    onSearch={onSearchButtonClick}
                    style={{ width: 200 }}
                />
                <div className={styles.SearchResultText}>
                    {state.search
                        ? '검색결과 : ' + state.search.pagination.totalCount
                        : null}
                </div>
            </div>
            <div className={styles.SearchResultContainer}>
                <ul className={styles.SearchList}>{SearchResultReturn()}</ul>
            </div>
            {state.markerPosition ? (
                <MarkerComponent
                    position={state.markerPosition}
                    markerType={MARKER_TYPE.SEARCH}
                    kakaoMap={state.kakaoMap!}
                />
            ) : null}
            <div className={styles.mapContainer}>
                <div id="map" className={styles.kakaoMap} />
            </div>
        </>
    )
}
