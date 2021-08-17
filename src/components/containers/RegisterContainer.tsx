import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Register from "../Authentication/Register";
import { register } from "../../redux/Authentication/actions";

const RegisterContainer = () => {
  const dispatch = useDispatch();

  const { error } = useSelector((state: any) => ({
    error: state.authentication.error,
  }));

  const handleRegister = (data: any) => dispatch(register(data));

  return <Register register={handleRegister} error={error} />;
};

export default RegisterContainer;
