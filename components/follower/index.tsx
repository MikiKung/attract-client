import { useState } from 'react'
import classes from './index.module.scss'
import FollowOneUser from '../followOneUser'
import mockUser from '@/json/user.json'
const Following = (props: any) => {

  // console.log(props.user.userID)
  return (
    <div>
      {props.user.followerUser.map((e: any) => {
        return (
          <div>
            <FollowOneUser user={mockUser.users[1]} />
          </div>
        )
      })}
    </div>
  )
}
export default Following
