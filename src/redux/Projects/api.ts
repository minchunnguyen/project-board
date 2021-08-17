import api from '../api.config';
import Project from '../../interfaces/Project';

const getProjectsData = async () => {
  try {
    const token = sessionStorage.getItem('access_token') || '';
    const res = await api.get(
      `https://backendtest.bluecoindolphin.club/projects/getAllProjects`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const getProjectDetail = async (projectID : string) => {
  try {
    const token = sessionStorage.getItem('access_token') || '';
    const res = await api.get(
      `https://backendtest.bluecoindolphin.club/projects/getProjectById/${projectID}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

const addProject = async (project: Project) => {
  try {
    const token = sessionStorage.getItem('access_token') || '';
    await api.post('https://backendtest.bluecoindolphin.club/projects', project , { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    console.error(error);
  }
};


const deleteProject = async (projectId : number) => {
  try {
    const token = sessionStorage.getItem('access_token') || '';
    await api.delete(`https://backendtest.bluecoindolphin.club/projects/${projectId}`, { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    console.error(error);
  }
}

const updateProject = async (projectId: string, project: any) => {
  try {
    const token = sessionStorage.getItem('access_token') || '';
    await api.put(
      `https://backendtest.bluecoindolphin.club/projects/${projectId}`,
      project,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error(error);
  }
};

const assignProject = async (projectId: string, managerId: string) => {
  try {
    const token = sessionStorage.getItem('access_token') || '';
    await api.post(
      `https://backendtest.bluecoindolphin.club/projects/${projectId}/assign/${managerId}`, {} ,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error(error);
  }
};

const getManagerList = async () => {
  try {
    const token = sessionStorage.getItem('access_token') || '';
    const res = await api.get(`https://backendtest.bluecoindolphin.club/users/getUserByRole/manager`, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export default {
  getProjectsData,
  getProjectDetail,
  addProject,
  deleteProject,
  updateProject,
  getManagerList,
  assignProject
};
