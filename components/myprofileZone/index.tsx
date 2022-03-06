import Link from 'next/link'
import { useState } from 'react'
import classes from './index.module.scss'
const MyProfileZone = (props: any) => {
  const [setting ,setSettig] = useState(true)

  function clickSetting(){
    setSettig(!setting)
  }
  return (
    <div className={classes.allZone}>
      <img className={classes.topZoneProfile} src={props.user.bgImg} alt="" />
      <div className={classes.underZoneProfile}>
        <img className={classes.userImg} src={props.user.img} alt="" />
      </div>
      <div className={classes.headUser}>
        <div>
          <p className={classes.headName}>
            {props.user.firstname} {props.user.surename}
          </p>
          <p className={classes.userName}>@{props.user.username}</p>
        </div>
        <Link href={'http://localhost:3000/editmyprofile'}><p onClick={clickSetting} className={classes.followBtn}>setting</p></Link>
      </div>
      <div className={classes.bioUser}>
        <p className={classes.bioText}>{props.user.bio}</p>
      </div>
      <div className={classes.followZone}>
        <span className={classes.onefollowZone}>
          {/* <p className={classes.countUser}>{props.user.followingUser.length}</p> */}
          <p className={classes.countUserText}>following</p>
        </span>
        <span className={classes.onefollowZone}>
          {/* <p className={classes.countUser}>{props.user.followerUser.length}</p> */}
          <p className={classes.countUserText}>follower</p>
        </span>
      </div>

    </div>
  )
}
export default MyProfileZone
