import classes from './index.module.scss'
import Headbar from './headbar'
import Leftbar from './leftbar'
import Rightbar from './rightbar'
import mockData from '@/json/user.json'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { IUser } from 'types'

const Layout = (props: any) => {
  const router = useRouter()
  const [user, setUser] = useState<IUser>()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('http://localhost:3000/login')
      return
    }
    try {
      axios
        .get('http://localhost:3001/user/me', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          if (res.data == 'no token') {
            router.push('http://localhost:3000/login')
          } else {
            setUser(res.data)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (
    <div>
      <Headbar user={user} />
      <Leftbar />
      <div className={classes.main}>
        <div className={classes.topic}>{props.children}</div>
      </div>
      <Rightbar user={user} />
    </div>
  )
}

export default Layout
