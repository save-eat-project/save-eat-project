import styles from '@styles/foodComponent.module.css'
import { Input } from 'antd'
import { EditableTagComponent } from './editableTag_antd'
import React, { useRef, useState } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

//state 인터페이스
interface State {
    LoadImage: { URL: string }[]
    ImageIndex: number
    ImageAmount: number
}

//todo
//이미지 업로드 완료 이후, 편집버튼 눌르면 에디터 띄워서 편집 가능하게 ㄱㄱ.

export function FoodComponent() {
    const [state, setState] = useState<State>({
        LoadImage: [{ URL: '' }, { URL: '' }, { URL: '' }, { URL: '' }, { URL: '' }],
        ImageIndex: 0,
        ImageAmount: 0,
    })
    const inputFileRef = useRef<HTMLInputElement | null>(null)
    const imageRef = useRef<HTMLDivElement | null>(null)
    const pageRef = useRef<(HTMLDivElement | null)[]>([])

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //이미지 데이터타입 참조
        //https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
        if (!e.target.files) return

        //유사배열 -> 배열로 변환이후 필터링(이미지 파일이 아닌 파일 필터링)
        var files = Array.from(e.target.files)
        var filteringFiles = files.filter((element) => /^image\//.test(element.type))

        var allowedImageAmount = 5 - state.ImageAmount

        //알람 메시지
        if (files.length !== filteringFiles.length)
            alert('이미지파일이 아닌 파일은 필터링됩니다.')

        if (filteringFiles.length > allowedImageAmount) {
            alert('5개를 초과한 이미지는 무시됩니다.')
            filteringFiles = filteringFiles.slice(0, allowedImageAmount)
        }

        const selectedFiles: string[] = filteringFiles.map((file) => {
            return URL.createObjectURL(file)
        })
        var tempLoadImage = Array.from(state.LoadImage)

        selectedFiles.map((element: string, index: number) => {
            tempLoadImage[state.ImageAmount + index].URL = element
        })

        if (state.ImageAmount === 0) {
            pageRef.current[0]?.click()
        }

        setState({
            ...state,
            ImageAmount: state.ImageAmount + selectedFiles.length,
            LoadImage: tempLoadImage,
        })
    }

    return (
        <>
            <div className={styles.PictureContainer}>
                <div className={styles.LeftContainer}>
                    <label>음식 사진</label>
                    <label>{state.ImageAmount}/5</label>
                </div>
                <div className={styles.RightContainer}>
                    <div className={styles.ImageContainer}>
                        <LeftOutlined className={styles.Button} />
                        <div
                            className={[styles.Img, styles.Img_None].join(' ')}
                            ref={imageRef}
                            onClick={() => {
                                if (state.ImageAmount < 5) {
                                    alert('이미지가 5개 이상입니다. 삭제해주세요')
                                    return
                                }
                                inputFileRef.current?.click()
                            }}
                        ></div>
                        <RightOutlined className={styles.Button} />
                    </div>
                    <div className={styles.PaginationContainer}>
                        {state.LoadImage.map((element, index) => {
                            const onPageButtonclick = () => {
                                if (!imageRef.current) return

                                var tempImageRef = imageRef.current

                                if (element.URL !== '') {
                                    tempImageRef.classList.remove(styles.Img_None)

                                    //약간 잘못된것같음. 개발자도구에서 보면 &quot해서 특수문자 들어가있음.
                                    tempImageRef.style.setProperty(
                                        'background-image',
                                        `url(${element.URL})`
                                    )
                                } else if (
                                    !tempImageRef.classList.contains(styles.Img_None)
                                ) {
                                    imageRef.current?.classList.add(styles.Img_None)

                                    tempImageRef.style.setProperty('background-image', ``)
                                }
                            }
                            return (
                                <div
                                    className={`${styles.PageButton} ${
                                        element.URL === ''
                                            ? styles.Page_None
                                            : styles.Page_Selected
                                    }`}
                                    onClick={onPageButtonclick}
                                    key={index}
                                    ref={(element) => (pageRef.current[index] = element)}
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
                <div className={styles.LeftContainer}>
                    <label className={styles.Label}>음식 분류</label>
                </div>
                <div className={styles.RightContainer}>
                    <div className={styles.Tag}>
                        <EditableTagComponent />
                    </div>
                </div>
            </div>
        </>
    )
}
