import styles from '@styles/home.module.css'

export function HomePage() {
  return <div className={styles.title}>
    <img src="logo.png" />
    <div>home page</div>
  </div>
}