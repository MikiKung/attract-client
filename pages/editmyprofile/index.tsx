import Layout from '@/components/layout'
import InfoPost from '@/components/InfoPost'
import mockPost from '@/json/post.json'
import mockUser from '@/json/user.json'
import MyPost from '@/components/myPost'
import EditMyProfileZone from '@/components/editmyprofileZone'
import { useEffect, useState } from 'react'
import router from 'next/router'
import axios from 'axios'
const EditMyProfile = () => {
  const [user, setUser] = useState<any>({})
  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      router.push('http://localhost:3000/login')
    }
    axios
      .get('http://localhost:3001/user/me', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        // console.log(res.data)
        setUser(res.data)
      })
  }, [])
  return (
    <div>
      <Layout>
        <EditMyProfileZone user={user} />
        {/* <MyPost key={user._id} user={user} /> */}
      </Layout>
    </div>
  )
}
export default EditMyProfile
