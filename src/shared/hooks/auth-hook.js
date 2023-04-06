import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

let logoutTimer;

const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationTime, setTokenExpirationTime] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  // const [userEmail, setUserEmail] = userState(null);

  const navigate = useNavigate();

  const login = useCallback((uid, token, username, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setUserName(username);
    console.log("Logged in");
    setIsLoggedIn(true);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationTime(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
        username: username,
      })
    );
  }, []);

  //logout function
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationTime(null);
    setIsLoggedIn(false);
    localStorage.removeItem("userData");
    navigate("/");
  }, []);

  //to auto logout the user after the token expires
  useEffect(() => {
    if (token && tokenExpirationTime) {
      const remainingTime =
        tokenExpirationTime.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
      // setIsLoggedIn(false);
    }
  }, [token, logout, tokenExpirationTime]);

  //to store the user data and auto login the user
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.username,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId, userName };
};

export default useAuth;
