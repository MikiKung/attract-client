import axios from 'axios'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { IUser } from 'types'

interface Props {
  user?: Partial<IUser>
  me?: IUser
  refetch?: () => void
}

const ProfileCard: FC<Props> = (props) => {
  const router = useRouter()
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
        <img className="h-48 w-full object-cover" src={props.user?.bgImg} />
        <div className="absolute -bottom-1/2 -translate-y-1/2 left-4">
          <img
            className="w-24 h-24 rounded-full overflow-hidden shadow-lg border"
            src={props.user?.img}
            alt=""
          />
        </div>
      </div>
      <div className="px-4 mt-14">
        <div className="flex justify-between items-center">
          <div className="">
            <div className="font-bold text-[25px]">
              {props.user?.firstname} {props.user?.surename}
            </div>

            <div className="text-xs text-gray-500 text-[18px]">@{props.user?.username}</div>
          </div>
          {isMe() ? (
            <div
              onClick={() => router.push('/editmyprofile')}
              className="cursor-pointer border border-black px-4 py-1 rounded-full hover:bg-gray-100"
            >
              edit
            </div>
          ) : (
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
          <div onClick={() => router.push("/follow")} className="flex space-x-1 cursor-pointer">
            <div className="font-medium">
              {props.user?.followingUser?.length || 0}
            </div>
            <div>following</div>
          </div>
          <div  onClick={() => router.push("/follower")} className="flex space-x-1 cursor-pointer">
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
