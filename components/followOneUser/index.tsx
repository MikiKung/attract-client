import { useState } from 'react'
import classes from './index.module.scss'
const followOneUser = (props: any) => {
  const [follow, setFollow] = useState(true)
  function clickShowFollow() {
    setFollow(!follow)
  }
  return (
    <div>
      <div className={classes.oneUser}>
        <div className={classes.userzone}>
          <img
            src={props.user.img}
            className={classes.profileImg}
            alt={props.user.firstname}
          />
          <div className={classes.textZone}>
            <p className={classes.nameText}>
              {props.user.firstname} {props.user.surename}
            </p>
            <p className={classes.usernameText}>@{props.user.username}</p>
          </div>
        </div>
        {follow ? (
          <div onClick={clickShowFollow} className={classes.btnFollow}>
            <p>follow</p>
          </div>
        ) : (
          <div onClick={clickShowFollow} className={classes.clickBtnFollow}>
            <p>unfollow</p>
          </div>
        )}
      </div>
      <hr />
    </div>
  )
}
export default followOneUser
