import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FlightIcon from "@mui/icons-material/Flight";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/features/userSlice";
import { toast } from "react-toastify";

const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nodeApiUrl = import.meta.env.VITE_NODE_API_URL;

  const handleLogin = ({ username, password }) => {
    console.log(username, password);
    axios
      .post(`${nodeApiUrl}/user/login`, { username, password })
      .then((response) => {
        if (response.data.status == true) {
          localStorage.setItem("planescapetoken", response.data.access_token);
          dispatch(userLogin(response.data.user));
          toast.success("Login successful");
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error("Login failed. Please check your credentials.");
        console.error(error);
      });
  };

  if (isLoggedIn) {
    navigate("/");
  }
  return (
    <div className="h-[100vh] flex justify-center items-center bg-themePurple">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => handleLogin(values)}
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
            <div className="flex flex-col max-w-96 w-96 gap-2 bg-themeLightGrey p-10 rounded-xl">
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
              <h1 className="font-bold text-2xl text-themePurple text-center">
                LOGIN
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
              <Button
                variant="contained"
                onClick={handleSubmit}
                className="bg-themePurple text-white hover:bg-themePurple/70"
              >
                Login
              </Button>
              <div className="flex flex-col">
                <span className="text-right flex gap-2 justify-end items-end">
                  <small>You don&apos;t have an account?</small>
                  <small>
                    <Link
                      className="text-right hover:underline text-themePurple  "
                      to={"/register"}
                    >
                      Register
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

export default LoginPage;
