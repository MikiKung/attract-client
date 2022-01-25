import Layout from '@/components/layout'
import Head from 'next/head'
import classes from './index.module.scss'
import InfoPost from '@/components/InfoPost'
import mockPost from '@/json/post.json'
import PostInput from '@/components/postInput'

export default function Home() {
  return (
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Krona+One&display=optional"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <div className={classes.main}>
          <PostInput />
          {mockPost.post.map((mockPost) => {
            return <InfoPost key={mockPost.id} {...mockPost}/>
          })}
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
          <p>tets</p>
        </div>
      </Layout>
    </div>
  )
}
