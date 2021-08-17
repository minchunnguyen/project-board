import React from "react";
import { withAuthSync } from '../utils/auth';
import { FormattedMessage } from "react-intl";
import Layout from "../components/shared/Layout";
import { useSelector } from "react-redux";
import UserProfie from "../components/Users/UserProfie";


const Profile = () => {

  const { profileId } = useSelector((state: any) => ({
    profileId: state.authentication.currentAccountId,
  }));

  const userId : string =  profileId + '';
  return (
  <Layout >
    <h1>
    <FormattedMessage id="user.detail.personalInfo" defaultMessage="Personal Info"/>
    </h1>
    <UserProfie accountId={userId} />
    </Layout>
  );
};

export default withAuthSync(Profile);
