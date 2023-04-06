import { AuthContext } from "../../shared/context/auth-context";
import useAuth from "../../shared/hooks/auth-hook";

import classes from "./profile.module.css";

const Profile = () => {
  const ctx = useAuth(AuthContext);
  return (
    <div className={classes.proContainer}>
      <div className={classes.profileImg} />
      <div className={classes.username}>{ctx.userName}</div>
      <div className={classes.edit}>Edit Profile</div>
      <div className={classes.email}>{ctx?.email}</div>
    </div>
  );
};

export default Profile;
