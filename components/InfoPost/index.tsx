import classes from './index.module.scss'
import mockPost from '@/json/post.json'
import { useState } from 'react'
const InfoPost = (props: any) => {
  const [edit, setEdit] = useState(true)
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
        <img className={classes.infoImg} src={props.img} alt={props.id} />
      </div>
      <div className={classes.underPost}>
        <hr />
        <div>
          <div className={classes.mark}>
            <img
              src="./markpost.svg"
              className={classes.markImg}
              alt="markpost"
            />
            <p>{props.markuser.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoPost
