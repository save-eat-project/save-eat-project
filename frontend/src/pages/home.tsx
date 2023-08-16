import styles from '@styles/home.module.css'
import { MapComponent } from '../components/mapComponent'

export function HomePage() {
    return (
        <div className={styles.title}>
            <img src="Logo.svg" />
            <MapComponent />
        </div>
    )
}
