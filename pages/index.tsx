import Layout from '@/components/layout'
import Head from 'next/head'
import PostInput from '@/components/Posts/Input'
import { useEffect, useMemo, useState } from 'react'
import router from 'next/router'
import axios from 'axios'
import { IPost, IUser } from '../types'
import Post from '@/components/Posts'

export default function Home() {
  const [me, setMe] = useState<IUser>()

  const [posts, setPosts] = useState<IPost[]>([])

  const fetchPost = async () => {
    const res = await axios.get('http://localhost:3001/post/feed', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (res.data !== 'no token') {
      setPosts(res.data || [])
    }
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
    fetchPost()
    fetchMe()
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
        <PostInput user={me} />
        <div className="pb-12 space-y-3">
          {posts.map((post) => (
            <Post
              post={post}
              user={post.ownUserId}
              me={me}
              refetch={fetchPost}
            />
          ))}
        </div>
      </Layout>
    </div>
  )
}
