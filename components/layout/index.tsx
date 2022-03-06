import classes from './index.module.scss'
import Headbar from './headbar'
import Leftbar from './leftbar'
import Rightbar from './rightbar'
import mockData from '@/json/user.json'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const Layout = (props: any) => {
  const router = useRouter()
  const [user, setUser] = useState({})

  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      router.push('http://localhost:3000/login')
    }
    axios
      .get('http://localhost:3001/user/me', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setUser(res.data)
      })
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
