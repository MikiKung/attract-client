import classes from "./index.module.scss";

const ProfileZone = (props: any) => {
  return (
    <div className={classes.allZone}>
      <img className={classes.topZoneProfile} src={props.user.bgImg} alt="" />
      <div className={classes.underZoneProfile}>
        <img src={props.user.img} alt="" />
      </div>

      <div className={classes.textProfile}>
        <div>
          <p className={classes.textNameUser}>John Carter</p>
          <p className={classes.textFollwing}>following</p>
          <p className={classes.textFollwer}>follower</p>
          <p className={classes.textEditProfile}>Edit Profile</p>
        </div>
        <div className={classes.textAdd}>
          <p>@John27</p>
        </div>
        <div className={classes.textBio}>
          <p>Reason of happiness not a trip but on the way</p>
        </div>
        <div>
          <img
            className={classes.iconBirthday}
            src="jam_birthday-cake.svg"
            alt=""
          />
          <p className={classes.birthday}>20/10/2000</p>
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default ProfileZone;
