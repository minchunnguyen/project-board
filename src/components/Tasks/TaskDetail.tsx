import {
  Button,
  createStyles,
  FormControl,
  makeStyles,
  Theme
} from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ListAltIcon from "@material-ui/icons/ListAlt";
import clsx from "clsx";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import Task from "../../interfaces/Task";
import TaskModify from "../../interfaces/TaskModify";
import User from "../../interfaces/User";
import {
  assignTask,
  getProjectMembersRequest,
  updateTask
} from "../../redux/Tasks/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 300,
      },
      display: "grid",
      gridGap: theme.spacing(3),
      gridTemplateAreas: `'overview personal project' 
                          'tasks tasks tasks'`,
      gridTemplateColumns: "2fr 1fr 1fr",
      position: "relative",

      [theme.breakpoints.down("md")]: {
        gridTemplateAreas: `'overview' 'personal' 'project' 'tasks'`,
        gridTemplateColumns: "1fr",
      },
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    alignItemsAndJustifyContent: {
      width: "100%",
      height: 720,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    margin: {
      marginRight: theme.spacing(1),
      margin: theme.spacing(1),
    },
    textField: {
      width: "40ch",
    },
    select: {
      width: "33ch",
    },
    label: {
      fontSize: 13,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    header: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    personalInfo: {
      gridArea: "personal",
    },
    projectInfo: {
      gridArea: "project",
    },
    content: {
      display: "flex",
      justifyContent: "space-between",
    },
    error: {
      margin: theme.spacing(0.5),
      color: "red",
    },
  })
);

type Props = {
  task: Task;
  currentAccountRole: string;
  currentAccountUserName: string;
};

function convertDate(date: any) {
  return moment(date).format("YYYY-MM-DD");
}

