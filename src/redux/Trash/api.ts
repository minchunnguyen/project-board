import api from '../api.config';

const apiEndpoint =  'https://backendtest.bluecoindolphin.club/';

const getTrashUser = async () => {
  try {
    const token = sessionStorage.getItem('access_token') || '';
    const res = await api.get(
      //`${apiEndpoint}users/search?deleted=true`,
      `${apiEndpoint}users/search`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const hardDeleteUser = async (userId: string) => {
  try {
    const token = sessionStorage.getItem('access_token') || '';
    await api.delete(
      // `https://5e5fcfafcbbe0600146cb3c8.mockapi.io/api/demo/users/${userId}`,
      `${apiEndpoint}users/${userId}?hard=true`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error(error);
  }
};

const restoreUser = async (userId: string) => {
  try {
    const token = sessionStorage.getItem('access_token') || '';
    await api.delete(
      // `https://5e5fcfafcbbe0600146cb3c8.mockapi.io/api/demo/users/${userId}`,
      `${apiEndpoint}users/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error(error);
  }
};

const hardDeleteProject = async (projectId : string) => {
  try {
    const token = sessionStorage.getItem('access_token') || '';
    await api.delete(`https://backendtest.bluecoindolphin.club/projects/${projectId}?hard=true`, { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    console.error(error);
  }
}

const deleteTask = async (taskId: string) => {
  try {
    const token = sessionStorage.getItem('access_token') || '';
    const res = await api.delete(
      `https://backendtest.bluecoindolphin.club/tasks/${taskId}?hard=true`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
  console.log('Hard delete task with id ' + taskId);
};

export default {
  hardDeleteProject,
  getTrashUser,
  hardDeleteUser,
  restoreUser,
  deleteTask,
};
