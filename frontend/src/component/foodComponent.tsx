import styles from '@styles/foodComponent.module.css'
import { Pagination, Input } from 'antd'
import { EditableTagComponent } from './editableTag_antd'

export function FoodComponent() {
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
                    ></div>
                    <Pagination
                        style={{ textAlign: 'center' }}
                        defaultCurrent={1}
                        total={50}
                    />
                </div>
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
