import styles from '@styles/foodComponent.module.css'
import { Pagination, Input } from 'antd'
import { EditableTagComponent } from './editableTag_antd'
import React, { useRef, useState } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

//state 인터페이스
interface State {
    LoadImage: { URL: string }[]
}

//todo
//이미지 업로드 완료 이후, 편집버튼 눌르면 에디터 띄워서 편집 가능하게 ㄱㄱ.

export function FoodComponent() {
    const [state, setState] = useState<State>({
        LoadImage: [
            { URL: '/iconmonstr-plus-circle-lined.svg' },
            { URL: '/iconmonstr-plus-circle-lined.svg' },
            { URL: '/iconmonstr-plus-circle-lined.svg' },
            { URL: '/iconmonstr-plus-circle-lined.svg' },
            { URL: '/iconmonstr-plus-circle-lined.svg' },
        ],
    })
    const inputFileRef = useRef<HTMLInputElement | null>(null)
    const imageRef = useRef<HTMLDivElement | null>(null)

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //이미지 데이터타입 참조
        //https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
        if (!e.target.files) return

        //유사배열 -> 배열로 변환이후 필터링(이미지 파일이 아닌 파일 필터링)
        var files = Array.from(e.target.files)
        var filteringFiles = files.filter((element) =>
            /^image\//.test(element.type),
        )

        //알람 메시지
        if (files.length !== filteringFiles.length)
            alert('이미지파일이 아닌 파일은 필터링됩니다.')

        if (filteringFiles.length >= 6) {
            alert('5개를 초과한 이미지는 무시됩니다.')
            filteringFiles = filteringFiles.slice(0, 5)
        }

        const selectedFiles: string[] = filteringFiles.map((file) => {
            return URL.createObjectURL(file)
        })

        var tempLoadImage = Array.from(state.LoadImage)

        selectedFiles.map((element: string, index: number) => {
            tempLoadImage[index].URL = element
        })

        setState({
            LoadImage: tempLoadImage,
        })

        imageRef.current?.style.setProperty(
            'background-image',
            `url(${tempLoadImage[0].URL})`,
        )

        console.log(selectedFiles)
    }

    return (
        <>
            <div className={styles.PictureContainer}>
                <div className={styles.LeftContainer}>
                    <label>음식 사진</label>
                    <label>0/5</label>
                </div>
                <div className={styles.RightContainer}>
                    <div className={styles.ImageContainer}>
                        <LeftOutlined className={styles.Button} />
                        <div
                            className={styles.img}
                            ref={imageRef}
                            style={{
                                backgroundImage: `url(${'/iconmonstr-plus-circle-lined.svg'})`,
                            }}
                            onClick={() => {
                                inputFileRef.current?.click()
                            }}
                        ></div>
                        <RightOutlined className={styles.Button} />
                    </div>
                    <div className={styles.PaginationContainer}>
                        {state.LoadImage.map((element) => {
                            const onPageButtonclick = () => {
                                imageRef.current?.style.setProperty(
                                    'background-image',
                                    `url(${element.URL})`,
                                )
                            }
                            return (
                                <div
                                    className={`${styles.PageButton} ${
                                        element.URL ===
                                        '/iconmonstr-plus-circle-lined.svg'
                                            ? styles.Page_None
                                            : styles.Page_Selected
                                    }`}
                                    onClick={onPageButtonclick}
                                ></div>
                            )
                        })}
                    </div>
                </div>
                <input
                    ref={inputFileRef}
                    type="file"
                    style={{ display: 'none' }}
                    multiple
                    accept="image/*"
                    onChange={(e) => onFileChange(e)}
                ></input>
            </div>
            <div className={styles.PriceContainer}>
                <div className={styles.LeftContainer}>
                    <label className={styles.Label}>가격</label>
                </div>
                <div className={styles.RightContainer}>
                    <Input placeholder="가격을 입력해주세요." />
                </div>
            </div>
            <div className={styles.TagContainer}>
                <label className={styles.Label}>음식 분류</label>
                <div className={styles.Tag}>
                    <EditableTagComponent />
                </div>
            </div>
        </>
    )
}
