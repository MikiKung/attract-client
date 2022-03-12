import classes from './index.module.scss'
import Layout from '@/components/layout'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IUser } from '../../types'
import { useRouter } from 'next/router'

const FollowerPage = () => {
  const router = useRouter()
  const [users, setUsers] = useState<IUser[]>([])
  const [me, setMe] = useState<IUser>()

  const fetchUser = async () => {
    const res = await axios.get('http://localhost:3001/user/follower', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    setUsers(res.data)
  }

  const unfollow = async (id: string) => {
    await axios.delete(`http://localhost:3001/user/unfollow/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    fetchUser()
  }

  const follow = async (id: string) => {
    await axios.post(
      'http://localhost:3001/user/follow',
      {
        followingId: id,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    fetchUser()
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
    fetchUser()
    fetchMe()
  }, [])

  const isFollowed = (user: IUser) => {
    return user.followerUser.some((e) => e._id === me?._id)
  }

  return (
    <div>
      <Layout>
        <div className="bg-white rounded-lg p-8">
          <div className="text-3xl">Follower</div>
          <div className="mt-6 space-y-3">
            {users.map((e) => (
              <div key={e._id} className="flex justify-between">
                <div
                  onClick={() => router.push(`/user/${e._id}`)}
                  className="flex space-x-3 items-center cursor-pointer"
                >
                  <img
                    className="w-12 h-12 object-cover rounded-full"
                    src={e.img}
                    alt=""
                  />

                  <div className="">
                    <p className="">
                      {e.firstname} {e.surename}
                    </p>
                    <p className="text-[12px]">@{e.username}</p>
                  </div>
                </div>
                {isFollowed(e) ? (
                  <div
                    onClick={() => unfollow(e._id)}
                    className="border border-black h-fit w-24 text-center py-1  rounded-full hover:bg-gray-100 cursor-pointer bg-[#ededed]"
                  >
                    unfollow
                  </div>
                ) : (
                  <div
                    onClick={() => follow(e._id)}
                    className="border border-black h-fit w-24 text-center py-1 rounded-full hover:bg-gray-100 cursor-pointer"
                  >
                    follow
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default FollowerPage
