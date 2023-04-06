import Profile from "./Profile";
import Projects from "./Projects";

import classes from "./dashboard.module.css";

const Dashboard = (props) => {
  return (
    <div className={classes.dashboard}>
      <Profile />
      <Projects />
    </div>
  );
};

export default Dashboard;
