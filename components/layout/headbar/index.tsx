import classes from './index.module.scss'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { IUser } from 'types'
import axios from 'axios'

interface Props {
  user?: IUser
}
const Headbar: FC<Props> = (props) => {
  const [userAvartar, setUserAvatar] = useState(true)
  const [history, setHistory] = useState(true)
  const [searchText, setSearchText] = useState<string>('')
  const [me, setMe] = useState<IUser>()
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

  const fetchUser = async () => {
    const res = await axios.get('http://localhost:3001/user/me', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    const data = res.data

    data.historySearch?.reverse()

    setMe(data)
  }

  const handleRemove = async (i: number) => {
    if (!me) return
    me?.historySearch.splice(i, 1)
    await axios.patch('http://localhost:3001/user/me', me, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    fetchUser()
  }

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    if (router.query.q) {
      setSearchText((router.query!.q as string) || '')
    }
  }, [router.query.q])

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
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                router.push(`/search?q=${searchText}`).then(() => {
                  location.reload()
                })
              }
            }}
          />
        </div>
        {history ? (
          <></>
        ) : (
          <div>
            {me?.historySearch?.length! > 0 && (
              <div className="w-full max-h-[30rem] overflow-y-auto bg-white absolute top-9 rounded-md overflow-hidden shadow-lg border">
                {me?.historySearch?.map((e: string, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center px-3 py-1 hover:bg-green-1 hover:text-white cursor-pointer border-b border-black last:border-none"
                  >
                    <p
                    className='grow'
                      onClick={() => {
                        router.push(`/search?q=${e}`)
                        clickShowHistory()
                      }}
                    >
                      {e}
                    </p>
                    <img
                      onClick={() => handleRemove(i)}
                      className="w-4 h-4 cursor-pointer"
                      src="/cross.svg"
                      alt="cross"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <img
        className="w-1- h-10 object-cover rounded-full border border-black p-1"
        src={props?.user?.img}
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
