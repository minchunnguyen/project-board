import React, { useEffect } from 'react';
import { getProjects } from '../../redux/Projects/actions';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/shared/Layout';
import ProjectList from '../../components/Projects/ProjectList';
import Toolbar from '../../components/shared/Toolbar';
import { withAuthSync } from '../../utils/auth';
import Box from "@material-ui/core/Box";

const ProjectsIndex = () => {
  const dispatch = useDispatch();
  const { projectData, selectedIds } = useSelector((state: any) => ({
    projectData: state.projects.projectData,
    selectedIds: state.projects.item2Delete
  }));

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    <Layout title="Project List">
        <Box>
          <h1>Project List</h1>
        </Box>
      <Toolbar />
      <ProjectList projects={projectData} selectedIds = {selectedIds} />
    </Layout>
  );
};

export default withAuthSync(ProjectsIndex);
