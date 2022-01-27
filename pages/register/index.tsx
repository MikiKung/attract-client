import Link from "next/link";
import { useState } from "react";
import classes from "./index.module.scss";
import mockTag from "@/json/tag.json";
const Register = () => {
  const [showCategory, setShowcategory] = useState(true);
  function clickShowCategory() {
    setShowcategory(!showCategory);
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
          <p onClick={clickShowCategory} className={classes.registerBut}>
            Register
          </p>
          {showCategory ? (
            <></>
          ) : (
            <div className={classes.selectCategory}>
              <p className={classes.categoryText}>เลือกหมวดหมู่ที่คุณสนใจ</p>
              <p className={classes.categoryUndertext}>
                * ใช้เพื่อเเนะนำสถานที่ ทีคุณอาจสนใจ
              </p>
              <div className={classes.categoryBg}>
                {mockTag.tag.map((e) => {
                  return (
                    <div className={classes.oneTag}>
                      <p>{e.name}</p>
                    </div>
                  );
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
    </div>
  );
};

export default Register;
