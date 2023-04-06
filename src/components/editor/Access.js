import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { useHttpClient } from "../../shared/hooks/http-hook";
import useAuth from "../../shared/hooks/auth-hook";

import { AuthContext } from "../../shared/context/auth-context";

import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

import classes from "./access.module.css";

const AccessBar = (props) => {
  const { setFlag, userProject, setUserProject, toggleAccess, setRemoved } =
    props;

  //state variables
  const [inputValue, setInputValue] = useState("");
  const [selectedVersion, setSelectedVersion] = useState();
  const [projectAccess, setProjectAccess] = useState();

  //context
  const ctx = useAuth(AuthContext);

  //http hook
  const { sendRequest } = useHttpClient();

  //param
  const prjName = useParams().prjName;

  //setting the loaded projects
  useEffect(() => {
    setProjectAccess(userProject?.access);
  }, [userProject, userProject?.access]);

  //handling the input change for username
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  //adding access to the project
  const handleSubmit = async (event) => {
    event.preventDefault();
    const mem = event.target[0].value;
    setInputValue("");

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/project/${ctx?.userId}/${prjName}/add`,
        "POST",
        JSON.stringify({ addUserAccess: `${mem}` }),
        { "Content-Type": "application/json" }
      );
      setFlag((prev) => !prev);
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  //fetching any version of the code
  const handleVersion = async (event) => {
    setSelectedVersion(event.target.value);
    console.log(event.target.value);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/project/${ctx?.userId}/${prjName}/${event.target.value}`
      );
      console.log(responseData);
      setUserProject({
        ...userProject,
        currentFile: responseData.version.fileName,
      });
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  //function to remove the access of user to a project
  const removeAccessHandler = async (uId) => {
    // console.log(uId);
    // console.log(userProject._id);

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/project/${ctx?.userId}/${prjName}/removeAccess`,
        "DELETE",
        JSON.stringify({ userId: uId, projectId: userProject._id }),
        { "Content-Type": "application/json" }
      );
      console.log(responseData);
      console.log(projectAccess);
      setRemoved(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`${classes.sideBar} ${
        toggleAccess ? classes.toggleAccess : ""
      }`}
    >
      <div className={classes.collab}>
        <h3>Add Member</h3>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            label="Username"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            size="small"
            color="primary"
          />
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </form>
      </div>
      <div className={classes.collaborators}>
        <h3>Members</h3>
        {projectAccess &&
          projectAccess.map((user) => (
            <div key={user.userId} className={classes.members}>
              <span>{user.username}</span>
              {user.userId !== userProject?.creator.toString() && (
                <span>
                  <HighlightOffOutlinedIcon
                    className={classes.delete}
                    onClick={() => removeAccessHandler(user.userId)}
                  />
                </span>
              )}
            </div>
          ))}
      </div>
      {ctx.userId === userProject?.creator.toString() && (
        <div className={classes.versionControl}>
          <FormControl
            variant="filled"
            size="small"
            sx={{ m: 1, minWidth: 80 }}
          >
            <InputLabel id="select-label">Version</InputLabel>
            <Select
              labelId="version-id"
              id="verion"
              value={selectedVersion}
              onChange={handleVersion}
              autoWidth
            >
              {userProject?.version?.map((v, i) => (
                <MenuItem
                  value={v._id.toString()}
                  key={`${v.fileName} ${i + 1}`}
                >
                  V {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
};

export default AccessBar;
