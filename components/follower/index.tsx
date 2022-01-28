import { useState } from 'react'
import classes from './index.module.scss'
const Following = (props: any) => {
  const [follow, setFollow] = useState(true)
  function clickShowFollow() {
    setFollow(!follow)
  }
    // console.log(props.user.userID)
  return (
    <div>
      {props.user.followerUser.map((e: any) => {
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
                  <p className={classes.nameText}>{e.name}</p>
                  <p className={classes.usernameText}>@{e.username}</p>
                </div>
              </div>
              {follow ? (
                <div onClick={clickShowFollow} className={classes.btnFollow}>
                  <p>follow</p>
                </div>
              ) : (
                <div onClick={clickShowFollow} className={classes.clickBtnFollow}>
                  <p>follow</p>
                </div>
              )}
            </div>
            <hr />
          </div>
          //   <div key={e.username} className={classes.oneUser}>
          //     <img
          //       src={props.user.img}
          //       className={classes.profileImg}
          //       alt={props.user.firstname}
          //     />
          //     <div className={classes.textZone}>
          //       <p className={classes.nameText}>{e.name}</p>
          //       <p className={classes.usernameText}>@{e.username}</p>
          //     </div>
          //   </div>
        )
      })}
    </div>
  )
}
export default Following
