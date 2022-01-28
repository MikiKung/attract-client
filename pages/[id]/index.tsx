import { useRouter } from 'next/router'
// import Headbar from '@/components/layout/headbar'
import Layout from '@/components/layout'
import mockData from '@/json/user.json'
const Test = () => {
  const router = useRouter()
  return (
    <div>
      <Layout user={mockData.users[1]}>
        <p>don't this found page</p>
      </Layout>
    </div>
  )
}
export default Test
