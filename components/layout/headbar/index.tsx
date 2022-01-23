import classes from './index.module.scss'
import mockData from '../../../json/user.json'
import { useRouter } from 'next/router'
import { useState } from 'react'
const Headbar = (props: any) => {
  const [userAvartar, setUserAvatar] = useState(true)
  const [showIcon, setShowIcon] = useState(true)
  function clickAvatar() {
    setUserAvatar(!userAvartar)
  }
  const router = useRouter()
  return (
    <div className={classes.main}>
      <img src="./logo-white.png" className={classes.logoImg} alt="logo" />
      <div className={classes.allSearch} >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/attract64-2.appspot.com/o/search.svg?alt=media&token=742a63c1-26f2-4ed8-89e1-63179c3c8dbc"
          alt="search"
        />
        <input className={classes.navInput} placeholder="Search" type="text" />
      </div>
      <img
        onClick={clickAvatar}
        className={classes.userImg}
        src={props.user.img}
        alt="avatar"
      />
      {userAvartar ? (
        <></>
      ) : (
        <div className={classes.modal}>
          <p onClick={clickAvatar} className={classes.modalItem}>
            <img src="./cross.svg" alt="cross" />
          </p>
          <p onClick={clickAvatar} className={classes.modalItem}>
            Home
          </p>
          <p onClick={clickAvatar} className={classes.modalItem}>
            setting
          </p>
          <p onClick={clickAvatar} className={classes.modalItem}>
            log out
          </p>
        </div>
      )}
    </div>
  )
}

export default Headbar
