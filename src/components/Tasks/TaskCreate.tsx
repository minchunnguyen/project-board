import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import Project from "../../interfaces/Project";
import TaskModify from "../../interfaces/TaskModify";
import { getProjects } from "../../redux/Projects/actions";
import { addTask, getTasksByProjectIdRequest, getAllTasks } from "../../redux/Tasks/actions";
import { useRouter } from "next/router";
// import _ from "lodash";

type Props = {
  handleClose: any;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    overflow: {
      overflow: "hidden",
    },
    alignItemsAndJustifyContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#88b8e7",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    formControl: {
      minWidth: 120,
      width: "100%",
    },
    error: {
      margin: theme.spacing(0.5),
      color: "red",
    },
  })
);

const TaskCreate = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const { projectData, taskError } = useSelector((state: any) => ({
    projectData: state.projects.projectData,
    taskError: state.tasks.error,
  }));

  const [projectId, setProjectId] = useState(projectData[0]?.id);
  const [taskName, setName] = useState("");
  const [description, setDescription] = useState("");
  const status = "open";
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCancle = () => {
    props.handleClose();
  };

  function validateDate(_startDate: Date, _endDate: Date) {
    return _startDate <= _endDate ? true : false;
  }

  const [_checkVadidateDate, setCheckValidateDate] = React.useState(true);

  const handleCreate = () => {
    const _startDate = new Date(startDate);
    const _endDate = new Date(endDate);
    const _validateDate = validateDate(_startDate, _endDate);

    if (_validateDate) {
      const task: TaskModify = {
        taskName: taskName,
        description: description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: status,
        isDeleted: "false",
        project: parseInt(projectId, 10),
      };
      setCheckValidateDate(true);
      dispatch(addTask(task));
      !taskError
        ? NotificationManager.success(
            "You have added a new task!",
            "Create Successful!!",
            2000
          )
        : NotificationManager.error(
            "You have failed to add a new task!",
            "Create Failed!!",
            2000
          );
      props.handleClose();
      setTimeout(() => {
        if(router.asPath !== "/tasks"){
          dispatch(getTasksByProjectIdRequest(router.query.projectId));
        } else {
          dispatch(getAllTasks());
        }
      }, 2000)
      
    } else {
      setCheckValidateDate(false);
    }
  };

  const classes = useStyles();

  return (
    <div>
      <DialogTitle
        className={classes.alignItemsAndJustifyContent}
        id="form-dialog-title"
      >
        CREATE A NEW TASK
      </DialogTitle>
      <DialogContent className={classes.overflow}>
        <FormControl>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  id="projectId"
                  name="projectId"
                  label="Project Id"
                  type="number"
                  fullWidth
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  variant="outlined"
                  required
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {projectData.map((option: Project) => (
                    <option key={option.id} value={option.id}>
                      {option.projectName}
                    </option>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="taskName"
                name="taskName"
                label="Task Name"
                fullWidth
                value={taskName}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                name="description"
                label="Task Description"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="startdate"
                label="Start Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                variant="outlined"
                required
              />
              {!_checkVadidateDate ? (
                <FormHelperText className={classes.error} id="invalidEmail">
                  Start Date must be earlier than End Date.
                </FormHelperText>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="enddate"
                label="End Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                variant="outlined"
                required
              />
              {!_checkVadidateDate ? (
                <FormHelperText className={classes.error} id="invalidEmail">
                  Start Date must be earlier than End Date.
                </FormHelperText>
              ) : null}
            </Grid>
          </Grid>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancle} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleCreate}
          color="primary"
          disabled={
            // !projectId ||
            !taskName || !description || !startDate || !endDate
          }
        >
          Create
        </Button>
      </DialogActions>
    </div>
  );
};

export default TaskCreate;
