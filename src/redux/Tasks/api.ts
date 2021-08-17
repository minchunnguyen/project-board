import JwtDecode from "jwt-decode";
import Task from "../../interfaces/Task";
import api from "../api.config";

const getTasksData = async () => {
  try {
    const token = sessionStorage.getItem("access_token") || "";

    const decoded: any = JwtDecode(token);
    const currentAccountId = decoded.id;
    const currentAccountRole = decoded.role;

    const url = "https://backendtest.bluecoindolphin.club/tasks";

    let temp = "";

    if (currentAccountRole === "admin") {
      temp = url;

      const res = await api.get(`${temp}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } else if (currentAccountRole === "member") {
      temp = url + "/search?member=" + currentAccountId;

      const res = await api.get(`${temp}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } else if (currentAccountRole === "manager") {
      try {
        const res = await api.get(
          `https://backendtest.bluecoindolphin.club/projects/getProjectByManager/${currentAccountId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        let i = 0;
        let dataList = [];

        for (i; i < res.data.length; i++) {
          let j = 0;
          const projectID = res.data[i].id;
          temp = url + "/search?projectId=" + projectID;
          const resTask = await api.get(`${temp}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          for (j; j < resTask.data.length; j++) {
            dataList.push(resTask.data[j]);
          }
        }
        return dataList;
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const getTaskDetail = async (taskId: string) => {
  try {
    const token = sessionStorage.getItem("access_token") || "";
    const res = await api.get(
      `https://backendtest.bluecoindolphin.club/tasks/getTaskById/${taskId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const updateTask = async (taskId: string, task: Task) => {
  try {
    const token = sessionStorage.getItem("access_token") || "";
    await api.put(
      `https://backendtest.bluecoindolphin.club/tasks/${taskId}`,
      task,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error(error);
  }
};

const assignTask = async (taskId: string, memberId: string) => {
  try {
    console.log("api:" + memberId);
    const token = sessionStorage.getItem("access_token") || "";
    await api.post(
      `https://backendtest.bluecoindolphin.club/tasks/${taskId}/assign/${memberId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error(error);
  }
};

const deleteTask = async (taskId: string) => {
  try {
    const token = sessionStorage.getItem("access_token") || "";
    const res = await api.delete(
      `https://backendtest.bluecoindolphin.club/tasks/${taskId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const addTask = async (task: Task) => {
  try {
    const token = sessionStorage.getItem("access_token") || "";
    await api.post(`https://backendtest.bluecoindolphin.club/tasks`, task, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(error);
  }
};

const getProjectMembersData = async () => {
  try {
    const token = sessionStorage.getItem("access_token") || "";

    const decoded: any = JwtDecode(token);
    const currentAccountRole = decoded.role;

    if (currentAccountRole === "admin" || currentAccountRole === "manager") {
      const res = await api.get(
        `https://backendtest.bluecoindolphin.club/users/getUserByRole/member`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

// get task by Project ID
const getTasksByProjectId = async (projectId: string) => {
  try {
    // const token = Cookies.get("Token");
    const token = sessionStorage.getItem("access_token") || "";
    const res = await api.get(
      `https://backendtest.bluecoindolphin.club/tasks/search?projectId=${projectId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getTasksData,
  deleteTask,
  getTaskDetail,
  addTask,
  updateTask,
  assignTask,
  getProjectMembersData,
  getTasksByProjectId,
};
