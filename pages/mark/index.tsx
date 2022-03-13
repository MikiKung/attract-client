import Layout from '@/components/layout'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IMark, IUser } from '../../types'
import Post from '@/components/Posts'

const Mark = () => {
  const [marks, setMarks] = useState<IMark[]>([])
  const [me, setMe] = useState<IUser>()
  const fethcMarks = async () => {
    const res = await axios.get('http://localhost:3001/mark/user', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    setMarks(res.data)
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
    fethcMarks()
    fetchMe()
  }, [])

  return (
    <div>
      <Layout>
        <div className='text-[30px] flex font-medium my-[5px]'>The Marks</div>
        <div className='mb-[7px] text-[13px] ml-6'>* If you mark a post, that post will show in the mark page.</div>
        <div className="space-y-3 pb-12">
          {marks.map((e) => (
            <Post
              me={me}
              key={e._id}
              post={e.postId}
              user={e.postId.ownUserId}
              refetch={fethcMarks}
            />
          ))}
        </div>
      </Layout>
    </div>
  )
}
export default Mark
