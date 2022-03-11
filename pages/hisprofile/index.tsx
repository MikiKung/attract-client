import Layout from '@/components/layout'
import InfoPost from '@/components/InfoPost'
import classes from './index.module.scss'
import mockPost from '@/json/post.json'
import mockUser from '@/json/user.json'
import HisProfileZone from '@/components/hisprofileZone'
import { useEffect, useState } from 'react'
import { IUser } from 'types'
import axios from 'axios'
import Post from '@/components/Posts'
const Profile = () => {
  const [user, setUser] = useState<IUser>()
  const [me, setMe] = useState<IUser>()
  const fetchUser = async () => {
    const res = await axios.get(
      'http://localhost:3001/user/622769e74ad2135b51e15038',
    )
    setUser(res.data)
  }
  useEffect(() => {
    fetchUser()
    axios
      .get('http://localhost:3001/user/me', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setMe(res.data)
      })
  }, [])
  return (
    <div>
      <Layout>
        {/* <HisProfileZone user={mockUser.users[1]} /> */}
        {user?.postId.map((post) => (
          <Post post={post} user={user} me={me} refetch={fetchUser} />
        ))}
      </Layout>
    </div>
  )
}
export default Profile
