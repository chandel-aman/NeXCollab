import { useState } from "react";

import useAuth from "../../shared/hooks/auth-hook";

import { AuthContext } from "../../shared/context/auth-context";
import AddUser from "../../shared/icons/AddUser";
import VersionControl from "../../shared/icons/VersionControl";
import Save from "../../shared/icons/Save";
import Menu from "../../shared/icons/Menu";
import Video from "../../shared/icons/Video";
import Chat from "../../shared/icons/Chat";
import Theme from "../../shared/icons/Theme";

import classes from "./sideBar.module.css";
import Select from "../../shared/UI/custom/Select";

const SideBar = (props) => {
  //context
  const ctx = useAuth(AuthContext);

  //states to handle the active icon
  const [active, setActive] = useState(false);

  //handling the menu
  const menuHandler = () => {
    setActive((prev) => !prev);
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes.tools}>
        <Select onLangChange={props.onLangChange} />
        <VersionControl />
        {ctx.userId === props.userProject?.creator.toString() && (
          <AddUser onClick={props.toggleAccessHandler} toggle={props.toggle} />
        )}
        <Save onClick={props.onSave} />
      </div>
      <div className={classes.utils}>
        <div
          className={`${classes["utils-icons"]} ${
            active ? classes.toggleMenu : ""
          }`}
        >
          <Video onClick={props.toggleVideo} />
          <Chat onClick={props.toggleChat} />
          <Theme />
        </div>
        <Menu onClick={menuHandler} active={active} />
      </div>
    </div>
  );
};

export default SideBar;
