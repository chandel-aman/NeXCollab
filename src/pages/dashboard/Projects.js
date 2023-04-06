import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import useAuth from "../../shared/hooks/auth-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Button from "../../shared/UI/Button/Button";
import Card from "../../shared/UI/card/Card";
import NewProject from "../../components/form/NewProject";
import Loader from "../../shared/UI/loader/Loader";

import classes from "./project.module.css";

const PrjList = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const [loadedProjects, setLoadedProjects] = useState();
  const ctx = useAuth(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/project/${ctx.userId}`
        );
        console.log(responseData.project);
        setLoadedProjects(responseData.project);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, [sendRequest, ctx.userId]);

  return (
    <>
      {isLoading && <Loader />}
      {!!loadedProjects &&
        !isLoading &&
        loadedProjects.map((prj) => (
          <Card
            className={classes.prjList}
            onClick={() => navigate(`/${ctx.userId}/${prj.projectName}/editor`)}
            key={`${loadedProjects.projectName} ${prj._id}`}
          >
            <p>{prj.projectName}</p>
            <p className={classes.wrapper}>
              <span>{prj.description}</span>
            </p>
            <p className={classes.tech}>
              {/* <span>{prj?.techStack?.map((ts) => ts).join(", ")}</span> */}
              <span className={classes.tech}>
                {prj.creator.toString() === ctx.userId ? "" : "Shared Project"}
              </span>
              <span>&nbsp;&nbsp;Collaborators {prj?.access?.length}</span>
            </p>
          </Card>
        ))}
      {!loadedProjects && <Card>No Project Found!</Card>}
    </>
  );
};

const Projects = () => {
  const [showNewForm, setShowNewForm] = useState(false);

  const repoCreateHandler = () => {
    setShowNewForm(true);
  };

  const closeFormHandler = () => {
    setShowNewForm(false);
  };

  return (
    <>
      {!showNewForm && (
        <div className={classes.prjContainer}>
          <div className={classes.prjHeader}>
            <span>Projects</span>
            <Button className="light" onClick={repoCreateHandler}>
              New
            </Button>
          </div>
          <PrjList />
        </div>
      )}
      {showNewForm && <NewProject onCancel={closeFormHandler} />}
    </>
  );
};

export default Projects;
