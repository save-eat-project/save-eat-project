import React, { useEffect, useState, useContext } from "react"
import styles from '@styles/searchComponent.module.css'
import kakaoMapContext from "../hook/kakaoMapContext"
import {MARKER_TYPE, MarkerComponent} from "../component/markerComponent"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"

//https://www.npmjs.com/package/@types/kakaomaps
//https://apis.map.kakao.com/web/

/**
 * Todo
 * 
 * 도로명주소로 검색기능 추가.
 * 혹시나 가게 검색기능으로 안나왔을 경우에 추가하는 것.
 * 이 때는 마커에 드래그기능을 추가할 것
 * 
 * 커스텀 컴포넌트 접기 / 펼치기기능 넣기?
 * 
 * 
 */

//state 인터페이스
interface State{
    //Geolocation 후크로 받아온 현재 위치
    currentLocation?:{
        lat:number
        lng:number
    }
    //카카오맵 API Place검색 서비스를 통해 받아온 결과
    search?:{
        result:any[]                                //검색된 가게정보와 같은 실질적인 정보
        status:kakao.maps.services.Status           //검색결과 상태
        pagination:kakao.maps.services.Pagination   //페이지관련 콜백 및 정보
    }
    //검색결과 지도로 이동 시 사용할 마커의 위도좌도 좌표
    markerPosition?:[number, number]
}

