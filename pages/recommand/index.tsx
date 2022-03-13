import Layout from '@/components/layout'
import InfoPost from '@/components/InfoPost'
import mockPost from '@/json/post.json'
import mockUser from '@/json/user.json'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IPost, IUser } from '../../types'
import Post from '@/components/Posts'
const Recommand = () => {
  const [posts, setPosts] = useState<IPost[]>([])

  const [me, setMe] = useState<IUser>()

  const fetchPost = async () => {
    const res = await axios.get('http://localhost:3001/post/recommand')
    setPosts(res.data)
  }

  const fetchMe = async () => {
    const res = await axios.get('http://localhost:3001/user/me', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    setMe(res.data)
  }

  useEffect(() => {
    fetchPost()
    fetchMe()
  }, [])
  return (
    <div>
      <Layout>
        <div className="text-[30px] flex font-medium my-[5px]">
          Recommends
        </div>
        <div className="mb-[7px] text-[12px] ml-6">
          * This page shows recommend posts which have the most marks.
        </div>
        <div className="space-y-3 mb-12">
          {posts.map((e) => (
            <Post post={e} me={me} user={e.ownUserId} refetch={fetchPost} />
          ))}
        </div>
      </Layout>
    </div>
  )
}
export default Recommand
