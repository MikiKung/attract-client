import Layout from '@/components/layout'
import { useEffect, useState } from 'react'
import { IUser } from 'types'
import axios from 'axios'
import Post from '@/components/Posts'
import ProfileCard from '@/components/Profile'
import { useRouter } from 'next/router'
const Profile = () => {
  const [user, setUser] = useState<IUser>()
  const [me, setMe] = useState<IUser>()
  const router = useRouter()
  const fetchUser = async () => {
    const res = await axios.get(`http://localhost:3001/user/${router.query.id}`)
    setUser(res.data)
  }
  useEffect(() => {
    if (!router.query.id) return
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
  }, [router.query])
  return (
    <div>
      <Layout>
        <ProfileCard user={user} me={me} refetch={fetchUser} />
        <div className="space-y-3 mt-3 pb-12">
          {user?.postId.map((post) => (
            <Post key={post._id} post={post} user={user} me={me} refetch={fetchUser} />
          ))}
        </div>
      </Layout>
    </div>
  )
}
export default Profile