export function SearchComponent() {
    const mapContext = useContext(kakaoMapContext)
    const [state,setState] = useState<State>({})
    const [searchText, setSearchText] = useState('')    //검색어 보관용
    const [searchType, setSearchType]
            = useState<kakao.maps.services.SortBy>(kakao.maps.services.SortBy.ACCURACY) //라디오버튼 구분용

    const onRadioChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        //검색 타입 다른걸로 변경하면 검색 결과 초기화
        setState({
            ...state,
            search:undefined
        })

        if(e.target.value === kakao.maps.services.SortBy.ACCURACY.toString()){
            setSearchType(kakao.maps.services.SortBy.ACCURACY)
        }else{
            setSearchType(kakao.maps.services.SortBy.DISTANCE)
        }
    }

    //검색어 입력 change 콜백
    const onSearchTextChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        //searchText state에 현재 입력된 검색어를 보관합니다.
        //이후에 검색버튼을 눌렀을 때 getElementByID와 같은 검색메서드를 사용하지 않기 위함입니다.
        setSearchText(e.target.value)
    }

    //검색버튼 클릭
    const onSearchButtonClick = () => {
        if(searchText === "" ) return
        
        //장소검색 콜백
        var SearchCallback = function(result:any[], status:kakao.maps.services.Status,pagination:kakao.maps.services.Pagination) {

            //검색결과가 정상적으로 반환됐을 때.
            if (status === kakao.maps.services.Status.OK ||
                status === kakao.maps.services.Status.ZERO_RESULT) {
                setState({
                    ...state,
                    search:{                        
                        result:result,
                        status:status,
                        pagination:pagination
                    }
                })
            //검색결과 에러 발생 시
            }else {
                var status:kakao.maps.services.Status
                var pagination:kakao.maps.services.Pagination

                //state에 저장된 검색결과 비어있는 데이터로 덮어쓰기
                setState({
                    ...state,
                    search:undefined
                })
            }
        }

        var places = new kakao.maps.services.Places(undefined!)

        places.keywordSearch(searchText, SearchCallback, {
            location: mapContext.mapElement?.getCenter(),   //현재 지도의 Center를 지정합니다.
            category_group_code: "FD6",                     //카테고리그룹을 음식점으로 지정합니다.
            sort: searchType,                               //선택한 정확도 / 가까운 순에 따라 검색합니다.
            size: MAX_DISPLAYED_SEARCHRESULT                //한 페이지에 몇개의 결과를 띄울 것인지 선택합니다. (기본 15)
        })    
    }

    //검색 텍스트박스 클릭시 검색결과 초기화
    //->검색결과 출력 함수 계속 렌더링 될 때마다 호출돼서 추가.
    const onSearchTextFocus = () => {
        //검색 결과 초기화
        setState({
            ...state,
            search:undefined
        })        
    }

    //검색결과 페이지 이전버튼 클릭
    const onPrevPageClick = () => {
        state.search?.pagination.prevPage()
    }

    //검색결과 페이지 다음버튼 클릭
    const onNextPageClick = () => {
        state.search?.pagination.nextPage()
    }

    //검색결과 출력함수
    function SearchResultReturn(){
        if(!state.search)
            return

        const jsonString = JSON.stringify(state.search.result)
        const jsonObject = JSON.parse(jsonString)

        //총 검색결과 나누기 15로 몇 개의 페이지가 존재하는지 계산합니다.
        //webpack config의 상수로 선언되어있습니다.
        const maxPage = Math.ceil(state.search.pagination.totalCount / MAX_DISPLAYED_SEARCHRESULT)
        
        if(maxPage === 0){
            return(
                <div>
                    검색 결과가 없습니다.
                </div>
            );
        }

        console.log(jsonObject)

        return(
            <>
                {
                    jsonObject.map((element:any, index:number) => {
                        //지도로 이동 버튼 클릭
                        const onSelectButtonClick = () => {
                            const kakaoMap = mapContext.mapElement
                            const {x:lng, y:lat} = element

                            if(!kakaoMap) return;
                            
                            //마커가 지도 중앙에 보이도록 이동합니다.
                            const latlng = new kakao.maps.LatLng(lat, lng)
                            kakaoMap.setCenter(latlng)
                            
                            //MarkerComponent를 호출하기 위해 state를 set합니다.
                            setState({
                                ...state,
                                markerPosition:[lat,lng]
                            })
                        }                   
                            return <li className={styles.SearchCard} key={index}>
                                        <div className={styles.Top}>
                                            <div className={styles.PlaceName}>
                                                {element.place_name}
                                            </div>
                                            <div className={styles.GoToMap}>
                                                <button
                                                    onClick={onSelectButtonClick}
                                                >
                                                지도로 이동
                                                </button>                                            
                                            </div>
                                        </div>
                                        <div className={styles.Content}>
                                            <div className={styles.Category}>
                                                {"카테고리 : " + element.category_name.replace('음식점 > ', '')}
                                            </div>
                                            <div className={styles.Address}>
                                                {"주소 : " + element.road_address_name}
                                            </div>
                                            <div className={styles.Phone}>
                                                {"전화번호 : " + element.phone}
                                            </div>
                                            <div
                                                className={styles.Url}
                                            >
                                                <button
                                                    onClick={() => window.open(`${element.place_url}`, "_blank")}
                                                >
                                                자세히
                                                </button>

                                            </div>
                                            <div>
                                            </div>
                                        </div>
                                    </li> 
                        
                    })
                }    
                <div className={styles.Page}>
                    <LeftOutlined
                        className={styles.LeftButton}
                        disabled={state.search.pagination.hasPrevPage ? false : true}
                        onClick={onPrevPageClick}
                    />
                    <div className={styles.PageNumber}>
                        {state.search.pagination.current + ' / ' + maxPage}
                    </div>
                    <RightOutlined
                        className={styles.RightButton}
                        disabled={state.search.pagination.hasNextPage ? false : true}
                        onClick={onNextPageClick}
                    />
                </div>
            </>
        )
    }

    return (
        <div>         
            <h1>검색</h1>
            <div className={styles.SearchTypeContainer}>
                <label>
                    <input
                        type='radio'
                        name='SearchType'
                        value={kakao.maps.services.SortBy.ACCURACY}                        
                        onChange={onRadioChange}
                        defaultChecked
                    />
                    정확도 순
                </label>
                <label>
                    <input
                        type='radio'
                        name='SearchType'
                        value={kakao.maps.services.SortBy.DISTANCE}
                        onChange={onRadioChange}
                    />
                    가까운 순
                </label>
            </div>
            <input value={searchText} onChange={onSearchTextChange} onFocus={onSearchTextFocus}/>
            <button onClick={onSearchButtonClick}>검색</button>
            <div className={styles.SearchResultContainer}>
                <ul className={styles.SearchList}>
                    {SearchResultReturn()}
                </ul>
            </div>
            {
                (state.markerPosition)
                ?<MarkerComponent position={state.markerPosition} markerType={MARKER_TYPE.SEARCH}/>
                :null                
            }        
        </div>
    )
}