import React, { useEffect } from 'react';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl'
import Layout from '../components/shared/Layout';
import { withAuthSync } from '../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetailRequest } from '../redux/Users/actions';

const Index = () => {

  const dispatch = useDispatch();

  const { profileId } = useSelector((state: any) => ({
    profileId: state.authentication.currentAccountId,
  }));

  useEffect(() => {
    dispatch(getUserDetailRequest(profileId));
  }, [profileId]);


  return (
    <Layout title="Homepage">
      <h1>Dashboard</h1>

      <p>
        <FormattedMessage
          id="dashboard.greeting"
          defaultMessage="Hello, World!"
        />
      </p>

      <div>
        <Link href="/about">
          <a>Go to the about page</a>
        </Link>
      </div>
      <div>
        <Link href="/users">
          <a>Go to the users list page</a>
        </Link>
      </div>
      <div>
        <Link href="/projects">
          <a>Go to the projects list page</a>
        </Link>
      </div>
      <div>
        <Link href="/tasks">
          <a>Go to the tasks list page</a>
        </Link>
      </div>
      <div>
        <Link href="/profile">
          <a>Go to Profile</a>
        </Link>
      </div>
    </Layout>
  );
};

export default withAuthSync(Index);
