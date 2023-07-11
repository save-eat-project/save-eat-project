import styles from '@styles/home.module.css'
import { MapComponent } from '../component/mapComponent'

export function HomePage() {
    return (
        <div className={styles.title}>
            {/* <img src="logo.png" /> */}
            <MapComponent />
        </div>
    )
}
