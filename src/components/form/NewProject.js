import { useNavigate } from "react-router";

import { useState } from "react";

import Button from "../../shared/UI/Button/Button";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { useHttpClient } from "../../shared/hooks/http-hook";
import useAuth from "../../shared/hooks/auth-hook";
import { AuthContext } from "../../shared/context/auth-context";

import classes from "./NewProject.module.css";

const initialValues = {
  projectName: "",
  description: "",
};

const repoSchema = Yup.object().shape({
  projectName: Yup.string().min(5, "Too Short!").required("Required"),
  description: Yup.string(),
});

const NewProject = (props) => {
  const ctx = useAuth(AuthContext);
  const navigate = useNavigate();
  const [repoData, setRepoData] = useState(initialValues);

  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  const errorStyles = {
    color: "red",
    fontSize: "12px",
    textAlign: "centre",
  };

  const cancelHandler = () => {
    props.onCancel();
  };
  return (
    <div className={classes.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={repoSchema}
        onSubmit={async (values) => {
          let responseData;
          try {
            responseData = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/api/project/${ctx.userId}/createpro`,
              "POST",
              JSON.stringify(values),
              {
                "Content-Type": "application/json",
              }
            );
            console.log(responseData);
            console.log("Repo created");
            props.onCancel();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {() => (
          <Form className={classes.form}>
            <label htmlFor="projectName">Repo Name*</label>
            <Field type="text" name="projectName" />
            <ErrorMessage
              name="projectName"
              component="div"
              style={errorStyles}
            />
            <label htmlFor="description">Description(optional)</label>
            <Field type="textarea" name="description" />
            <ErrorMessage
              name="textadescriptionrea"
              component="div"
              style={errorStyles}
            />
            <div className={classes.btns}>
              <Button className="dark" onClick={cancelHandler}>
                Cancel
              </Button>
              <Button className="light" type="submit">
                Create
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewProject;
