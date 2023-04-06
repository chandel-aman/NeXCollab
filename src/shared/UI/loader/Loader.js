import classes from "./loader.module.css";

const Loader = () => {
  return (
    <div className={classes.loaderContainer}>
      <div className={classes.dot1}></div>
      <div className={classes.dot2}></div>
      <div className={classes.dot3}></div>
      <div className={classes.dot4}></div>
    </div>
  );
};

export default Loader;
