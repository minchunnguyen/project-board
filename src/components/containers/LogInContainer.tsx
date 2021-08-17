import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Login from "../Authentication/Login";
import { logIn } from "../../redux/Authentication/actions";

const LoginContainer = () => {
  const dispatch = useDispatch();

  const {
    message,
    error
  } = useSelector((state: any) => ({
    message: state.authentication.message,
    error: state.authentication.error
    
  }));

  const handleLogIn = (data: any) => dispatch(logIn(data));

  return (
    <Login
      logIn={handleLogIn}
      message={message}
      error={error}
    />
  );
};

export default LoginContainer;
