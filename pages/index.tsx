import Layout from '@/components/layout'
import Head from 'next/head'
import classes from './index.module.scss'
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
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test </p>
       </div>
      </Layout>
    </div>
  )
}
