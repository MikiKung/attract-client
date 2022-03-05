import Link from 'next/link'
import classes from './index.module.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState(true)
  const [token,setToken] = useState(false)
  const router = useRouter()
  useEffect(() => {
  },[])
  function postData(e: any) {
    e.preventDefault()
    axios
      .post(`http://localhost:3001/user/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.token != undefined) {
          localStorage.setItem('token', res.data.token)
          router.push('http://localhost:3000/')
        } else {
          setLogin(false)
        }
      })
  }
  return (
    <div className={classes.main}>
      <div className={classes.left}>
        <img className={classes.moutainImg} src="./moutain.svg" alt="moutain" />
        <img
          className={classes.attractImg}
          src="./logo-white.png"
          alt="logoAttract"
        />
      </div>
      <div className={classes.right}>
        <p className={classes.textInfo}>Login</p>
        <div className={classes.inputForm}>
          <form className={classes.inputForm2} onSubmit={postData}>
            <input
              className={classes.inputItem}
              type="text"
              placeholder="Email address"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <input
              className={classes.inputItem}
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            {login ? <></> : <p>* invalid email or password</p>}
            <button type="submit" className={classes.submitItem}>
              <p className={classes.submitText}>Login</p>
            </button>
          </form>
          <hr />
          <Link href="http://localhost:3000/register">
            <div className={classes.submitItem2}>
              <p className={classes.submitText}>Register</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Login
