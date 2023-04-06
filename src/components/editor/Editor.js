//react and react-router
import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router";

//react draggable and resizable
import { Resizable, ResizableBox } from "react-resizable";
import Draggable from "react-draggable";

//react split
import Split from "react-split";

import axios from "axios";

//for editor
import Editor from "@monaco-editor/react";
import { fromMonaco } from "@hackerrank/firepad";
import { dbCopy, dbRefence } from "./firebaseConfig";

//hooks and contexts
import { AuthContext } from "../../shared/context/auth-context";
import useAuth from "../../shared/hooks/auth-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

//material ui icons
import SendIcon from "@mui/icons-material/Send";
import VideoChatOutlinedIcon from "@mui/icons-material/VideoChatOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

//material ui fields
import { TextField } from "@material-ui/core";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

//react tostify
import { ToastContainer, toast } from "react-toastify";

//components
import Chat from "../chat/Chat";
import VideoChat from "../chat/VideoChat";
import languages from "../../shared/constants/languages";
import theme from "../../shared/constants/theme";
import SideBar from "./SideBar";
import AccessBar from "./Access";
import Broom from "../../shared/icons/Broom";

//css
import "react-toastify/dist/ReactToastify.css";
import "react-resizable/css/styles.css";
import classes from "./editor.module.css";
import "./split.css";

