import classes from './index.module.scss'
import Headbar from './headbar'
import Leftbar from './leftbar'
import Rightbar from './rightbar'
import mockData from '@/json/user.json'
const Layout = (props: any) => {
  return (
    <div>
      <Headbar user={mockData.users[1]} />
      <Leftbar />
      <div className={classes.main}>
        <div className={classes.topic}>{props.children}</div>
      </div>
      <Rightbar user={mockData.users[1]} />
    </div>
  )
}

export default Layout
