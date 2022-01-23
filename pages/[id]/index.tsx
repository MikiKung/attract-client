import { useRouter } from 'next/router'
import Headbar from '@/components/layout/headbar'
import mockData from '@/json/user.json'
const Test = () => {
  const router = useRouter()
  return (
    <div>
      <Headbar user={mockData.users[0]}>
        
      </Headbar>
    </div>
  )
}
export default Test
