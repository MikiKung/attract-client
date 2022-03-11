import classes from './index.module.scss'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
const Headbar = (props: any) => {
  const [userAvartar, setUserAvatar] = useState(true)
  const [history, setHistory] = useState(true)
  const router = useRouter()
  function clickShowHistory() {
    setHistory(!history)
  }
  function clickAvatar() {
    setUserAvatar(!userAvartar)
  }
  function Logout() {
    router.push('http://localhost:3000/login')
    localStorage.removeItem('token')
  }
  return (
    <div className={classes.main}>
      <Link href={'http://localhost:3000/'}>
        <img src="/logo-white.png" className={classes.logoImg} alt="logo" />
      </Link>
      <div className="relative w-96">
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
          <div className="w-full bg-white absolute top-9 rounded-md overflow-hidden shadow-lg border border-black divide-y divide-black">
            {['hello', 'world', "1", "2"].map((e: any) => {
              return (
                <div onClick={clickShowHistory} className="flex justify-between items-center px-3 py-1 hover:bg-green-1 hover:text-white cursor-pointer">
                  <p>{e}</p>
                  <img className="w-4 h-4" src="/cross.svg" alt="cross" />
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
          <Link href={'http://localhost:3000/editmyprofile'}>
            <p onClick={clickAvatar} className={classes.modalItem}>
              setting
            </p>
          </Link>
          <p onClick={Logout} className={classes.modalItem}>
            log out
          </p>
        </div>
      )}
    </div>
  )
}

export default Headbar
