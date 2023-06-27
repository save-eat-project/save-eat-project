import React, { useEffect, useState, useContext } from "react"
import styles from '@styles/searchComponent.module.css'
import kakaoMapContext from "../hook/kakaoMapContext"
import {MarkerComponent} from "../component/markerComponent"

//https://www.npmjs.com/package/@types/kakaomaps
//https://apis.map.kakao.com/web/

interface State{
    currentLocation?:{
        lat:number
        lng:number
    }
    search?:{
        result:any[]
        status:kakao.maps.services.Status
        statusStr:string
        pagination:kakao.maps.services.Pagination
    }
    markerPosition?:[number, number]
}

export function SearchComponent() {
    const mapContext = useContext(kakaoMapContext)
    const [state,setState] = useState<State>({})
    const [searchText, setSearchText] = useState('')

    var callback = function(result:any[], status:kakao.maps.services.Status, pagination:kakao.maps.services.Pagination) {
        if (status === kakao.maps.services.Status.OK) {
            setState({
                ...state,
                search:{                        
                    result:result,
                    status:status,
                    statusStr:"완료",
                    pagination:pagination
                }
            })
        }else {
            var statusStr
            var status:kakao.maps.services.Status
            var pagination:kakao.maps.services.Pagination

            if(status === kakao.maps.services.Status.ZERO_RESULT){
                statusStr = "검색결과가 없습니다."    
            }else{
                statusStr = "에러가 발생하였습니다."
            }

            setState({
                ...state,
                search:{
                    result:[],
                    status:status,
                    statusStr:statusStr,
                    pagination:pagination
                }
            })
        }
    }

    useEffect(() => {
        if(!state.search)
            return        

            console.log(state.search.result)
    }, [state.search])

    const onPrevPageClick = () => {
        state.search?.pagination.prevPage()
    }

    const onNextPageClick = () => {
        state.search?.pagination.nextPage()
    }

    const onSearchTextChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }

    const onSearchButtonClick = () => {
        if(searchText === "" ) return
        console.log(mapContext.mapElement?.getCenter())
        // console.
        var places = new kakao.maps.services.Places(undefined!)
        places.keywordSearch(searchText, callback, {
            location: mapContext.mapElement?.getCenter(),
            category_group_code: "FD6",
            sort: kakao.maps.services.SortBy.DISTANCE
        })
    }

    function SearchResultReturn(){
        if(!state.search)
            return

        const jsonString = JSON.stringify(state.search?.result)
        const jsonObject = JSON.parse(jsonString)

        return(
            <table>
                <thead>
                    <tr>
                        <th>
                            인덱스
                        </th>
                        <th>
                            이름
                        </th>
                        <th>
                            주소
                        </th>
                        <th>
                            카테고리
                        </th>
                        <th>
                            선택
                        </th>
                        <th className={styles.hidden}>
                            거리
                        </th>
                        <th className={styles.hidden}>
                            위도
                        </th>
                        <th className={styles.hidden}>
                            경도
                        </th>
                    </tr>              
                </thead>
                <tbody>
                {
                    jsonObject.map((element:any, index:number) => {
                        const onSelectButtonClick = () => {
                            const kakaoMap = mapContext.mapElement
                            const {x:lng, y:lat} = element
                            
                            const latlng = new kakao.maps.LatLng(lat, lng)
                            kakaoMap?.setCenter(latlng)

                            setState({
                                ...state,
                                markerPosition:[lat,lng]
                            })
                        }

                        return <tr key={element.id}>
                                    <td>
                                        {(index + 1)}
                                    </td>
                                    <td>
                                        {element.place_name}
                                    </td>
                                    <td>
                                        {element.road_address_name}
                                    </td>
                                    <td>
                                        {element.category_name.split('>')[1].trim()}
                                    </td>
                                    <td >
                                        <button
                                            onClick={onSelectButtonClick}
                                        >
                                        선택
                                        </button>
                                    </td>                            
                                    <td className={styles.hidden}>
                                        {element.distance}
                                    </td>
                                    <td className={styles.hidden}>
                                        {element.x}
                                    </td>
                                    <td className={styles.hidden}>
                                        {element.y}
                                    </td>
                                </tr>                   
                    })
                }                    
                </tbody>
            </table>
        )
    }

    return (
        <div>         
            <h1>검색</h1>
            <input value={searchText} onChange={onSearchTextChange}></input>
            <button onClick={onSearchButtonClick}>검색</button>
            <div>검색:{state.search?.statusStr}</div>
            <div>현재페이지:{state.search?.pagination.current}</div>
            <div>총아이템:{state.search?.pagination.totalCount}</div>
            <button
                disabled={state.search?.pagination.hasPrevPage ? false : true}
                onClick={onPrevPageClick}
            >
                이전페이지
            </button>
            <button
                disabled={state.search?.pagination.hasNextPage ? false : true}
                onClick={onNextPageClick}
            >
                다음페이지
            </button>
            <div className={styles.SearchResultTableContainer}>
                {SearchResultReturn()}
            </div>
            {
                (state.markerPosition)
                ?<MarkerComponent position={state.markerPosition}/>
                :null                
            }
            
        </div>
    )
}