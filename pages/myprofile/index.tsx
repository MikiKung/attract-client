import Layout from '@/components/layout'
import InfoPost from '@/components/InfoPost'
import mockPost from '@/json/post.json'
import mockUser from '@/json/user.json'
import MyProfileZone from '@/components/myprofileZone'
import axios from 'axios'
import router from 'next/router'
import { useEffect, useMemo, useState } from 'react'

const MyProfile = () => {
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
        // console.log(res.data);
        setUser(res.data)
      })
  }, [])
  return (
    <div>
      <Layout>
        <MyProfileZone user={user} />
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
export default MyProfile
