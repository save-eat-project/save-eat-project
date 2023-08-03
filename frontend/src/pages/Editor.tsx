import styles from '@styles/editor.module.css'
import { SearchComponent } from '../component/searchComponent'
import { FoodComponent } from '../component/foodComponent'
import { Rate, Input } from 'antd'

export function EditorPage() {
    function CreateContainer(element: JSX.Element | undefined, title: string) {
        return (
            <div className={styles.ComponentContainer}>
                <p className={styles.ComponentTitle}>{title}</p>
                {element}
            </div>
        )
    }

    function Callback(lat: number, lng: number) {
        console.log(lat)
    }

    return (
        <div className={styles.Contents}>
            {CreateContainer(
                <div className={styles.InputText}>
                    <Input size="large" placeholder="Eat 제목을 지어주세요." />
                </div>,
                'Eat 제목'
            )}
            {CreateContainer(<FoodComponent />, '음식 정보')}
            {CreateContainer(<SearchComponent DataReturnCallback={Callback} />, '가게 검색')}
            {CreateContainer(
                <div className={styles.StarRate}>
                    <Rate style={{ fontSize: '50px' }} allowHalf defaultValue={2.5} />
                </div>,
                '별점'
            )}
            {CreateContainer(
                <div className={styles.InputText}>
                    <Input size="large" placeholder="한줄 평을 적어주세요." />
                </div>,
                '한줄 평'
            )}
            {CreateContainer(
                <div className={styles.InputText}>
                    <button>Eat 작성</button>
                </div>,
                ''
            )}
        </div>
    )
}
