import { useContext } from "react";
import { useNavigate } from "react-router";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../../shared/context/auth-context";

import Button from "../../../shared/UI/Button/Button";
import Loader from "../../../shared/UI/loader/Loader";

import classes from "./login.module.css";

const initialValues = {
  email: "",
  password: "",
};

const LoginSchema = Yup.object().shape({
  password: Yup.string().min(8, "Too Short!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Login = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const { sendRequest, isLoading } = useHttpClient();

  const errorStyles = {
    color: "red",
    fontSize: "12px",
    textAlign: "centre",
  };
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className={classes.container}>
          <div className={classes.image} />

          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
              console.log(values);
              try {
                const responseData = await sendRequest(
                  "http://localhost:5000/api/user/login",
                  "POST",
                  JSON.stringify(values),
                  { "Content-Type": "application/json" }
                );
                const { userId, token, username } = await responseData;
                authCtx.login(userId, token, username);
                console.log(responseData);
                navigate("/:uId/dashboard");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {(isSubmitting) => (
              <div className={classes["login-container"]}>
                <div className={classes.loginTxt}>Login</div>
                <Form>
                  <Field type="text" name="email" placeholder="Email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    style={errorStyles}
                  />
                  <Field type="password" name="password" placeholder="Password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    style={errorStyles}
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    Login
                  </Button>
                </Form>
                <p onClick={() => navigate("/signup")}>or sign up</p>
              </div>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default Login;
