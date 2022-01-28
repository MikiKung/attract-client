import classes from './index.module.scss'
import Layout from '@/components/layout'
import mockUser from '@/json/user.json'
import Following from '@/components/follower'
const FollowPage = () => {
  return (
    <div>
      <Layout>
        <div className={classes.main}>
          <p className={classes.headText}>Follow</p>

          <Following user={mockUser.users[1]} />
        </div>
      </Layout>
    </div>
  )
}

export default FollowPage
