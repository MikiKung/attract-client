import Layout from '@/components/layout'
import InfoPost from '@/components/InfoPost'
import mockPost from '@/json/post.json'
import mockUser from '@/json/user.json'
import EditMyProfileZone from '@/components/editmyprofileZone'
import { useEffect, useState } from 'react'
import router from 'next/router'
import axios from 'axios'
const EditMyProfile = () => {
  const [user, setUser] = useState<any>({
    firstname: '',
    surename: '',
    username: '',
    gender: '',
    interestCategoryId: [],
    postId: [],
    followingUser: [],
    followerUser: [],
    markPostId: [],
    notificationId: [],
    historySearch: [],
  })
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
        setUser(res.data)
      })
  }, [])
  return (
    <div>
      <Layout>
        <EditMyProfileZone user={user} />
        {mockPost.post.map((mockPost) => {
          return (
            <InfoPost
              key={mockPost.id}
              user={mockUser.users[1]}
              {...mockPost}
            />
          )
        })}
      </Layout>
    </div>
  )
}
export default EditMyProfile
