import axios from 'axios'
import React, { FC } from 'react'
import { IUser } from 'types'

interface Props {
  user?: Partial<IUser>
  me?: IUser
  refetch?: () => void
}

const ProfileCard: FC<Props> = (props) => {
  const isMe = () => {
    return props.me?._id === props.user?._id
  }

  const follow = async () => {
    if (isFollowed()) {
      await axios.delete(
        `http://localhost:3001/user/unfollow/${props.user?._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
    } else {
      await axios.post(
        'http://localhost:3001/user/follow',
        {
          followingId: props.user!._id,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
    }

    props.refetch?.call(this)
  }

  const isFollowed = () => {
    return props.user?.followerUser?.some((e) => e._id === props.me?._id)
  }

  return (
    <div className="rounded-lg overflow-hidden bg-white shadow-md pb-6">
      <div className="relative">
        <img
          className="h-48 w-full object-cover"
          src="https://s.isanook.com/tr/0/rp/rc/w850h510/yatxacm1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL3RyLzAvdWQvMjgwLzE0MDI0OTcvSU1HXzE5MzYuanBnLmpwZw==.jpg"
        />
        <div className="absolute -bottom-1/2 -translate-y-1/2 left-4">
          <img
            className="w-24 h-24 rounded-full overflow-hidden shadow-lg border"
            src="https://firebasestorage.googleapis.com/v0/b/attract64-2.appspot.com/o/songzii.gif?alt=media&token=a920b342-a859-465b-894c-7c4b592da7d4"
            alt=""
          />
        </div>
      </div>
      <div className="px-4 mt-14">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold text-xl">
              {props.user?.firstname} {props.user?.surename}
            </div>
            <div className="text-xs text-gray-500">@{props.user?.username}</div>
          </div>
          {!isMe() && (
            <div
              onClick={follow}
              className="border border-black cursor-pointer px-4 rounded-full hover:bg-gray-100"
            >
              {isFollowed() && 'un'}
              follow
            </div>
          )}
        </div>
        <div className="text-[14px] mt-3">{props.user?.bio}</div>
        <div className="flex space-x-6 text-xs mt-3">
          <div className="flex space-x-1">
            <div className="font-medium">
              {props.user?.followingUser?.length || 0}
            </div>
            <div>following</div>
          </div>
          <div className="flex space-x-1">
            <div className="font-medium">
              {props.user?.followerUser?.length || 0}
            </div>
            <div>follower</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
