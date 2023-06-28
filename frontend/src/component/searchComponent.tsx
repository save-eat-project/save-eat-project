import React, { useEffect, useState, useContext } from "react"
import styles from '@styles/searchComponent.module.css'
import kakaoMapContext from "../hook/kakaoMapContext"
import {MarkerComponent} from "../component/markerComponent"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"

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
        
        var places = new kakao.maps.services.Places(undefined!)
        places.keywordSearch(searchText, callback, {
            location: mapContext.mapElement?.getCenter(),
            category_group_code: "FD6", //카테고리그룹 음식점 지정.
            sort: kakao.maps.services.SortBy.DISTANCE   //현재 지도의 center에서 제일 가까운 순으로 정렬
        })
    }

    function SearchResultReturn(){
        if(!state.search)
            return

        const jsonString = JSON.stringify(state.search.result)
        const jsonObject = JSON.parse(jsonString)

        const maxPage = Math.ceil(state.search.pagination.totalCount / 15)
        
        return(
            <ul className={styles.SearchList}>
                {
                    jsonObject.map((element:any, index:number) => {
                        const onSelectButtonClick = () => {
                            const kakaoMap = mapContext.mapElement
                            const {x:lng, y:lat} = element
                            
                            const latlng = new kakao.maps.LatLng(lat, lng)
                            kakaoMap?.setCenter(latlng)
                            // element.id
                            setState({
                                ...state,
                                markerPosition:[lat,lng]
                            })
                        }

                        return <li className={styles.SearchCard} key={element.id}>
                                    <div className={styles.Top}>
                                        <div className={styles.PlaceName}>
                                            {element.place_name}
                                        </div>
                                        <div className={styles.Category}>
                                            {element.category_name.replace('음식점 > ', '')}
                                        </div>
                                    </div>
                                    <div className={styles.Content}>
                                        <div className={styles.Address}>
                                            {element.road_address_name}
                                        </div>
                                        <div
                                            className={styles.Url}
                                            onClick={() => window.open(`${element.place_url}`, "_blank")}
                                        >
                                            {element.place_url}

                                        </div>
                                        <div className={styles.Phone}>
                                            {element.phone}
                                        </div>
                                        <div>
                                            <button
                                                onClick={onSelectButtonClick}
                                            >
                                            지도로 이동
                                            </button>
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
            </ul>
            // <table>
            //     <thead>
            //         <tr>
            //             <th>
            //                 번호
            //             </th>
            //             <th>
            //                 이름
            //             </th>
            //             <th>
            //                 주소
            //             </th>
            //             <th>
            //                 카테고리
            //             </th>
            //             <th>
            //                 선택
            //             </th>
            //         </tr>              
            //     </thead>
            //     <tbody>
                // {
                //     jsonObject.map((element:any, index:number) => {
                //         const onSelectButtonClick = () => {
                //             const kakaoMap = mapContext.mapElement
                //             const {x:lng, y:lat} = element
                            
                //             const latlng = new kakao.maps.LatLng(lat, lng)
                //             kakaoMap?.setCenter(latlng)

                //             setState({
                //                 ...state,
                //                 markerPosition:[lat,lng]
                //             })
                //         }

                //         return <tr key={element.id}>
                //                     <td>
                //                         {(index + 1)}
                //                     </td>
                //                     <td>
                //                         {element.place_name}
                //                     </td>
                //                     <td>
                //                         {element.road_address_name}
                //                     </td>
                //                     <td>
                //                         {element.category_name.split('>')[1].trim()}
                //                     </td>
                //                     <td >
                //                         <button
                //                             onClick={onSelectButtonClick}
                //                         >
                //                         선택
                //                         </button>
                //                     </td> 
                //                 </tr>  
                //     })
                // }                    
            //     </tbody>
            // </table>
        )
    }

    return (
        <div>         
            <h1>검색</h1>
            <input value={searchText} onChange={onSearchTextChange}></input>
            <button onClick={onSearchButtonClick}>검색</button>
            {/* <div>검색:{state.search?.statusStr}</div>
            <div>현재페이지:{state.search?.pagination.current}</div>
            <div>총아이템:{state.search?.pagination.totalCount}</div> */}
            <div className={styles.SearchResultContainer}>
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