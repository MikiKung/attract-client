import axios from 'axios'
import Link from 'next/link'
import router from 'next/router'
import { useEffect, useState } from 'react'
import classes from './index.module.scss'
const MyProfileZone = (props: any) => {
  const [setting, setSettig] = useState(true)
  const [firstname, setFirstname] = useState('')
  const [surename, setSurename] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [user, setUser] = useState<any>({
    firstname: '',
    surename: '',
    username: '',
    gender: '',
    interestCategoryId: [],
    postId: [],
    followingUser: [],
    followerUser: [],
    markPostId: [],
    notificationId: [],
    historySearch: [],
  })

  function clickSetting() {
    setSettig(!setting)
  }
  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      router.push('http://localhost:3000/login')
    }
    axios
      .get('http://localhost:3001/user/me', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setFirstname(res.data.firstname)
        setSurename(res.data.surename)
        setUsername(res.data.username)
        setBio(res.data.bio)
        setUser(res.data)
        // console.log(res.data.followingUser)
      })
    // console.log(user.img)
  }, [])
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
        <Link href={'http://localhost:3000/editmyprofile'}>
          <p onClick={clickSetting} className={classes.followBtn}>
            setting
          </p>
        </Link>
      </div>
      <div className={classes.bioUser}>
        <p className={classes.bioText}>{props.user.bio}</p>
      </div>
      <div className={classes.followZone}>
        <span className={classes.onefollowZone}>
          <p className={classes.countUser}>{user.followingUser.length}</p>
          <p className={classes.countUserText}>following</p>
        </span>
        <span className={classes.onefollowZone}>
          <p className={classes.countUser}>{user.followerUser.length}</p>
          <p className={classes.countUserText}>follower</p>
        </span>
      </div>
    </div>
  )
}
export default MyProfileZone
