import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";
import useAuth from "./shared/hooks/auth-hook";

import MainHeader from "./shared/navigation/MainHeader";
import Signup from "./pages/auth-page/signup/Signup";
import Login from "./pages/auth-page/login/Login";
import Editor from "./components/editor/Editor";
import DashBoard from "./pages/dashboard/Dashboard";
import NewProject from "./components/form/NewProject";
import Home from "./pages/home/Home";
import Chat from "./components/chat/Chat";
import VideoChat from "./components/chat/VideoChat";
import OpenAI from "./components/chat/OpenAI";
import GenerateCompletion from "./components/chat/OpenAI";
import Loader from "./shared/UI/loader/Loader";
import GroupVideoChat from "./components/chat/GroupVideoChat";

const App = () => {
  const { login, logout, userId, token, userName, isLoggedIn } =
    useAuth(AuthContext);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        username: userName,
        userId,
        login,
        logout,
      }}
    >
      <MainHeader />
      {/* <GenerateCompletion /> */}

      <Suspense element={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {!token && (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Home />} />
            </>
          )}
          {token && (
            <>
              <Route path="/:userId/dashboard/" element={<DashBoard />} />
              <Route
                path="/:userId/dashboard/newRepo"
                element={<NewProject />}
              />
              <Route path="/:userId/:prjName/editor" element={<Editor />} />
            </>
          )}
        </Routes>
      </Suspense>
    </AuthContext.Provider>
  );
};

export default App;
