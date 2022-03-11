import axios from 'axios'
import { useEffect, useState } from 'react'
import { dateFormat } from '../../utils/helper'
import classes from './index.module.scss'



const MyPost = (props: any) => {
  const [data, setData] = useState([])
  useEffect(() => {
    setData(props.user.postId)
  }, [])
  const [edit, setEdit] = useState(true)
  const [markClick, setMarkClick] = useState(true)
  const [showComment, setShowComment] = useState(true)
  function clickShowComment() {
    setShowComment(!showComment)
  }
  function clickChangeMark() {
    setMarkClick(!markClick)
  }
  function clickChangeMarkClose() {
    setMarkClick(!markClick)
  }
  function clickEdit() {
    setEdit(!edit)
  }

  return (
    <div>
      {
       data &&  data.map((e: any, i: number) => {

          const date = dateFormat(props.user.postId[i].timePost)

          console.log(data);
          

          return (
            <div key={i} className={classes.main}>
              <div className={classes.headPost}>
                <div className="flex">
                  <img
                    src={props.user.img}
                    alt={props.id}
                    className={classes.profileImg}
                  />
                  <div className="pl-2">
                    <p>
                      {props.user.firstname} {props.user.surename}
                    </p>
                    <p className={classes.timePost}>{date}</p>
                  </div>
                </div>
                <div>
                  <img
                    className={classes.morePost}
                    onClick={clickEdit}
                    src="./more.svg"
                    alt="more"
                  />
                </div>
                {edit ? (
                  <></>
                ) : (
                  <div className={classes.modalPost}>
                    <p className={classes.modalItem}>edit post</p>
                    <p className={classes.modalItem}>delete post</p>
                  </div>
                )}
              </div>

              <div className={classes.middlePost}>
                <p>{props.user.postId[i].postText}</p>
                {/* <p className={classes.infoText}>{props.text}</p> */}
                <div className={classes.infoCate}>
                  {props.user.postId[i].categoryId.map((u: any, j: number) => {
                    // console.log(props.user.postId[i]);
                    // console.log(u[i]);

                    return (
                      <div className={classes.oneTag} key={j}>
                        <p>{props.user.postId[i].categoryId[j].name}</p>
                      </div>
                    )
                  })}
                </div>
                <img
                  className={classes.infoImg}
                  src={props.user.postId[i].img}
                  // alt={props.user.postId[i]._id}
                />
              </div>

              <div className={classes.underPost}>
                <hr />
                <div className={classes.underZone}>
                  {markClick ? (
                    <div
                      onClick={clickChangeMark}
                      className={classes.markBeforeClick}
                    >
                      <img
                        src="./markpost.svg"
                        className={classes.markImg}
                        alt="markpost"
                      />
                      {/* <p className="pl-1">{props.markuser.length}</p> */}
                    </div>
                  ) : (
                    <div
                      onClick={clickChangeMarkClose}
                      className={classes.markAfterClick}
                    >
                      <img
                        src="./markClick.svg"
                        className={classes.markImg}
                        alt="markpost"
                      />
                      {/* <p className="pl-1">{props.markuser.length}</p> */}
                    </div>
                  )}
                  <div onClick={clickShowComment} className={classes.mark}>
                    <img
                      className={classes.markImg}
                      src="./comment.svg"
                      alt="comment"
                    />
                    {/* <p className="pl-1">{props.comment.length}</p> */}
                  </div>
                </div>
                {showComment ? (
                  <></>
                ) : (
                  <div>
                    <hr />
                    {props.comment.map((e: any) => {
                      return (
                        <div className={classes.oneComment}>
                          <img
                            className={classes.commentUserImg}
                            src={e.commentImg}
                            alt={e.id}
                          />
                          <p className={classes.commentText}>{e.commentText}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
                <div className={classes.myComment}>
                  <img
                    src={props.user.img}
                    alt="profile"
                    className={classes.commentUserImg}
                  />
                  <input
                    className={classes.commentUserText}
                    placeholder="you have a quastion?"
                    type="text"
                  />
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
export default MyPost
