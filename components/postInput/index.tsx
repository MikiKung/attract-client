import classes from './index.module.scss'
import mockUser from '@/json/user.json'
import mockTag from '@/json/tag.json'
import { useState } from 'react'
const PostInput = (props: any) => {
  const [showInputPost, setShowInputPost] = useState(true)
  const [showCategory, setShowCategory] = useState(true)
  const [showAddCategory, setShowAddCategory] = useState(true)
  function clickShowCategory() {
    setShowCategory(!showCategory)
  }
  function clickShowAddCategory() {
    setShowAddCategory(!showAddCategory)
  }
  function clickShowInputPost() {
    setShowInputPost(!showInputPost)
  }
  return (
    <div className={classes.main}>
      {/* <p>tessdasdasdt</p> */}
      <div className={classes.headInput}>
        <img
          src={props.user.img}
          alt={props.user.userID}
          className={classes.profileInput}
        />
        <input
          onClick={clickShowInputPost}
          type="text"
          className={classes.inputZone}
          placeholder="What’s on your mind"
        />
      </div>
      <hr className="mt-2 mb-2" />
      <div className={classes.underInput}>
        <img
          onClick={clickShowInputPost}
          className={classes.inputIconItem}
          src="./image.svg"
          alt="image"
        />
        <img
          onClick={clickShowInputPost}
          className={classes.inputIconItem}
          src="./location.svg"
          alt="location"
        />
        {showInputPost ? (
          <></>
        ) : (
          <div className={classes.modalPost}>
            <div className={classes.topZonePost}>
              <img
                src={props.user.img}
                className={classes.profileImg}
                alt={props.firstname}
              />
              <p>
                {props.user.firstname} {props.user.surename}
              </p>
            </div>
            <div>
              <textarea
                placeholder="Where have you traveled?"
                className={classes.inpPost}
              ></textarea>
            </div>
            <div className={classes.underCenterZonePost}>
              <div className={classes.imgPost}>
                <label htmlFor="imgPost">
                  <img
                    className={classes.imgPostItem}
                    src="./image.svg"
                    alt="image"
                  />
                </label>
                <input id="imgPost" type="file" />
              </div>
              <img
                className={classes.imgPostItem}
                onClick={clickShowCategory}
                src="./location.svg"
                alt="location"
              />
              {showCategory ? (
                <></>
              ) : (
                <div className={classes.categoryModal}>
                  {/* <p>test</p> */}
                  <input
                    type="text"
                    className={classes.categoryInput}
                    placeholder="เลือกหมวดหมู่ที่เกี่ยวกับการท่องเที่ยวของคุณ"
                  />
                  <div>
                    {mockTag.tag.map((e) => {
                      return (
                        <div
                          onClick={clickShowCategory}
                          className={classes.oneTag}
                        >
                          <p className="pl-1">{e.name}</p>
                          <hr />
                        </div>
                      )
                    })}
                    <div
                      onClick={clickShowAddCategory}
                      className={classes.oneTag}
                    >
                      <p className="pl-1">เพิ่มหมวดหมู่ ++++</p>
                      <hr />
                    </div>
                    {showAddCategory ? (
                      <></>
                    ) : (
                      <div className={classes.addCategoryModal}>
                        <p>ชื่อหมวดหมู่ที่ต้องการเพิ่ม</p>
                        <input
                          className={classes.categoryInput}
                          type="text"
                          placeholder="เพิ่มหมวดหมู่ที่เกี่ยวกับการท่องเที่ยวของคุณ"
                        />
                        <div
                          onClick={clickShowAddCategory}
                          className={classes.btnAddCategory}
                        >
                          <p>Done</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div onClick={clickShowInputPost} className={classes.btnPost}>
              <p className={classes.btnPostText}>Post</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default PostInput
