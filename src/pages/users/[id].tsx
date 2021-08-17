import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Layout from "../../components/shared/Layout";
import UserDetail from "../../components/Users/UserDetail";
import { getUserDetailRequest } from "../../redux/Users/actions";
import { FormattedMessage } from "react-intl";
import { withAuthSync } from '../../utils/auth';

const UserDetailPage = () => {
  const router = useRouter();
  const { userDetail } = useSelector((state: any) => ({
    userDetail: state.users.userDetail,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetailRequest(router.query.id as string));
  }, []);

  return (
    <Layout title={`${userDetail ? userDetail.firstName : "User Detail"}`}>
      {userDetail && (
        <>
          <h1>
            <FormattedMessage
              id="user.detail.introduction"
              defaultMessage="Detail of"
            />
            {userDetail.firstName} {userDetail.lastName}
          </h1>
          <UserDetail user={userDetail} />
        </>
      )}
    </Layout>
  );
};

// interface Props {
//   dispatch: any;
//   ctx: any;
//   getInitialProps: any;
//   query: any;
// }

// UserDetailPage.getInitialProps = async (props: Props) => {
//   const { store, isServer, query } = props.ctx;
//   store.dispatch(getUserDetailRequest(query.id));
//   return { isServer };
// };

export default withAuthSync(UserDetailPage);
