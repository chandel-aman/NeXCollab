import classes from "./logos.module.css";

const KotlinLogo = (props) => {
  return (
    <div
      className={`${classes["svg-icons"]} ${classes.kotlin} ${classes.logo} ${
        props.toggle ? classes.active : ""
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="50"
        height="50"
        viewBox="0 0 24 24"
      >
        <path
          fill="#fff"
          d="M11.59 3L3 11.59V4c0-.552.448-1 1-1H11.59zM18.88 4.71L9.58 14l-6.46 6.46C3.04 20.32 3 20.17 3 20v-5.59L14.41 3h3.76C19.07 3 19.51 4.08 18.88 4.71zM18.586 21H5.42l7.785-7.795 6.087 6.087C19.923 19.923 19.477 21 18.586 21z"
        ></path>
      </svg>
    </div>
  );
};

export default KotlinLogo;
