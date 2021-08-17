import Divider from "@material-ui/core/Divider";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/shared/Layout";
import TaskDetail from "../../components/Tasks/TaskDetail";
import { getTaskDetailRequest } from "../../redux/Tasks/actions";
import { withAuthSync } from "../../utils/auth";


const TaskDetailPage = () => {
  const router = useRouter();
  const {
    taskDetail,
    currentAccountRole,
    currentAccountUserName,
  } = useSelector((state: any) => ({
    taskDetail: state.tasks.taskDetail,
    currentAccountRole: state.authentication.currentAccountRole,
    currentAccountUserName: state.authentication.currentAccountUserName,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTaskDetailRequest(router.query.id as string));
  }, []);

  return (
    <Layout title={`${taskDetail ? taskDetail[0]?.taskName : "Task Detail"}`}>
      {taskDetail && (
        <>
          <h1>
            <FormattedMessage
              id="task.detail.introduction"
              defaultMessage="Task Detail: "
            />
            {taskDetail[0].taskName}
          </h1>
          <Divider />
          <TaskDetail
            task={taskDetail[0]}
            currentAccountRole={currentAccountRole}
            currentAccountUserName={currentAccountUserName}
          />
        </>
      )}
    </Layout>
  );
};

export default withAuthSync(TaskDetailPage);
