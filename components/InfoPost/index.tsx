import classes from './index.module.scss'
import mockPost from '@/json/post.json'
import mockUser from '@/json/user.json'
import { useState } from 'react'
// interface Ipost {
//   id: string
//   text: string
//   img: string
//   ownuser: { firstname: string; img: string; surename: string }
//   markuser: string
//   timepost: string
//   category: string[]
//   comment: [
//     {
//       id: string
//       owner: string
//       commentImg: string
//       commentuser: string
//       commentText: string
//     },
//   ]
// }

const InfoPost = (props: any) => {
  const [edit, setEdit] = useState(true)
  const [markClick, setMarkClick] = useState(true)
  const [showComment, setShowComment] = useState(true)
  function clickShowComment() {
    setShowComment(!showComment)
  }
  function clickChangeMark() {
    setMarkClick(!markClick)
    props.markuser.length += 1
  }
  function clickChangeMarkClose() {
    setMarkClick(!markClick)
    props.markuser.length -= 1
  }
  function clickEdit() {
    setEdit(!edit)
  }
  return (
    <div className={classes.main}>
      <div className={classes.headPost}>
        <div className="flex">
          <img
            src={props.ownuser.img}
            alt={props.id}
            className={classes.profileImg}
          />
          <div className="pl-2">
            <p>
              {props.ownuser.firstname} {props.ownuser.surename}
            </p>
            <p className={classes.timePost}>{props.timepost}</p>
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
        <p className={classes.infoText}>{props.text}</p>
        {/* {props.} */}
        <img className={classes.infoImg} src={props.img} alt={props.id} />
      </div>
      <div className={classes.underPost}>
        <hr />
        <div className={classes.underZone}>
          {markClick ? (
            <div onClick={clickChangeMark} className={classes.markBeforeClick}>
              <img
                src="./markpost.svg"
                className={classes.markImg}
                alt="markpost"
              />
              <p className="pl-1">{props.markuser.length}</p>
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
              <p className="pl-1">{props.markuser.length}</p>
            </div>
          )}
          <div onClick={clickShowComment} className={classes.mark}>
            <img
              className={classes.markImg}
              src="./comment.svg"
              alt="comment"
            />
            <p className="pl-1">{props.comment.length}</p>
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
}

export default InfoPost
