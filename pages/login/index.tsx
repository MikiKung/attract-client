import classes from "./index.module.scss";
const Login = () => {
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
            <input className={classes.inputItem} type="text" placeholder="Email address" />
            <input className={classes.inputItem} type="text" placeholder="Password" />
            <div className={classes.submitItem}><p className={classes.submitText}>Login</p></div>
            <hr />
            <div className={classes.submitItem}><p className={classes.submitText}>Register</p></div>
        </div>
      </div>
    </div>
  );
};
export default Login;
