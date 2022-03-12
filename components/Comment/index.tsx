import axios from 'axios'
import React, { FC, useState } from 'react'
import { IComment, IUser } from '../../types'

interface Props {
  comment?: Partial<IComment>
  me?: Partial<IUser>
  onEdit: (comment: Partial<IComment>) => void
  refech?: () => void
}

const CommentCard: FC<Props> = (props) => {
  const onDelete = async () => {
    if (confirm('ต้องการลบคอมเมนท์หรือไม่ ?')) {
      await axios.delete(`http://localhost:3001/comment/${props.comment?._id}`)
      props.refech?.call(this)
    }
  }

  return (
    <div className="flex space-x-3">
      <img
        src={props.comment?.ownUserId?.img}
        className="w-8 h-8 object-cover rounded-full"
      />
      <div className="flex flex-col">
        <div className="bg-[#ededed] p-2 rounded-lg">
          {props.comment?.commentText}
        </div>

        {props.comment?.ownUserId?._id === props.me?._id && (
          <div className="flex text-xs space-x-3 mt-1">
            <div
              onClick={() => props.onEdit(props.comment!)}
              className="cursor-pointer hover:underline"
            >
              edit
            </div>
            <div onClick={onDelete} className="cursor-pointer hover:underline">
              delete
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentCard
