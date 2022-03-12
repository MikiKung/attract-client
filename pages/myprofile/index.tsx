import Layout from '@/components/layout'
import InfoPost from '@/components/InfoPost'
import mockPost from '@/json/post.json'
import mockUser from '@/json/user.json'
import MyPost from '@/components/myPost'
import MyProfileZone from '@/components/myprofileZone'
import axios from 'axios'
import router from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import Post from '@/components/Posts'
import { IUser } from 'types'
import ProfileCard from '@/components/Profile'

const MyProfile = () => {
  const [user, setUser] = useState<IUser>()

  const fetchUser = () => {
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
  }

  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      router.push('http://localhost:3000/login')
    }

    fetchUser()
  }, [])

  return (
    <div>
      <Layout>
        {user && (
          <>
             <ProfileCard user={user} me={user} refetch={fetchUser} />
            <div className="space-y-3 mt-3">
              {user.postId.map((post) => (
                <Post
                  refetch={fetchUser}
                  key={post._id}
                  user={user}
                  post={post}
                  showSetting
                  me={user}
                />
              ))}
            </div>
          </>
        )}
      </Layout>
    </div>
  )
}
export default MyProfile
