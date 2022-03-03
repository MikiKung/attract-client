import { useState } from 'react'
import classes from './index.module.scss'

const ProfileZone = (props: any) => {
  const [follow, setFollow] = useState(true)

  function clickFollow() {
    setFollow(!follow)
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

        {follow ? (
          <div onClick={clickFollow} className={classes.followBtn}>
            <p>Follow</p>
          </div>
        ) : (
          <div onClick={clickFollow} className={classes.unfollowBtn}>
            <p>Unfollow</p>
          </div>
        )}
      </div>
      <div className={classes.bioUser}>
        <p className={classes.bioText}>{props.user.bio}</p>
      </div>
      <div className={classes.followZone}>
        <span className={classes.onefollowZone}>
          <p className={classes.countUser}>{props.user.followingUser.length}</p>
          <p className={classes.countUserText}>following</p>
        </span>
        <span className={classes.onefollowZone}>
          <p className={classes.countUser}>{props.user.followerUser.length}</p>
          <p className={classes.countUserText}>follower</p>
        </span>
      </div>
      <div className={classes.birthdate}>
        <img className={classes.birthdateImg} src="./birthday.svg" alt="" />
        <p className={classes.birthdateText}>{props.user.birthday}</p>
      </div>
    </div>
    // <div className={classes.allZone}>
    //   <img className={classes.topZoneProfile} src={props.user.bgImg} alt="" />
    //   <div className={classes.underZoneProfile}>
    //     <img src={props.user.img} alt="" />
    //   </div>

    //   <div>
    //     <div>
    //       <p className={classes.textNameUser}>
    //         {props.user.firstname} {props.user.surename}
    //       </p>
    //       <p className={classes.textEditProfile}>Edit Profile</p>
    //     </div>
    //     <div className={classes.textAdd}>
    //       <p>@John27</p>
    //     </div>
    //     <div className={classes.textBio}>
    //       <p>Reason of happiness not a trip but on the way</p>
    //     </div>
    //     <div>
    //       <p className={classes.textFollwing}>following</p>
    //       <p className={classes.textFollwer}>follower</p>
    //     </div>
    //     <div>
    //       <img
    //         className={classes.iconBirthday}
    //         src="jam_birthday-cake.svg"
    //         alt=""
    //       />
    //       <p className={classes.birthday}>20/10/2000</p>
    //     </div>
    //   </div>
    //   <div></div>
    // </div>
  )
}
export default ProfileZone
