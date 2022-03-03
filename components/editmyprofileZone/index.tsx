import Link from 'next/link'
import { useMemo, useState } from 'react'
import classes from './index.module.scss'
const EditMyProfileZone = (props: any) => {
  const [setting, setSettig] = useState(true)
  const [showUserImg, setShowUSerImg] = useState(true)
  const [showUserBgImg, setShowUserBgImg] = useState(true)
  const [file, setFile] = useState<any>()
  const [bgFile, setBgFile] = useState<any>()
  const [date, setDate] = useState(props.user.birthday)

  function clickShowBgImg() {
    setShowUserBgImg(!showUserBgImg)
  }

  function clickShowUserImg() {
    setShowUSerImg(!showUserImg)
  }
  function clickSetting() {
    setSettig(!setting)
  }
  const previewBgImage = useMemo(() => {
    if (process.browser) {
      if (!bgFile) return ''
      return URL.createObjectURL(bgFile)
    }
  }, [bgFile])

  const previewImage = useMemo(() => {
    if (process.browser) {
      if (!file) return ''
      return URL.createObjectURL(file)
    }
  }, [file])
  return (
    <form className={classes.allZone} action="">
      {showUserBgImg ? (
        <div className={classes.TtopZone}>
          <img
            onMouseEnter={clickShowBgImg}
            className={classes.topZoneProfile}
            src={previewBgImage || props.user.bgImg}
            alt=""
          />
        </div>
      ) : (
        <div className={classes.TtopZone}>
          <label htmlFor="userBgImg">
            <div
              onMouseLeave={clickShowBgImg}
              className={classes.hoverTextBgImg}
            >
              <p className={classes.hoverTextBgImgText}>change</p>
            </div>
            <img
              className={classes.topZoneProfile}
              src={previewBgImage || props.user.bgImg}
              alt=""
            />
          </label>
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onClick={(event: any) => {
              event.target.value = null
              // console.log('test')
            }}
            onChange={(e) => {
              setBgFile(e.target.files![0])
              // console.log(e.target.files![0])
            }}
            id="userBgImg"
          />
        </div>
      )}
      {showUserImg ? (
        <div
          onMouseEnter={clickShowUserImg}
          className={classes.underZoneProfile}
        >
          <img
            className={classes.userImg}
            src={previewImage || props.user.img}
            alt=""
          />
        </div>
      ) : (
        <div
          onMouseLeave={clickShowUserImg}
          className={classes.underZoneProfile}
        >
          <label htmlFor="userImg">
            <div className={classes.hoverTextImg}>
              <p className={classes.hoverTextImgText}>change</p>
            </div>
            <img
              className={classes.userImg}
              src={previewImage || props.user.img}
              alt=""
            />
          </label>
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onClick={(event: any) => {
              event.target.value = null
              // console.log('test')
            }}
            onChange={(e) => {
              setFile(e.target.files![0])
              // console.log(e.target.files![0])
            }}
            id="userImg"
          />
        </div>
      )}
      <div className={classes.headUser}>
        <div>
          <input
            type="text"
            className={classes.headName}
            placeholder={props.user.firstname}
          />
          <input
            type="text"
            className={classes.headName}
            placeholder={props.user.surename}
          />
          <input
            type="text"
            className={classes.userName}
            placeholder={props.user.username}
          />
        </div>
        <Link href={'http://localhost:3000/myprofile'}>
          <p onClick={clickSetting} className={classes.followBtn}>
            save
          </p>
        </Link>
        <Link href={'http://localhost:3000/myprofile'}>
          <p onClick={clickSetting} className={classes.followBtn}>
            cancel
          </p>
        </Link>
      </div>
      <div className={classes.bioUser}>
        {/* <p className={classes.bioText}>{props.user.bio}</p> */}
        <textarea className={classes.bioText} placeholder={props.user.bio} />
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
        <input
          type="date"
          className={classes.birthdateText}
          // placeholder={props.user.birthday}
          // value={props.user.birthday}
          value={date}
          onChange={(e) => {
            setDate(e.target.value)
          }}
        />
      </div>
    </form>
  )
}
export default EditMyProfileZone
