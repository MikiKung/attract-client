import Layout from '@/components/layout'
import Head from 'next/head'
import classes from './index.module.scss'
import InfoPost from '@/components/InfoPost'
import mockPost from '@/json/post.json'
import mockUser from '@/json/user.json'
import PostInput from '@/components/postInput'

export default function Home() {
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
          <PostInput user={mockUser.users[1]}/>
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
