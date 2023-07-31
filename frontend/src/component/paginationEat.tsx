import styles from '@styles/foodComponent.module.css'
import { Pagination, Input } from 'antd'
import { EditableTagComponent } from './editableTag_antd'
import React, { useRef } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

//todo
//이미지 업로드 완료 이후, 편집버튼 눌르면 에디터 띄워서 편집 가능하게 ㄱㄱ.

export function FoodComponent() {
    const inputFileRef = useRef<HTMLInputElement | null>(null)

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return

        alert(e.target.files[0].name + ' ' + e.target.files[0].type)
    }

    const pageStyle: React.CSSProperties = {
        backgroundImage: `url('/GrayWhiteCircle.svg')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundOrigin: 'content-box',
        padding: '5px',
        height: '100%',
    }

    const itemRender = (page: any, type: any, originalElement: any) => {
        if (type === 'prev') {
            console.log(page)
        }
        // console.log(type + page)
        // if (type === 'prev') {
        //     return (
        //         <a>
        //             <LeftOutlined />
        //         </a>
        //     )
        // }
        // if (type === 'next') {
        //     return (
        //         <a>
        //             <RightOutlined />
        //         </a>
        //     )
        // }
        if (type === 'page') {
            return <a style={pageStyle}></a>
        }
        return originalElement
    }

    return (
        <>
            <div className={styles.PictureContainer}>
                <div className={styles.LeftContainer}>
                    <label>음식 사진</label>
                    <label>0/5</label>
                </div>
                <div className={styles.RightContainer}>
                    <div
                        className={styles.img}
                        style={{
                            backgroundImage: `url(${'/iconmonstr-picture-thin.svg'})`,
                        }}
                        onClick={() => {
                            inputFileRef.current?.click()
                        }}
                    ></div>
                    <Pagination
                        style={{ textAlign: 'center' }}
                        defaultCurrent={1}
                        total={50}
                        itemRender={itemRender}
                    />
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
