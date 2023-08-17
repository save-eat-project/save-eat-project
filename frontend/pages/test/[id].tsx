import { useRouter } from "next/router"

export default function Home() {
  const { query } = useRouter()
  return (
    <div>test:{query.id}</div>
  )
}