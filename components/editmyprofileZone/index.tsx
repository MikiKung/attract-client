import axios from 'axios'
import Link from 'next/link'
import router from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import classes from './index.module.scss'
import { create } from 'ipfs-http-client'
const EditMyProfileZone = (props: any) => {
  const [setting, setSettig] = useState(true)
  const [showUserImg, setShowUSerImg] = useState(true)
  const [showUserBgImg, setShowUserBgImg] = useState(true)
  const [file, setFile] = useState<any>()
  const [bgFile, setBgFile] = useState<any>()
  const [user, setUser] = useState<any>({})
  const [firstname, setFirstname] = useState('')
  const [surename, setSurename] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [gender, setGender] = useState('')
  // <ipfs>
  const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
  })
  const addFile = async ({ path, content }: any) => {
    const file = { path: path, content: content }
    const filesAdded: any = await ipfs.add(file)
    return filesAdded.cid
  }
  const handleBgImageChange = async (e: any) => {
    try {
      const image = await addFile({
        path: '/',
        content: e.target.files[0],
      })
      const url = `https://ipfs.infura.io/ipfs/${image}`
      setBgFile(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }
  const handleImageChange = async (e: any) => {
    try {
      const image = await addFile({
        path: '/',
        content: e.target.files[0],
      })
      const url = `https://ipfs.infura.io/ipfs/${image}`
      setFile(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }
  // </ipfs>

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
        setGender(res.data.gender)
        setUser(res.data)
        router.push('http://localhost:3000/myprofile')
      })
  }, [])

  function clickShowBgImg() {
    setShowUserBgImg(!showUserBgImg)
  }

  function clickShowUserImg() {
    setShowUSerImg(!showUserImg)
  }
  function clickSave(e: any) {
    e.preventDefault()
    axios
      .patch(
        `http://localhost:3001/user/me`,
        {
          img: file,
          bgImg: bgFile,
          firstname: firstname,
          surename: surename,
          username: username,
          bio: bio,
          gender: gender,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        console.log(res.data)
        setSettig(!setting)
      })
  }
  function clickCancel() {
    router.push('http://localhost:3000/myprofile')
    setSettig(!setting)
  }
  return (
    <form className={classes.allZone}>
      {showUserBgImg ? (
        <div className={classes.TtopZone}>
          <img
            onMouseEnter={clickShowBgImg}
            className={classes.topZoneProfile}
            src={bgFile || user.bgImg}
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
              src={bgFile || user.bgImg}
              alt=""
            />
          </label>
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onClick={(event: any) => {
              event.target.value = null
            }}
            onChange={handleBgImageChange}
            id="userBgImg"
          />
        </div>
      )}
      {showUserImg ? (
        <div
          onMouseEnter={clickShowUserImg}
          className={classes.underZoneProfile}
        >
          <img className={classes.userImg} src={file || user.img} alt="" />
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
            <img className={classes.userImg} src={file || user.img} alt="" />
          </label>
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onClick={(event: any) => {
              event.target.value = null
              // console.log('test')
            }}
            onChange={handleImageChange}
            id="userImg"
          />
        </div>
      )}
      <div className={classes.headUser}>
        <div>
          <input
            type="text"
            className={classes.headName}
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value)
            }}
          />
          <input
            value={surename}
            type="text"
            className={classes.headName}
            onChange={(e) => {
              setSurename(e.target.value)
            }}
          />
          <input
            value={username}
            type="text"
            className={classes.userName}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>
        <p onClick={clickSave} className={classes.followBtn}>
          save
        </p>
        <p onClick={clickCancel} className={classes.followBtn}>
          cancel
        </p>
      </div>
      <div className={classes.bioUser}>
        <textarea
          className={classes.bioText}
          value={bio}
          onChange={(e) => {
            setBio(e.target.value)
          }}
        />
      </div>
      <div className={classes.followZone}>
        <span className={classes.onefollowZone}>
          {/* <p className={classes.countUser}>{user.followingUser.length()}</p> */}
          <p className={classes.countUserText}>following</p>
        </span>
        <span className={classes.onefollowZone}>
          {/* <p className={classes.countUser}>{user.followerUser.length()}</p> */}
          <p className={classes.countUserText}>follower</p>
        </span>
      </div>
    </form>
  )
}
export default EditMyProfileZone
function ipfsHttpClient(arg0: string) {
  throw new Error('Function not implemented.')
}
