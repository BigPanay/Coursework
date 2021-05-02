import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { LOGIN_USER, REGISTER_USER } from '../../graphql/mutations';
import { Redirect, Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  InputAdornment,
  FormControl,
  Typography,
  Input,
  makeStyles
} from "@material-ui/core";
import { AccountCircleOutlined, MailOutline, VpnKey, VpnKeyOutlined } from '@material-ui/icons';
import Logo from '../../images/logo.png';

let gqlError = null;


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));


function Login() {
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConformPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [termsAndCondition, setTermsAndCondtion] = useState(false);
  
    const [toRegister, setToRegister] = useState(false);
    const [isError, setIsError] = useState("");
    const [showGqlError, setShowGqlError] = useState(true);
  
    const LoginInput = {
      password: password,
      email: email,
    };
  
    const RegisterUserInput = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }
  
    const userToLogin = (event) => {
      event.preventDefault();
      console.log(password);
      console.log(email);
      if (!toRegister) {
        setShowGqlError(true);
        setIsError("");
        userLogin();
      }
      else {
        if (password != "" && password == confirmPassword) {
          setShowGqlError(true);
          setIsError("");
          userToRegister();
        } else {
          setIsError("Passwords do not match");
        }
      }
    }
  
    const [userLogin, { error: loginError, data: loginData }] = useMutation(
      LOGIN_USER,
      {
        variables: { login: LoginInput }
      },
      { errorPolicy: "all" }
    );
  
    const [userToRegister, { error: registerError, data: registerData }] = useMutation(
      REGISTER_USER,
      {
        variables: { registerUser: RegisterUserInput }
      },
      { errorPolicy: "all" }
    );
  
    if (loginData) {
      gqlError = null;
      return <Redirect to="/" />;
    }
  
    if (registerData) {
      gqlError = null;
      return <Redirect to="/" />;
    }
  
    if (loginError) {
      gqlError = loginError.message;
    }
  
    if (registerError) {
      gqlError = registerError.message;
    }
  
    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const switchLoginPage = () => {
      gqlError = null;
      setShowGqlError(false);
      setIsError("");
      setToRegister(!toRegister);
    }
    //Logic
    return (
        <div className="login-main">
        <div className="container-wrap">
          <div className="header-container">
            <div className="row">
              <div className="main-bk">
                <div className="m-2 p-t-2" style={{ textAlign: "center" }}>
                  <img src={Logo} width="80px" alt="Placeholder image" />
                </div>
                <h2 className="login-header">Login</h2>
                <div className="login-field row">
                  <div style={{ maxWidth: 450, width: "100%", padding: 5 }}>
                    {gqlError ? (
                      <div style={{ color: "red", padding: 10, textAlign: "center" }}>
                        <p>{gqlError}</p>
                      </div>
                    ) : null}
                    {isError.length > 0 ? (
                      <div style={{ color: "red", padding: 10, textAlign: "center" }}>
                        <p>{isError}</p>
                      </div>
                    ) : null}
                    <form className="login-form" 
                    onSubmit={userToLogin}
                    >
                      <FormControl className="w-100" style={{ marginBottom: 20, color: "gray" }}>
                        <Typography className="form-label" variant="body2">Email</Typography>
                        <Input onChange={event => {
                          setEmail(event.target.value);
                        }}
                          startAdornment={
                            <InputAdornment position="start">
                              <MailOutline className="mr-1" />
                            </InputAdornment>
                          }
                          className="custom-input" name="email" id="email" placeholder="type your email" type="email" inputProps={{ 'aria-label': 'description' }} />
                      </FormControl>
                      {
                        !toRegister ? null : (
                          <FormControl className="w-100" style={{ marginBottom: 20, color: "gray" }}>
                            <Typography className="form-label" variant="body2">Username</Typography>
                            <Input onChange={event => {
                              setUsername(event.target.value);
                            }}
                              startAdornment={
                                <InputAdornment position="start">
                                  <AccountCircleOutlined className="mr-1" />
                                </InputAdornment>
                              }
                              className="custom-input" name="Username" id="Username" placeholder="Choose a username" type="text" inputProps={{ 'aria-label': 'description' }} />
                          </FormControl>
                        )
                      }
                      <FormControl className="w-100" style={{ marginBottom: 20, color: "gray" }}>
                        <Typography className="form-label" variant="body2">Password</Typography>
                        <Input onChange={event => {
                          setPassword(event.target.value);
                        }}
                          startAdornment={
                            <InputAdornment position="start">
                              <VpnKeyOutlined className="mr-1" />
                            </InputAdornment>
                          }
                          className="custom-input" name="password" id="password" placeholder="type your password" type="password" inputProps={{ 'aria-label': 'description' }} />
                      </FormControl>
                      {
                        !toRegister ? null : (
                          <FormControl className="w-100" style={{ marginBottom: 20, color: "gray" }}>
                            <Typography className="form-label" variant="body2">Confirm Password</Typography>
                            <Input onChange={event => {
                              setConformPassword(event.target.value);
                            }}
                              startAdornment={
                                <InputAdornment position="start">
                                  <VpnKeyOutlined className="mr-1" />
                                </InputAdornment>
                              }
                              className="custom-input" name="confirmPassowrd" id="confirmPassword" placeholder="Confirm your password" type="password" inputProps={{ 'aria-label': 'description' }} />
                          </FormControl>
                        )
                      }
                      <div className="field">
                        <Button variant="contained" className="rounded-c-small w-100 custom-dp-button" type="submit">
                            {!toRegister ? "Login" : "Register Account"}
                            </Button>
                      </div>
                    </form>
                    <div style={{ textAlign: "center" }}>
                      <Button size="medium" className="rounded-c-small w-100" onClick={switchLoginPage}>{!toRegister ? "Register Account" : "Login"}</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
}

export default Login;