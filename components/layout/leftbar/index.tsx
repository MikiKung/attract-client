import Link from "next/link";
import classes from "./index.module.scss";
const Leftbar = (props: any) => {
  return (
    <div className={classes.main}>
      <Link href="http://localhost:3000/">
        <span className={classes.allBtn}>
          <img src="./home.svg" alt="home" />
          <p className={classes.btnText}>Home</p>
        </span>
      </Link>
      <Link href="http://localhost:3000/follow">
        <span className={classes.allBtn}>
          <img src="./follow.svg" alt="follow" />
          <p className={classes.btnText}>Follow</p>
        </span>
      </Link>
      <span className={classes.allBtn}>
        <img src="./mark.svg" alt="home" />
        <p className={classes.btnText}>Mark</p>
      </span>
      <span className={classes.allBtn}>
        <img src="./recommand.svg" alt="home" />
        <p className={classes.btnText}>Recommand</p>
      </span>
      <Link href="http://localhost:3000/myprofile">
        <span className={classes.allBtn}>
          <img src="./profile.svg" alt="home" />
          <p className={classes.btnText}>Profile</p>
        </span>
      </Link>
    </div>
  );
};
export default Leftbar;
