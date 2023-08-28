import styles from 'styles/editor.module.css'
import { PlaceSearchComponent, placeInfo } from './placeSearchComponent'
import { FoodInfoComponent } from './foodInfoComponent'
import { Rate, Input } from 'antd'
import React, { useState } from 'react'

//state 인터페이스
interface State {
    title: string
    placeInfo: placeInfo
    image: string
    price: number
    category: string
    rating: number
    comment: string
}

export function EditorPage() {
    const [state, setState] = useState<State>({
        title: '',
        placeInfo: {
            code: '',
            name: '',
            coordinate: {
                lat: 0,
                lng: 0,
            },
            address: '',
        },
        image: '',
        price: 0,
        category: '',
        rating: 0,
        comment: '',
    })

    function CreateContainer(element: JSX.Element | undefined, title: string) {
        return (
            <div className={styles.ComponentContainer}>
                <p className={styles.ComponentTitle}>{title}</p>
                {element}
            </div>
        )
    }

    function PlaceSelectCallback(placeInfo: placeInfo) {
        setState({
            ...state,
            placeInfo: placeInfo,
        })
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, stateKey: string) => {
        setState({
            ...state,
            [stateKey]: e.target.value,
        })
    }

    const onRateChange = (e: number) => {
        setState({
            ...state,
            rating: e,
        })
    }

    return (
        <div className={styles.Contents}>
            {CreateContainer(
                <div className={styles.InputText}>
                    <Input
                        size="large"
                        placeholder="Eat 제목을 지어주세요."
                        onChange={(e) => onInputChange(e, 'title')}
                    />
                </div>,
                'Eat 제목'
            )}
            {CreateContainer(<FoodInfoComponent />, '음식 정보')}
            <PlaceSearchComponent PlaceSelectCallback={PlaceSelectCallback} />
            {/* {CreateContainer(
                <PlaceSearchComponent PlaceSelectCallback={PlaceSelectCallback} />,
                '가게 검색'
            )} */}
            {CreateContainer(
                <div className={styles.StarRate}>
                    <Rate
                        style={{ fontSize: '50px' }}
                        allowHalf
                        defaultValue={2.5}
                        onChange={(e) => onRateChange(e)}
                    />
                </div>,
                '별점'
            )}
            {CreateContainer(
                <div className={styles.InputText}>
                    <Input
                        size="large"
                        placeholder="한줄 평을 적어주세요."
                        onChange={(e) => onInputChange(e, 'comment')}
                    />
                </div>,
                '한줄 평'
            )}
            <div className={styles.CompleteButton}>
                <button>Eat 작성</button>
            </div>
        </div>
    )
}
