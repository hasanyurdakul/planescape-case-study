import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import FlightIcon from "@mui/icons-material/Flight";
import axios from "axios";
import { toast } from "react-toastify";

const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const nodeApiUrl = import.meta.env.VITE_NODE_API_URL;

  const handleSubmit = ({ username, email, password }) => {
    let requestObject = { username, email, password };
    axios
      .post(`${nodeApiUrl}/user/register`, requestObject)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("User registered successfully");
          navigate("/login");
        }
      })
      .catch(() => {
        toast.error(
          "User registration failed, please try again with a different email or username"
        );
      });
  };

  return (
    <div className="h-[100vh] flex justify-center items-center bg-themePurple">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={loginValidationSchema}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          handleBlur,
          errors,
          touched,
        }) => (
          <div>
            <div className="flex flex-col max-w-96 w-96 gap-2 bg-slate-100 p-10 rounded-xl">
              <Link to="/">
                <div className="flex items-center justify-center">
                  <FlightIcon className="mr-1 rotate-90 bg-themePurple rounded-full text-themeLightGrey" />
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    className="font-semibold"
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      color: "inherit",
                      textDecoration: "none",
                      textTransform: "uppercase",
                    }}
                  >
                    Plane scape
                  </Typography>
                </div>
              </Link>
              <h1 className="font-bold text-2xl  text-themePurple text-center">
                REGISTER
              </h1>

              <TextField
                id="input-username"
                name="username"
                label="Username"
                variant="outlined"
                onChange={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                helperText={touched.username && errors.username}
                error={touched.username && Boolean(errors.username)}
              />
              <TextField
                id="input-email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                helperText={touched.email && errors.email}
                error={touched.email && Boolean(errors.email)}
              />
              <TextField
                id="input-password"
                type={isVisible ? "text" : "password"}
                name="password"
                label="Password"
                variant="outlined"
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                helperText={touched.password && errors.password}
                error={touched.password && Boolean(errors.password)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      className="cursor-pointer"
                      onClick={() => {
                        setIsVisible(!isVisible);
                      }}
                    >
                      {isVisible ? <VisibilityOff /> : <Visibility />}
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="input-confirm-password"
                type={isVisible ? "text" : "password"}
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                onChange={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      className="cursor-pointer"
                      onClick={() => {
                        setIsVisible(!isVisible);
                      }}
                    >
                      {isVisible ? <VisibilityOff /> : <Visibility />}
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                onClick={handleSubmit}
                className="bg-themePurple text-white hover:bg-themePurple/70"
              >
                Register
              </Button>
              <div className="flex flex-col">
                <span className="text-right flex gap-2 justify-end items-end">
                  <small>Already have an account?</small>

                  <small>
                    <Link
                      className="text-right hover:underline text-themePurple  "
                      to={"/login"}
                    >
                      Login
                    </Link>
                  </small>
                </span>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default RegisterPage;
