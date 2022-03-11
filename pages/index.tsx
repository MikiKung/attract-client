import Layout from '@/components/layout'
import Head from 'next/head'
import classes from './index.module.scss'
import InfoPost from '@/components/InfoPost'
import mockPost from '@/json/post.json'
import mockUser from '@/json/user.json'
import PostInput from '@/components/postInput'
import { useEffect, useMemo, useState } from 'react'
import router from 'next/router'
import axios from 'axios'

export default function Home() {
  const [user, setUser] = useState({})

  useEffect(() => {
    // if (localStorage.getItem('token') == null) {
    //   router.push('http://localhost:3000/login')
    // }
    // try {
    //   axios
    //     .get('http://localhost:3001/user/me', {
    //       headers: {
    //         authorization: `Bearer ${localStorage.getItem('token')}`,
    //       },
    //     })
    //     .then((res) => {
    //       setUser(res.data)
    //     })
    //     .catch((error) => {
    //       console.log(error)

    //       // router.push('http://localhost:3000/login')
    //     })
    // } catch (e) {
    //   console.log(e);
    // }
  }, [])

  return (
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Krona+One&display=optional"
          rel="stylesheet"
        />
        <title>attract</title>
      </Head>
      <Layout>
        <div className={classes.main}>
          <PostInput user={user} />
          {mockPost.post.map((mockPost) => {
            return (
              <InfoPost
                key={mockPost.id}
                user={mockUser.users[1]}
                {...mockPost}
              />
            )
          })}
        </div>
      </Layout>
    </div>
  )
}
