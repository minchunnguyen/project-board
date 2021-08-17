import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import Layout from "../../components/shared/Layout";
// import Project from '../../interfaces/Project';
import ProjectDetail from '../../components/Projects/ProjectDetail';
import { getSelectedProRequest, getManagerList } from "../../redux/Projects/actions";
import { FormattedMessage } from "react-intl";
import { withAuthSync } from "../../utils/auth";
import Divider from "@material-ui/core/Divider";

const ProjectDetailPage = () => {
  const router = useRouter();
  const { projectDetail } = useSelector((state: any) => ({
    projectDetail: state.projects.selectedProject,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSelectedProRequest(router.query.id as string));
    dispatch(getManagerList());
  }, []);

  return (
    <Layout title={`${projectDetail ? projectDetail.projectName : "Project Detail"}`}>
      {projectDetail && (
        <>
          <h1>
            <FormattedMessage
              id="project.detail.introduction"
              defaultMessage="Project Detail: "
            />
            {projectDetail.projectName}
          </h1>
          <Divider />
          <ProjectDetail project={projectDetail}/>
        </>
      )}
    </Layout>
  );
};

export default withAuthSync(ProjectDetailPage);