const TaskDetail = ({
  task,
  currentAccountRole,
  currentAccountUserName,
}: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectMembersRequest(task.project.id));
  }, []);

  const { projectMembersData, taskError } = useSelector((state: any) => ({
    projectMembersData: state.tasks.projectMembersData,
    taskError: state.tasks.error,
  }));
  const id = task.id;
  const [projectId, setProjectId] = useState(task.project.id);
  const [projectName, setProjectName] = useState(task.project.projectName);
  const [title, setTitle] = useState(task.taskName);
  const [description, setDescription] = useState(
    task.description ? task.description : ""
  );
  const [status, setStatus] = useState(task.status);
  const [startdate, setStartDate] = useState(convertDate(task.startDate));
  const [enddate, setEndDate] = useState(convertDate(task.endDate));
  const [assignTo, setAssignTo] = useState(
    task.user ? task.user.id?.toString() : projectMembersData[0]?.id
  );

  const [editMode, setEditMode] = React.useState(false);
  const [assignMode, setAssignMode] = React.useState(false);
  // const unableChangeStatusFromInProgressToFinish =
  //   task.status === "in-progress" && currentAccountRole !== "manager";
  const memberUpdateInProgressToFinish = task.status === "open";
  const updateByMember = currentAccountRole !== "member";

  const getUser = projectMembersData?.filter((user: User) =>
    user ? user.id === assignTo : null
  );

  const user = updateByMember
    ? getUser
      ? getUser[0]?.email
      : currentAccountUserName
    : null;

  function handleEditMode() {
    setEditMode(true);
  }

  function handleAssignMode() {
    setAssignMode(true);
  }

  function handleCancel() {
    setEditMode(false);
    setTitle(task.taskName);
    setDescription(task.description ? task.description : "");
    setStatus(task.status);
    setStartDate(convertDate(task.startDate));
    setEndDate(convertDate(task.endDate));
  }

  function handleAssignCancel() {
    setAssignMode(false);
    setAssignTo(task.user ? task.user.id?.toString() : "No Assignee");
  }

  function validateDate(_startDate: Date, _endDate: Date) {
    return _startDate <= _endDate ? true : false;
  }

  const [_checkVadidateDate, setCheckValidateDate] = React.useState(true);

  const handleEdit = () => {
    const _startDate = new Date(startdate);
    const _endDate = new Date(enddate);
    const _validateDate = validateDate(_startDate, _endDate);

    if (_validateDate) {
      const task: TaskModify = {
        taskName: title,
        description: description,
        startDate: new Date(startdate),
        endDate: new Date(enddate),
        status: status,
        isDeleted: "false",
        project: projectId,
      };

      setCheckValidateDate(true);

      dispatch(updateTask(id, task));

      setEditMode(false);

      !taskError
        ? NotificationManager.success(
            "You have modified this task!",
            "Modify Successful!",
            2000
          )
        : NotificationManager.error(
            "You have failed to modify a new task!",
            "Modify Failed!",
            2000
          );
    } else {
      setCheckValidateDate(false);
    }
  };

  const handleAssign = () => {
    dispatch(assignTask(id, assignTo));
    setAssignMode(false);

    !taskError
      ? NotificationManager.success(
          "You have assign this task!",
          "Assign Successful!",
          2000
        )
      : NotificationManager.error(
          "You have failed to assign a new task!",
          "Assign Failed!",
          2000
        );
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <div style={{ display: "inline-flex" }}>
          <div>
            <Fragment>
              <FormControl>
                <Grid container spacing={1}>
                  <h2>
                    {" "}
                    <ListAltIcon color="primary" fontSize="small" /> TASK
                    INFORMATION:
                  </h2>
                  <FormControl>
                    {editMode && updateByMember ? (
                      <FormControl>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            className={clsx(classes.margin, classes.textField)}
                            id="title"
                            label="Task Name"
                            type="text"
                            placeholder="Enter title"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </Grid>
                      </FormControl>
                    ) : (
                      <FormControl>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            className={clsx(classes.margin, classes.textField)}
                            id="title"
                            label="Task Name"
                            type="text"
                            placeholder="Enter title"
                            required
                            disabled
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </Grid>
                      </FormControl>
                    )}
                  </FormControl>
                  {editMode ? (
                    <FormControl>
                      <TextField
                        className={clsx(classes.margin, classes.textField)}
                        id="description"
                        label="Task Description"
                        type="text"
                        placeholder="Enter description"
                        multiline
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </FormControl>
                  ) : (
                    <FormControl>
                      <TextField
                        className={clsx(classes.margin, classes.textField)}
                        id="description"
                        label="Task Description"
                        type="text"
                        placeholder="Enter description"
                        multiline
                        disabled
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </FormControl>
                  )}
                  <FormControl>
                    <TextField
                      className={clsx(classes.margin, classes.textField)}
                      id="projectId"
                      label="Project ID"
                      type="text"
                      placeholder="Enter projectId"
                      disabled
                      value={projectId}
                      onChange={(e) =>
                        setProjectId(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      className={clsx(classes.margin, classes.textField)}
                      id="projectName"
                      label="Project Name"
                      type="text"
                      placeholder="Enter projectName"
                      disabled
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </FormControl>
                  {editMode ? (
                    <FormControl>
                      <FormControl>
                        <FormLabel
                          className={clsx(classes.margin, classes.label)}
                          component="legend"
                          required
                        >
                          Task Status
                        </FormLabel>
                        <NativeSelect
                          className={clsx(classes.margin, classes.select)}
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          inputProps={{
                            name: "status",
                            id: "age-native-label-placeholder",
                          }}
                        >
                          {memberUpdateInProgressToFinish && (
                            <option value={"open"}>OPEN</option>
                          )}
                          <option value={"in-progress"}>IN_PROGRESS</option>
                          <option value={"finished"}>FINISHED</option>
                          {updateByMember && (
                            <option value={"re-opened"}>RE_OPENED</option>
                          )}
                          {updateByMember && (
                            <option value={"closed"}>CLOSED</option>
                          )}
                        </NativeSelect>
                      </FormControl>
                    </FormControl>
                  ) : (
                    <FormControl>
                      <FormControl>
                        <FormLabel
                          className={clsx(classes.margin, classes.label)}
                          component="legend"
                          required
                          disabled
                        >
                          Task Status
                        </FormLabel>
                        <NativeSelect
                          className={clsx(classes.margin, classes.select)}
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          disabled
                          inputProps={{
                            name: "status",
                            id: "age-native-label-placeholder",
                          }}
                        >
                          <option value={"open"}>OPEN</option>
                          <option value={"in-progress"}>IN_PROGRESS</option>
                          <option value={"finished"}>FINISHED</option>
                          <option value={"re-opened"}>RE_OPENED</option>
                          <option value={"closed"}>CLOSED</option>
                        </NativeSelect>
                      </FormControl>
                    </FormControl>
                  )}
                  {editMode && updateByMember ? (
                    <FormControl>
                      <TextField
                        className={clsx(classes.margin, classes.textField)}
                        id="startdate"
                        label="Start Date"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder="Enter start date"
                        required
                        value={startdate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </FormControl>
                  ) : (
                    <FormControl>
                      <TextField
                        className={clsx(classes.margin, classes.textField)}
                        id="startdate"
                        label="Start Date"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder="Enter start date"
                        required
                        disabled
                        value={startdate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </FormControl>
                  )}
                  {editMode && updateByMember && !_checkVadidateDate ? (
                    <FormHelperText
                      className={clsx(classes.error)}
                      id="invalidEmail"
                    >
                      Start Date must be earlier than End Date.
                    </FormHelperText>
                  ) : null}
                  {editMode && updateByMember ? (
                    <FormControl>
                      <TextField
                        className={clsx(classes.margin, classes.textField)}
                        id="enddate"
                        label="End Date"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder="Enter end date"
                        required
                        value={enddate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </FormControl>
                  ) : (
                    <FormControl>
                      <TextField
                        className={clsx(classes.margin, classes.textField)}
                        id="enddate"
                        label="End Date"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder="Enter end date"
                        required
                        disabled
                        value={enddate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </FormControl>
                  )}
                  {editMode && updateByMember && !_checkVadidateDate ? (
                    <FormHelperText
                      className={clsx(classes.error)}
                      id="invalidEmail"
                    >
                      Start Date must be earlier than End Date.
                    </FormHelperText>
                  ) : null}
                </Grid>
              </FormControl>
            </Fragment>
          </div>
          <div>
            {updateByMember ? (
              <h2>
                <AssignmentIndIcon color="primary" fontSize="small" /> TASK
                ASSIGN:
              </h2>
            ) : null}

            {updateByMember ? (
              assignMode ? (
                <FormControl>
                  <TextField
                    className={clsx(classes.margin, classes.textField)}
                    id="assigneTo"
                    label="Assign To Person"
                    type="number"
                    fullWidth
                    value={assignTo}
                    onChange={(e) => setAssignTo(e.target.value)}
                    select
                    helperText="Please select person to assign this task."
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {projectMembersData?.map((option: User) => (
                      <option key={option.id} value={option.id}>
                        {option.email}
                      </option>
                    ))}
                  </TextField>
                </FormControl>
              ) : (
                <FormControl>
                  <TextField
                    className={clsx(classes.margin, classes.textField)}
                    id="assigneTo"
                    label="Assign To Person"
                    type="text"
                    placeholder="No Assignee"
                    disabled
                    value={user || ""}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              )
            ) : null}
            {/* {!updateByMember ? (
              <FormControl>
                <TextField
                  className={clsx(classes.margin, classes.textField)}
                  id="assignedPerson"
                  label="Assigned To Me"
                  type="text"
                  placeholder="No Assignee"
                  disabled
                  value={user || ""}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            ) : null} */}
            <div>
              {updateByMember ? (
                !assignMode ? (
                  <Button color="primary" onClick={handleAssignMode}>
                    <FormattedMessage
                      id="task.button.assign"
                      defaultMessage="Assign"
                    />
                  </Button>
                ) : null
              ) : null}

              {assignMode ? (
                <Button color="primary" autoFocus onClick={handleAssign}>
                  <FormattedMessage
                    id="task.button.save"
                    defaultMessage="Save"
                  />
                </Button>
              ) : null}
              {assignMode ? (
                <Button autoFocus onClick={handleAssignCancel}>
                  <FormattedMessage
                    id="task.button.cancel"
                    defaultMessage="Cancel"
                  />
                </Button>
              ) : null}
            </div>
          </div>
        </div>
        <div>
          {!editMode ? (
            <Button color="primary" onClick={handleEditMode}>
              <FormattedMessage
                id="task.button.modify"
                defaultMessage="Modify"
              />
            </Button>
          ) : null}

          {editMode ? (
            <Button
              color="primary"
              autoFocus
              onClick={handleEdit}
              disabled={title === ""}
            >
              <FormattedMessage id="task.button.save" defaultMessage="Save" />
            </Button>
          ) : null}
          {editMode ? (
            <Button autoFocus onClick={handleCancel}>
              <FormattedMessage
                id="task.button.cancel"
                defaultMessage="Cancel"
              />
            </Button>
          ) : null}
          <Button
            color="secondary"
            href={`/tasks`}
            onClick={(e) => e.stopPropagation()}
          >
            <FormattedMessage
              id="task.button.back"
              defaultMessage="Back To Tasks List"
            />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TaskDetail;
