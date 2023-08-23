// import styles from '@/styles/Home.module.css'
import { Button } from 'antd'
import Link from 'next/link'

export default function HomePage() {

  return <div>
    HomePage
    <Link href={'/login'}>
      <Button >test</Button>
    </Link>
  </div>
}