//code
const CodeEditor = () => {
  const ctx = useAuth(AuthContext);
  const prjName = useParams().prjName;

  const [toggle, setToggle] = useState({
    chat: false,
    video: false,
  });
  const [selectLng, setLng] = useState([
    {
      name: "javascript",
      ext: "javascript",
      value: 17,
    },
  ]);
  const [selectTheme, setTheme] = useState("vs-dark");

  const [dragging, setDragging] = useState(false);
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(300);
  const [outWidth, setOutWidth] = useState(400);
  const [outHeight, setOutHeight] = useState(150);
  const { sendRequest } = useHttpClient();

  const [outputting, setOutputting] = useState(false);
  const editorRef = useRef(null);
  const [loadedEditor, setLoadedEditor] = useState(false);
  const [editorInstance, setEditorInstance] = useState(null);
  const [output, setOutput] = useState("");
  const [outputError, setOutputError] = useState(false);
  const [userProject, setUserProject] = useState();
  const [flag, setFlag] = useState(false);
  const [toggleAccess, setToggleAccess] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [wobble, setWobble] = useState(false);
  const [removed, setRemoved] = useState(false);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    setEditorInstance(editor);
    setLoadedEditor(true);
  }
  useEffect(() => {
    try {
      const fetchPrj = async () => {
        if (ctx.userId) {
          console.log("here");
          const responseData = await sendRequest(
            `http://localhost:5000/api/project/${ctx?.userId}/${prjName}`
          );
          console.log(responseData);
          setUserProject(responseData.project);
          setRemoved(false);
        }
      };
      fetchPrj();
    } catch (err) {
      console.log(err);
    }
  }, [ctx.userId, flag, removed]);

  useEffect(() => {
    if (!loadedEditor) {
      return;
    }
    if (userProject) {
      let currentRef;
      let dbRef;
      currentRef = userProject.currentFile;
      dbRef = dbRefence(currentRef);

      const firepad = fromMonaco(dbRef, editorRef.current);
      const username = ctx?.userName ? ctx.userName : "Guest";
      firepad.setUserName(username);
    }
  }, [loadedEditor, userProject]);

  useEffect(() => {
    if (outputError && selectLng) {
      const encodedParams = new URLSearchParams();
      encodedParams.append("LanguageChoice", selectLng);
      console.log(selectLng);
      encodedParams.append("Program", `${editorInstance.getValue()}`);
      if (customInput) {
        encodedParams.append("Input", `${customInput}`);
      }

      const options = {
        method: "POST",
        url: "https://code-compiler.p.rapidapi.com/v2",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "437e62ad8fmsh6ef5ccef38836a6p1838c7jsnd738d10be056",
          "X-RapidAPI-Host": "code-compiler.p.rapidapi.com",
        },
        data: encodedParams,
      };

      axios
        .request(options)
        .then(function (response) {
          setOutput((prev) => output + response.data.Result);
          console.log(response.data.Result);
          setOutputError(false);
          setCustomInput("");
        })
        .catch(function (error) {
          console.error(error);
          setOutputError(false);
          setCustomInput("");
        });
    }
  }, [outputError]);

  const runCode = () => {
    setOutputError(true);
  };

  useEffect(() => {
    if (output) setOutputting(true);
  }, [output]);

  const chatToggleHandler = () => {
    setToggle({ ...toggle, chat: !toggle.chat });
  };

  const videoToggleHandler = () => {
    setToggle({ ...toggle, video: !toggle.video });
  };

  const saveCodeHandler = async () => {
    const currentDate = new Date();
    const newDb = `${
      userProject.projectName
    } ${currentDate.toLocaleDateString()} ${currentDate
      .toTimeString()
      .substring(0, 5)}`;
    console.log(newDb);
    let body = { currentFile: newDb, prevFile: userProject.currentFile };
    dbCopy(userProject.projectName, newDb);
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/project/${ctx?.userId}/${prjName}`,
        "POST",
        JSON.stringify(body),
        { "Content-Type": "application/json" }
      );
      setUserProject({ ...userProject, currentFile: newDb });
      savedToast("Saved Successfully!", "success");
      console.log(responseData);
      setCustomInput("");
    } catch (err) {
      savedToast("Something went wrong!", "error");
      console.log(err);
      setCustomInput("");
    }
  };

  

  const themeChangeHandler = (e) => {
    console.log(e.target.value);
    setTheme(e.target.value);
  };
  const langChangeHandler = (index) => {
    console.log(languages[index].value);
    setLng(languages[index].value);
  };
  const toggleAccessHandler = () => {
    setToggleAccess((prev) => !prev);
  };

  //saved toast
  const savedToast = (msg, type) => {
    if (type === "success") toast.success(msg);
    if (type === "error") toast.err(msg);
  };

  //custom input handler
  const inputChangeHandler = (event) => {
    setCustomInput(event.target.value);
  };

  const convertWhitespace = (text) => {
    const words = text.split(/(\s+)/);
    return words.map((wc, index) => {
      if (/\s+/.test(wc)) {
        switch (wc) {
          case " ":
            return <>&nbsp;</>;
          case "\n":
            return <br />;
          case "\t":
            return <>&nbsp;&nbsp;&nbsp;&nbsp;</>;
          default:
            return wc;
        }
      }
      return wc;
    });
  };

  const outputTxt = convertWhitespace(output);

  //handling output clear
  const outputClearHandler = () => {
    setWobble((prev) => !prev);
    setOutput("");
  };

  

  return (
    <div className={classes.editorContainer}>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* {tools} */}
      {toggle.chat && (
        <div className={classes.chat}>
          <Chat />
        </div>
      )}
      <AccessBar
        setFlag={setFlag}
        userProject={userProject}
        setUserProject={setUserProject}
        toggleAccess={toggleAccess}
        removed={removed}
        setRemoved={setRemoved}
      />
      <SideBar
        toggleAccessHandler={toggleAccessHandler}
        toggle={toggleAccess}
        onSave={saveCodeHandler}
        onLangChange={langChangeHandler}
        toggleVideo={videoToggleHandler}
        toggleChat={chatToggleHandler}
        userProject={userProject}
      />
      <div className={classes.container}>
        <Split
          className="split1"
          sizes={[75, 25]}
          gutterSize={8}
          minSize={[450, 200]}
          direction="horizontal"
          style={{
            width: "calc(100vw - 4.7rem)",
            height: "calc(100vh - 4.1rem)",
            position: "absolute",
            left: "3.6rem",
          }}
        >
          <div className={classes.editor}>
            <Editor
              defaultLanguage={selectLng.ext}
              theme={selectTheme}
              defaultValue="// Hello World"
              onMount={handleEditorDidMount}
            />
          </div>

          <Split
            className="split2"
            direction="vertical"
            sizes={[60, 40]}
            minSize={[200, 100]}
            gutterSize={8}
            style={{
              height: "calc(100vh - 4.1rem)",
            }}
          >
            <div className={classes.output}>
              <h1>Output</h1>
              {!!output && <p className={classes.outputTxt}>{outputTxt}</p>}
              <div className={classes.clear}>
                <Broom
                  onClick={outputClearHandler}
                  onAnimationEnd={() => setWobble(false)}
                  wobble={wobble}
                />
              </div>
            </div>
            <div className={classes.input}>
              <h1>Input</h1>
              <textarea
                className={classes.customIp}
                onChange={inputChangeHandler}
                value={customInput}
              />
              <button className={classes.compileBtn} onClick={() => runCode()}>
                Run
              </button>
            </div>
          </Split>
        </Split>
      </div>
      {toggle.video && (
        <div>
          <VideoChat end={videoToggleHandler} />
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
