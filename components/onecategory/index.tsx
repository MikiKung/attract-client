import classes from "./index.module.scss"
const OneCategory=(props:any)=>{
    return <div>
        <p className={classes.oneTag}>{props.data}</p>
    </div>
}
export default OneCategory