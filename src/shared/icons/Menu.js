import classes from "./menu.module.css";

const Menu = (props) => {
  const { onClick, active } = props;

  return (
    <div>
      <svg
        className={`${classes.menu} ${classes.menuRotate} ${
          active ? classes.active : ""
        }`}
        viewBox="18 22 65 55"
        width="40"
        onClick={onClick}
      >
        <path
          className={`${classes.line} ${classes.top}`}
          d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
        />
        <path
          className={`${classes.line} ${classes.middle}`}
          d="m 30,50 h 40"
        />
        <path
          className={`${classes.line} ${classes.bottom}`}
          d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
        />
      </svg>
    </div>
  );
};

export default Menu;
