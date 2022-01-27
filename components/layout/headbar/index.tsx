import classes from './index.module.scss'
import mockData from '../../../json/user.json'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
const Headbar = (props: any) => {
  const [userAvartar, setUserAvatar] = useState(true)
  const [history, setHistory] = useState(true)
  function clickShowHistory() {
    setHistory(!history)
  }
  function clickAvatar() {
    setUserAvatar(!userAvartar)
  }
  const router = useRouter()
  console.log(props.user.historySearch)
  return (
    <div className={classes.main}>
      <img src="./logo-white.png" className={classes.logoImg} alt="logo" />
      <div className={classes.forHistory}>
        <div className={classes.allSearch}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/attract64-2.appspot.com/o/search.svg?alt=media&token=742a63c1-26f2-4ed8-89e1-63179c3c8dbc"
            alt="search"
          />
          <input
            onClick={clickShowHistory}
            className={classes.navInput}
            placeholder="Search"
            type="text"
          />
        </div>
        {history ? (
          <></>
        ) : (
          <div className={classes.searchHistory}>
            {props.user.historySearch.map((e: any) => {
              return (
                <div>
                  <div
                    onClick={clickShowHistory}
                    className={classes.oneHistory}
                  >
                    <p>{e}</p>
                    <img
                      className={classes.crossHistory}
                      src="./cross.svg"
                      alt="cross"
                    />
                  </div>
                  <hr className={classes.hr} />
                </div>
              )
            })}
          </div>
        )}
      </div>
      <img
        className={classes.userImg}
        src={props.user.img}
        alt="avatar"
        onClick={clickAvatar}
      />

      {userAvartar ? (
        <></>
      ) : (
        <div className={classes.modal}>
          <p onClick={clickAvatar} className={classes.modalItem}>
            Home
          </p>
          <p onClick={clickAvatar} className={classes.modalItem}>
            setting
          </p>
          <Link href="http://localhost:3000/login">
            <p onClick={clickAvatar} className={classes.modalItem}>
              log out
            </p>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Headbar
