import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import Layout from "../components/shared/Layout";
import { getProjects } from "../redux/Projects/actions";
import { withAuthSync } from "../utils/auth";
import {
  makeStyles,
  createStyles,
  Theme,
  FormControl,
  TextField,
} from "@material-ui/core";
import { Pie, Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import Project from "../interfaces/Project";
import { getTasksByProjectIdRequest } from "../redux/Tasks/actions";
import Task from "../interfaces/Task";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    linkstyle: {
      textDecoration: "none",
      color: "orange",
      margin: theme.spacing(2),
    },
  })
);

const data_test2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: 'My second dataset',
      backgroundColor: 'rgba(155,231,91,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [45, 79, 10, 41, 16, 85, 20]
    }
  ]
}

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // to get Projects
  const { projectData, tasksData } = useSelector((state: any) => ({
    projectData: state.projects.projectData,
    tasksData: state.tasks.tasksDashboardData
  }));
  console.log('tasksData: ', tasksData);

  const taskLabels = ["open", "in-progress", "finished", "re-opened", "closed"];

  const taskChartData = taskLabels.map((status) => {
    return tasksData ? (tasksData.filter((task: Task) => task.status == status)).length : 0
  })

  // state for Chart
  const state = {
    labels: taskLabels,
    datasets: [
      {
        label: "Task",
        backgroundColor: ["#128acf", "#ffa500", "#007300", "#ff4040", "#730073"],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
        ],
        data: taskChartData,
      },
    ],
  };
  console.log('state: ', state);

  const [projectId, setProjectId] = useState("");

  //useEffect run first, useSelector run second to get projectData from redux 
  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const handleOnchange = (id: string) => {
    console.log(id);
    dispatch(getTasksByProjectIdRequest(id));
    setProjectId(id);
  }

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
          <a className={classes.linkstyle}>Go to the about page</a>
        </Link>
      </div>
      <div>
        <Link href="/users">
          <a className={classes.linkstyle}>Go to the users list page</a>
        </Link>
      </div>
      <div>
        <Link href="/projects">
          <a className={classes.linkstyle}>Go to the projects list page</a>
        </Link>
      </div>
      {/* Chart Part */}
      <div>
        <h3>Chart presents number of tasks with status of a Project</h3>
        <div>
          <FormControl>
            <TextField
              id="projectId"
              name="projectId"
              label="Project Name"
              type="number"
              fullWidth
              value={projectId}
              onChange={(e) => handleOnchange(e.target.value)}
              variant="outlined"
              select
              InputLabelProps={{
                shrink: true,
              }}
              SelectProps={{
                native: true,
              }}
            >
              <option aria-label="None" value="" disabled>Select A Project</option>
              {projectData.map((option: Project) => (
                <option key={option.id} value={option.id} >
                  {option.projectName}
                </option>
              ))}
            </TextField>
          </FormControl>
        </div>
        <div>
          {projectId ?
            (tasksData.length? (<Pie
              data={state}
              options={{
                // title:{
                //   display:true,
                //   text:'Tasks Percentage Pie Chart',
                //   fontSize:40
                // },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />) : (<div
              style={{
                width: '100%',
                height: 300,
                border: '1px dashed grey',
                borderRadius: 8,
                margin: '20px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
              }}
            >
             This project has no tasks
             <br/>
             Please select other project!
            </div>)
            ) : (
              <div
                style={{
                  width: '100%',
                  height: 300,
                  border: '1px dashed grey',
                  borderRadius: 8,
                  margin: '20px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                }}
              >
                Please select a project
              </div>
            )
          }
          <h3>Chart presents proportion of tasks to members for each Project</h3>
          <Bar
            data={data_test2}
            options={{
              responsive: true,
              legend: {
                display: false
              },
              type: "bar",
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default withAuthSync(Dashboard);
