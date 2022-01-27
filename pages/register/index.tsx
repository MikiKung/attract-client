import Link from 'next/link'
import classes from './index.module.scss'
const Register = () => {
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
        <p className={classes.textInfo}>register</p>
        <div className={classes.inputForm}>
          <input
            className={classes.inpItem}
            placeholder="Username"
            type="text"
          />
          <p className={classes.spaceTenPx}></p>
          <div className={classes.halfZoneInp}>
            <input
              type="text"
              placeholder="Firstname"
              className={classes.inpHalfItem}
            />
            <input
              type="text"
              placeholder="Surname"
              className={classes.inpHalfItem}
            />
          </div>
          <input
            type="text"
            placeholder="Email address"
            className={classes.inpItem}
          />
          <p className={classes.spaceTenPx}></p>
          <input
            type="text"
            placeholder="Password"
            className={classes.inpItem}
          />
          <p className={classes.spaceTenPx}></p>
          <input
            type="text"
            placeholder="Confirm Password"
            className={classes.inpItem}
          />
          <p className={classes.spaceTenPx}></p>
          <p className={classes.labelText}>Date of Birth</p>
          <input type="date" className={classes.inpItem} />
          <p className={classes.spaceTenPx}></p>
          <hr />
          <p className={classes.spaceTenPx}></p>
          <p className={classes.registerBut}>Register</p>
        </div>
      </div>
    </div>
  )
}

export default Register
