import styles from '@styles/foodComponent.module.css'
import { Pagination, Input } from 'antd'
import { DraggableTagComponent } from './draggableTag_antd'

export function FoodComponent() {
    return (
        <>
            <div className={styles.PictureContainer}>
                <div className={styles.LeftContainer}>
                    <div>음식 사진</div>
                    <div>0/5</div>
                </div>
                <div className={styles.RightContainer}>
                    <image></image>
                    <Pagination
                        style={{ textAlign: 'center' }}
                        defaultCurrent={1}
                        total={50}
                    />
                </div>
            </div>
            <div className={styles.PriceContainer}>
                <div>가격</div>
                <div>
                    <Input size="large" placeholder="Eat 제목을 지어주세요." />
                </div>
            </div>
            <div className={styles.TagContainer}>
                <DraggableTagComponent />
            </div>
        </>
    )
}
