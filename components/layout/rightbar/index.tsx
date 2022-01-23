import classes from './index.module.scss'
import mockNoti from '@/json/noti.json'
const Rightbar = (props: any) => {
  return (
    <div className={classes.main}>
      {mockNoti.notification.map((e) => (
        <div className={classes.oneNoti} key={e.notiID}>
          <div className={classes.HeadImgNoti}>
            <img className={classes.profileImg} src={e.otherImg} alt={e.other} />
          </div>
          <div className={classes.HeadnameNoti}>
            <p className={classes.nameNoti}>
              {e.other} is {e.action}
            </p>
            <p className={classes.timeNoti}>{e.time}</p>
          </div>

        </div>
      ))}
    </div>
  )
}
export default Rightbar
