import { useContext, useState } from "react";
import NavLinks from "./NavLinks";
import classes from "./main-header.module.css";

import { AuthContext } from "../context/auth-context";

const MainHeader = () => {
  const [toggleLogout, setToggleLogout] = useState(false);
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
    setToggleLogout(false);
    console.log("Logged out!");
  };

  const toggleLogoutHandler = () => {
    console.log('clicked')
    setToggleLogout((prev) => !prev);
  };
  return (
    <nav className={classes.nav}>
      <span className={classes.logotxt}>NeX Collab</span>
      {!authCtx.isLoggedIn && <NavLinks />}
      {authCtx.isLoggedIn && (
        <div className={classes.user}>
          <span className={classes.username} onClick={toggleLogoutHandler}>
            {authCtx.username}
          </span>
          <span
            className={`${classes.logout} ${
              toggleLogout ? classes.showLogout : ""
            }`}
            onClick={logoutHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 6.35 6.35"
            >
              <path
                fill="#000"
                fillRule="evenodd"
                d="M7.953.998a3.024 3.024 0 0 0-3.006 3.004V20a3.024 3.024 0 0 0 3.006 3.004h3.994A3.022 3.022 0 0 0 14.951 20v-4.002c0-1.334-2-1.334-2 0V20a.983.983 0 0 1-1.004 1.004H7.953A.983.983 0 0 1 6.95 20V4.002a.983.983 0 0 1 1.004-1.004h3.994a.983.983 0 0 1 1.004 1.004v4.002c0 1.334 2 1.334 2 0V4.002A3.022 3.022 0 0 0 11.947.998H7.953zM1.957 4.984a1 1 0 0 0-1.01 1.02v11.994a1 1 0 0 0 2 0V6.004a1 1 0 0 0-.982-1.02 1 1 0 0 0-.008 0zm16.037 2.004a1 1 0 0 0-.096.004 1 1 0 0 0-.6 1.713L19.595 11h-9.588a1.006 1.006 0 0 0-.104 0c-1.333.07-1.23 2.071.104 2.002h9.582l-2.29 2.287a1 1 0 1 0 1.411 1.418l4.002-4.002a1 1 0 0 0 0-1.41l-4.002-4a1 1 0 0 0-.715-.307z"
                color="#000"
                fontFamily="sans-serif"
                fontWeight={400}
                overflow="visible"
                paintOrder="stroke fill markers"
                transform="scale(.26458)"
                style={{
                  lineHeight: "normal",
                  fontVariantLigatures: "normal",
                  fontVariantPosition: "normal",
                  fontVariantCaps: "normal",
                  fontVariantNumeric: "normal",
                  fontVariantAlternates: "normal",
                  fontFeatureSettings: "normal",
                  textIndent: 0,
                  textAlign: "start",
                  textDecorationLine: "none",
                  textDecorationStyle: "solid",
                  textDecorationColor: "#000",
                  textTransform: "none",
                  textOrientation: "mixed",
                  shapePadding: 0,
                  isolation: "auto",
                  mixBlendMode: "normal",
                }}
              />
            </svg>
            <span>Logout</span>
          </span>
        </div>
      )}
    </nav>
  );
};

export default MainHeader;
