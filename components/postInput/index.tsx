import classes from './index.module.scss'
import mockTag from '@/json/tag.json'
import { useRouter } from 'next/dist/client/router'
import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { create } from 'ipfs-http-client'

const PostInput = (props: any) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showInputPost, setShowInputPost] = useState(true)
  const [showCategory, setShowCategory] = useState(true)
  const [showAddCategory, setShowAddCategory] = useState(true)
  const [categoryData, setShowCategoryData] = useState<any>({})
  const [Cname, setCname] = useState('')
  const [cateInPost, setCateInPost] = useState<any>([])
  const [file, setFile] = useState<any>()
  const timeNow = Date.now()
  const [textPost, setTextPost] = useState('')
  const [user, setUser] = useState<any>({})
  // const [postId, setPostId] = useState<any>('')

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

  function delList(i: number) {
    cateInPost.splice(i, 1)
    setCateInPost([...cateInPost])
  }

  function delImg() {
    setFile('')
  }

  const addCateInPost = (res: any) => {
    setCateInPost([...cateInPost, res])
    // console.log([...cateInPost, res])
  }
  // post postdata
  function PostPostInfo(e: any) {
    setLoading(true)
    e.preventDefault()
    axios
      .post(`http://localhost:3001/post`, {
        img: file,
        ownUserId: user._id,
        timePost: timeNow,
        postText: textPost,
        categoryId: cateInPost,
      })
      .then((res) => {
        clickShowInputPost()
        setCateInPost([])
        setLoading(false)
        // window.location
        // setPostId(res.data._id)
      })
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/category`).then((res) => {
      setShowCategoryData(res.data)
    })
    axios
      .get('http://localhost:3001/user/me', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setUser(res.data)
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

  // const previewImage = useMemo(() => {
  //   if (process.browser) {
  //     if (!file) return ''
  //     return URL.createObjectURL(file)
  //   }
  // }, [file])

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
    <form onSubmit={PostPostInfo}>
      <div className={classes.main}>
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
                  onChange={(e) => {
                    setTextPost(e.target.value)
                  }}
                  className={classes.inpPost}
                ></textarea>
                {file && (
                  <div className={classes.imgPreview}>
                    <img src={file} />
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
                        <span>{e.name}</span>
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
                    accept="image/png,image/jpeg,image/jpg"
                    onClick={(event: any) => {
                      event.target.value = null
                    }}
                    onChange={handleImageChange}
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
                      <img
                        src="./cross.svg"
                        onClick={clickShowCategory}
                        alt=""
                      />
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
                              addCateInPost(e)
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
              <div className={classes.btnPost}>
                {loading ? (
                  <p>loading...</p>
                ) : (
                  <p onClick={PostPostInfo} className={classes.btnPostText}>
                    Post
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
export default PostInput
