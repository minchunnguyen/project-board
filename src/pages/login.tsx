import React from "react";
import LoginContainer from "../components/containers/LogInContainer";
import { withAuthToken } from "../utils/auth";
import Head from "next/head";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <LoginContainer />
      </div>
    </>
  );
};

export default withAuthToken(LoginPage);
