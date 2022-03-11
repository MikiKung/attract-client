import axios from 'axios'
import React, { FC, useMemo, useState } from 'react'
import { dateFormat } from 'utils/helper'
import { IPost, IUser } from '../../types'
interface Props {
  post?: Partial<IPost>
  user?: Partial<IUser>
  me?: Partial<IUser>
  showSetting?: boolean
  onDelete?: () => void
  refetch?: () => void
}
const Post: FC<Props> = (props) => {
  const [showComment, setShowComment] = useState<boolean>(false)
  const onDelete = async () => {
    await axios.delete(`http://localhost:3001/post/${props.post?._id}`)
    // props.onDelete?.call(this)
    props.refetch?.call(this)
  }
  const onMark = async () => {
    if (isMarked) {
      const markId = props.post?.markId!.find(
        (e) => e.userId === props.me?._id,
      )!
      await axios.delete(`http://localhost:3001/mark/${markId._id}`)
    } else {
      await axios.post('http://localhost:3001/mark/', {
        postId: props.post?._id,
        userId: props.me?._id,
      })
    }
    props.refetch?.call(this)
  }

  const isMarked = useMemo(() => {
    if (!props.me || !props.post) return false
    return props.post.markId?.some((e) => e.userId === props.me?._id)
  }, [props.me, props.post])

  return (
    <div className="bg-white rounded-lg p-2">
      <div className="flex justify-between">
        <div className="flex space-x-3">
          <img
            className="w-11 h-11 object-cover rounded-full"
            src={props.user?.img}
          />
          <div>
            <div>
              {props.user?.firstname} {props.user?.surename}
            </div>
            <div className="text-[10px] text-gray-400">
              {dateFormat(props.post?.timePost!)}
            </div>
          </div>
        </div>
        <div>
          {/* dropdown */}
          {props.showSetting && (
            <details className="relative">
              <summary className="flex cursor-pointer pl-4">
                <img src="/more.svg" />
              </summary>
              <div className="absolute top-8 right-0 shadow-md w-28 bg-white rounded-lg text-[16px] overflow-hidden select-none">
                <div className="hover:bg-green-1 p-1 pl-2 cursor-pointer hover:text-white">
                  Edit Post
                </div>
                <div
                  onClick={onDelete}
                  className="hover:bg-green-1 p-1 pl-2 cursor-pointer hover:text-white"
                >
                  Delete Post
                </div>
              </div>
            </details>
          )}
        </div>
      </div>
      <div className="py-3">{props.post?.postText}</div>
      <div className="flex gap-x-3 gap-y-3 pb-2 flex-wrap">
        {props.post?.categoryId?.map((e) => (
          <div className="bg-green-1 select-none rounded-lg px-2 py-1 text-white w-fit">
            {e.name}
          </div>
        ))}
      </div>
      <img src={props.post?.img} className="w-full object-cover mb-2" />
      <div className="grid grid-cols-2 border-t">
        <div
          onClick={onMark}
          className="cursor-pointer hover:bg-gray-100 p-1 my-1 rounded-lg flex items-center justify-center"
        >
          <img
            src={isMarked ? 'markClick.svg' : '/location.svg'}
            className=" h-[22px]"
          />
          <div className="ml-3 text-green-1">{props.post?.markId?.length}</div>
        </div>
        <div
          onClick={() => setShowComment(!showComment)}
          className="cursor-pointer hover:bg-gray-100 p-1 my-1 rounded-lg flex items-center justify-center"
        >
          <img src="/comment.svg" className="h-[22px]" />
        </div>
      </div>
      {showComment && (
        <div className="space-y-3 mt-3">
          <div className="flex space-x-3">
            <img
              src={props.user?.img}
              className="w-8 h-8 object-cover rounded-full"
            />
            <div className="bg-[#ededed] p-2 rounded-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
        </div>
      )}
      <div className="mt-2">
        <div className="flex space-x-3">
          <img
            className="w-8 h-8 object-cover rounded-full"
            src={props.user?.img}
          />
          <input
            className="bg-gray-200 grow h-8 px-3 rounded-lg"
            placeholder="you have a question?"
          />
          <button className="bg-green-1 text-white rounded-lg px-3 py-1">
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default Post
