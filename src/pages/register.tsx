import React from "react";
import RegisterContainer from "../components/containers/RegisterContainer";
import { withAuthToken } from "../utils/auth";
import Head from "next/head";

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>Register</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <RegisterContainer />
      </div>
    </>
  );
};

export default withAuthToken(RegisterPage);
