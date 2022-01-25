import classes from './index.module.scss'
import mockUser from '@/json/user.json'
const PostInput = () => {
  return (
    <div className={classes.main}>
      {/* <p>tessdasdasdt</p> */}
      <div className={classes.headInput}>
        <img
          src={mockUser.users[0].img}
          alt={mockUser.users[0].userID}
          className={classes.profileInput}
        />
        <input
          type="text"
          className={classes.inputZone}
          placeholder="What’s on your mind"
        />
      </div>
      <hr className="mt-2 mb-2" />
      <div className={classes.underInput}>
        <img className={classes.inputIconItem} src="./image.svg" alt="image" />
        <img
          className={classes.inputIconItem}
          src="./location.svg"
          alt="location"
        />
      </div>
    </div>
  )
}
export default PostInput
