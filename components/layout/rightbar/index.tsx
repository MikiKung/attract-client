import classes from './index.module.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IUser } from 'types'
import { useRouter } from 'next/router'
const Rightbar = (props: any) => {
  const [users, setUsers] = useState<IUser[]>([])
  const router = useRouter()

  const fethcUser = async () => {
    const res = await axios.get('http://localhost:3001/user/mostFollowers')
    setUsers(res.data)
  }

  useEffect(() => {
    fethcUser()
  }, [])

  return (
    <div className={classes.main}>
      <div className="h-full flex flex-col justify-between p-4 divide-y">
        {users.map((e) => (
          <div
            onClick={() => router.push(`/user/${e._id}`)}
            className="flex justify-between items-center space-x-3 py-2 cursor-pointer"
            key={e._id}
          >
            <div className="flex space-x-3 items-center">
              <img
                className="w-12 h-12 object-cover rounded-full"
                src={e.img}
                alt=""
              />

              <div className="">
                <p className="truncate w-44">
                  {e.firstname} {e.surename}
                </p>
                <p className="text-[12px]">@{e.username}</p>
              </div>
            </div>
            <div>{e.counts}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Rightbar
