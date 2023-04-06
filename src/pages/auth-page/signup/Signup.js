import { useContext } from "react";
import { useNavigate } from "react-router";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import {AuthContext} from "../../../shared/context/auth-context";

import Button from "../../../shared/UI/Button/Button";

import classes from "../login/login.module.css";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .min(8, "Too Short!")
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const {sendRequest} = useHttpClient();


  const errorStyles = {
    color: "red",
    fontSize: "12px",
    textAlign: "centre",
  };
  return (
    <div className={classes.container}>
      <div className={classes.image}/>

      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          try{
            const responseData = await sendRequest("http://localhost:5000/api/user/signup","POST", JSON.stringify(values), {'Content-Type': 'application/json'});
            const {userId, token, username} = await responseData;
            authCtx.login(userId, token, username);
            navigate("/:uId/dashboard");
          }catch(error){
            console.log(error);
          }
        }}
      >
        {(isSubmitting) => (
          <div className={classes["login-container"]}>
            <div className={classes.loginTxt}>Sign Up</div>
            <Form>
              <Field type="text" name="username" placeholder="Username" />
              <ErrorMessage
                name="username"
                component="div"
                style={errorStyles}
              />
              <Field type="text" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" style={errorStyles} />
              <Field type="text" name="password" placeholder="Password" />
              <ErrorMessage
                name="password"
                component="div"
                style={errorStyles}
              />
              <Field
                type="text"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                style={errorStyles}
              />
              <Button type="submit">
                Sign Up
              </Button>
            </Form>
            <p onClick={() => navigate("/login")} className={classes.btnTxt}>or login</p>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
