import classes from './index.module.scss'
import mockTag from '@/json/tag.json'
import { useRouter } from 'next/dist/client/router'
import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
interface ICategory {
  name?: string
}
const PostInput = (props: any) => {
  const router = useRouter()
  const [showInputPost, setShowInputPost] = useState(true)
  const [showCategory, setShowCategory] = useState(true)
  const [showAddCategory, setShowAddCategory] = useState(true)
  const [categoryData, setShowCategoryData] = useState<any>({})
  const [Cname, setCname] = useState('')
  const [cateInPost, setCateInPost] = useState<any>([])
  const [file, setFile] = useState<any>()

  function delList(i: number) {
    cateInPost.splice(i, 1)
    setCateInPost([...cateInPost])
  }

  function delImg() {
    setFile('')
  }

  const addCateInPost = (res: any) => {
    setCateInPost([...cateInPost, res])
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/category`).then((res) => {
      setShowCategoryData(res.data)
    })
  }, [])
  function postCategory() {
    if (confirm(`confirm to input ${Cname} in category?`)) {
    axios
      .post('http://localhost:3001/category', {
        name: Cname,
      })
      .then((res) => {
        setShowCategoryData([...categoryData, res.data])
        setShowAddCategory(!showAddCategory)
      })
  }
  }

  const previewImage = useMemo(() => {
    if (process.browser) {
      if (!file) return ''
      return URL.createObjectURL(file)
    }
  }, [file])

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
            <div className={classes.topZonePost2}>
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
                <img src="./cross.svg" onClick={clickShowInputPost} alt="" />
              </div>
            </div>
            <div>
              <textarea
                placeholder="Where have you traveled?"
                className={classes.inpPost}
              ></textarea>
              {previewImage && (
                <div className={classes.imgPreview}>
                  <img src={previewImage} />
                  <img
                    src="./cross.svg"
                    className={classes.ImgCross}
                    alt="cross"
                    onClick={delImg}
                  />
                </div>
              )}
            </div>
            <div>
              {cateInPost.map((e: any, i: number) => {
                return (
                  <div key={i} className={classes.tag}>
                    <div className={classes.tagCate}>
                      <span>{e}</span>
                      <img
                        className={classes.crossImgCate}
                        onClick={() => delList(i)}
                        src="./cross.svg"
                        alt=""
                      />
                    </div>
                  </div>
                )
              })}
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
                <input
                  id="imgPost"
                  type="file"
                  onClick={(event: any) => {
                    event.target.value = null
                  }}
                  onChange={(e) => {
                    setFile(e.target.files![0])
                  }}
                />
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
                  <div className={classes.closeInp}>
                    <img src="./cross.svg" onClick={clickShowCategory} alt="" />
                  </div>
                  <input
                    type="text"
                    className={classes.categoryInput}
                    placeholder="เลือกหมวดหมู่ที่เกี่ยวกับการท่องเที่ยวของคุณ"
                  />
                  <div>
                    {categoryData.map((e: any, i: number) => {
                      return (
                        <div
                          key={i}
                          //  zone add cateory in post
                          onClick={() => {
                            addCateInPost(e.name)
                          }}
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
                        <div className={classes.closeAddCategory}>
                          <p>ชื่อหมวดหมู่ที่ต้องการเพิ่ม</p>
                          <div>
                            <img
                              src="./cross.svg"
                              onClick={clickShowAddCategory}
                              alt=""
                            />
                          </div>
                        </div>
                        <input
                          className={classes.categoryInput}
                          type="text"
                          onChange={(e) => {
                            setCname(e.target.value)
                          }}
                          placeholder="เพิ่มหมวดหมู่ที่เกี่ยวกับการท่องเที่ยวของคุณ"
                        />
                        <div
                          onClick={postCategory}
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
