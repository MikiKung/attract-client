import Link from 'next/link'
import { useEffect, useState } from 'react'
import classes from './index.module.scss'
import mockTag from '@/json/tag.json'
import axios from 'axios'
import OneCategory from '@/components/onecategory'
import { useRouter } from 'next/router'

const Register = () => {
  const [showCategory, setShowcategory] = useState(true)
  const [cateData, setCateData] = useState<any>({})
  const [img, setImg] = useState('')
  const [firstname, setFirstname] = useState('')
  const [surename, setSurename] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [expressionPass, setExpressionPass] = useState(true)
  const [statuspass, setStatusPass] = useState(true)
  const [bio, setBio] = useState('')
  const [gender, setGender] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [useData, setUseData] = useState(false)
  const router = useRouter()

  // const [Cname, setCname] = useState('')
  // const [cateInPost, setCateInPost] = useState<any>([])

  useEffect(() => {
    axios.get(`http://localhost:3001/category`).then((res) => {
      setCateData(res.data)
    })
  })
  function clickShowCategory() {
    setShowcategory(!showCategory)
  }
  function registerUser(e: any) {
    if (
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
      ) {
      if (password == confirmpassword) {
        e.preventDefault()
        axios
          .post(`http://localhost:3001/user`, {
            img: img,
            firstname: firstname,
            surename: surename,
            username: username,
            email: email,
            password: password,
            bio: bio,
            gender: gender,
            birthDate: birthdate,
          })
          .then((res) => {
            if (res.data == 'email is used') {
              setUseData(true)
            } else {
              // console.log(res.data)
              // setUserData(res.data)
              clickShowCategory()
              // router.push('http://localhost:3000/login')
            }
          })
      } else {
        e.preventDefault()
        setStatusPass(false)
      }
    } else {
      e.preventDefault()
      setExpressionPass(false)
    }
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
      <form onSubmit={registerUser}>
        <div className={classes.right}>
          <p className={classes.textInfo}>register</p>
          <div className={classes.inputForm}>
            <input
              className={classes.inpItem}
              placeholder="Username"
              type="text"
              onChange={(e) => {
                setUsername(e.target.value)
              }}
              required
            />
            <p className={classes.spaceTenPx}></p>
            <div className={classes.halfZoneInp}>
              <input
                type="text"
                placeholder="Firstname"
                onChange={(e) => {
                  setFirstname(e.target.value)
                }}
                className={classes.inpHalfItem}
                required
              />
              <input
                type="text"
                placeholder="Surname"
                onChange={(e) => {
                  setSurename(e.target.value)
                }}
                className={classes.inpHalfItem}
                required
              />
            </div>
            <input
              type="text"
              placeholder="Email address"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className={classes.inpItem}
              required
            />
            <p className={classes.spaceTenPx}></p>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className={classes.inpItem}
              required
            />
            <p className={classes.spaceTenPx}></p>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
              className={classes.inpItem}
              required
            />
            <div className="flex pt-5 justify-around">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="male"
                  onChange={(e) => {
                    setGender(e.target.value)
                  }}
                  required
                />
                <label className="form-check-label text-red inline-block text-gray-800">
                  male
                </label>
              </div>
              <div className="form-check pl-5 form-check-inline">
                <input
                  className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="female"
                  required
                  onChange={(e) => {
                    setGender(e.target.value)
                  }}
                />
                <label className="form-check-label inline-block text-gray-800">
                  female
                </label>
              </div>
            </div>
            <p className={classes.spaceTenPx}></p>
            <p className={classes.labelText}>Date of Birth</p>
            <input
              type="date"
              onChange={(e) => {
                setBirthdate(e.target.value)
              }}
              className={classes.inpItem}
            />
            <p className={classes.spaceTenPx}></p>
            <hr />
            <p className={classes.spaceTenPx}></p>
            {statuspass ? (
              <></>
            ) : (
              <p>*your password and confirm password is not same</p>
            )}
            {useData ? <p>*This email is used</p> : <></>}
            {expressionPass ? <></> : <p>*password require more 6 character,1 upper case, 1 symbols,1 number</p>}
            <input
              type="submit"
              // onClick={clickShowCategory}
              className={classes.registerBut}
            />
            {showCategory ? (
              <></>
            ) : (
              <div className={classes.selectCategory}>
                <p className={classes.categoryText}>เลือกหมวดหมู่ที่คุณสนใจ</p>
                <p className={classes.categoryUndertext}>
                  * ใช้เพื่อเเนะนำสถานที่ ทีคุณอาจสนใจ
                </p>
                <div className={classes.categoryBg}>
                  {cateData.map((e: any, i: number) => {
                    return (
                      <OneCategory key={i} data={e.name} />
                      // <div className={classes.oneTag}>
                      //   <p>{e.name}</p>
                      // </div>
                    )
                  })}
                </div>
                <div className={classes.doneZone}>
                  <div className={classes.doneButton}>
                    <p>Done</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register
