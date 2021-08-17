import React from "react";
import Project from "../../interfaces/Project";
import { FormattedMessage } from "react-intl";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button, makeStyles, Theme, createStyles} from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import NativeSelect from "@material-ui/core/NativeSelect";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import clsx from "clsx";
import { updateProject, assignProjectManager } from "../../redux/Projects/actions";
import FormLabel from "@material-ui/core/FormLabel";
import { FormControl } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative'
    },
    margin: {
      marginRight: theme.spacing(0.5),
      margin: theme.spacing(0.5),
    },
    select: {
      width: "50%",
      margin: 2,
    },
    startDateEndDate: {
      width: '50%'
    },
    label: {
      width: "101%",
    },
    button: {
      position: 'absolute',
      bottom: -40
    }, 
    buttonBack: {
      position: 'absolute',
      bottom: -40, 
      marginLeft: 145
    }, 
  })
);

type Props = {
  project: Project;
};

const ProjectDetail = ({ project }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentAccountRole } = useSelector((state: any) => ({
    currentAccountRole: state.authentication.currentAccountRole
  }));

  
  // const [projToUpdate, setProjToUpdate] = React.useState(project);
  const [projectName, setProjectName] = React.useState(project.projectName);
  const [managerId, setProjManager] = React.useState(project.user?.id || 0);
  const [startDate, setProjStartDate] = React.useState(project.endDate);
  const [endDate, setProjEndDate] = React.useState(project.startDate);
  const [description, setProjDescription] = React.useState(project.description);
  const [status, setProjStatus] = React.useState(project.status);
  let managerList = project.user || null;
  if(currentAccountRole === "admin"){
    managerList = useSelector((state: any) => ({
      managerList: state.projects.managerList
    }));
  }
 
  const handleChangeStartDate = (date: any) => {
    setProjStartDate(date);
  };

  const handleChangeEnddate = (date: any) => {
    setProjEndDate(date);
  };

  const buildProjectToUpdate = () => {
    const projectToUpdate = {
      id: Number(project.id),
      projectName: projectName,
      // user: project.user,
      description: description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: status,
      isDeleted: false,
    }
    return projectToUpdate;
  };

  const handleUpdateProject = () => {
    const projectToUpdate = buildProjectToUpdate();
    dispatch(assignProjectManager(String(project.id), managerId));
    dispatch(updateProject(projectToUpdate.id, projectToUpdate));
    // api.assignProject(String(project.id), managerId);
    
  };

  return(
    <div>
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {project.projectName}
      </Typography>
      <Grid container spacing={1} className={clsx(classes.root)}>
        <Grid item xs={12} sm={6}>
          <TextField
            className={clsx(classes.label)}
            value={projectName}
            id="projectName"
            name="projectName"
            label="Project Name"
            fullWidth
            InputProps={{
              readOnly: currentAccountRole === "admin" ? false : true,
            }}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </Grid>
        <FormControl className={clsx(classes.margin, classes.label)}>
        <FormLabel
            component="legend"
            >
            Project Manager
        </FormLabel>
        <NativeSelect
          className={clsx(classes.margin, classes.select)}
          // value={project.user.email}
          onChange={(e) => setProjManager(e.target.value)}
          inputProps={{
            name: "status",
            id: "age-native-label-placeholder",
          }}
          >
          {project.user !== null ? <option key={project.user.id} value={project.user.id}>{project.user.email}</option> : <option key={0} value={0}>Non Manager</option>}
          {currentAccountRole === "admin" ? managerList.managerList.map((option: any) => (
            <option key={option.id} value={option.id}>
              {option.email}
            </option>
          )) : undefined}
        </NativeSelect>
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
                className={clsx(classes.startDateEndDate, classes.margin)}
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                margin="normal"
                id="date-picker-inline-proDetail-start"
                label={
                  <FormattedMessage
                    id="toolbar.startdate"
                    defaultMessage="Start date"
                  />
                }
                value={startDate || null}
                onChange={handleChangeStartDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                InputProps={{
                  readOnly: currentAccountRole === "admin" ? false : true,
                }}
              />
        <KeyboardDatePicker
        className={clsx(classes.startDateEndDate, classes.margin)}
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                margin="normal"
                id="date-picker-inline-proDetail-end"
                label={
                  <FormattedMessage
                    id="toolbar.enddate"
                    defaultMessage="End Date"
                  />
                }
                value={endDate || null}
                onChange={handleChangeEnddate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                InputProps={{
                  readOnly: currentAccountRole === "admin" ? false : true,
                }}
              />
        </MuiPickersUtilsProvider>
        <Grid item xs={12} sm={6}>
          <TextField
            className={clsx(classes.label)}
            id="description"
            name="description"
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setProjDescription(e.target.value)}
          />
        </Grid>
        <FormControl className={clsx(classes.margin, classes.label)}>
          <FormLabel
            component="legend"
            >
            Status
          </FormLabel>
          <NativeSelect
            className={clsx(classes.margin, classes.select)}
            value={status}
            onChange={(e) => setProjStatus(e.target.value)}
            inputProps={{
              name: "status",
              id: "age-native-label-placeholder",
            }}
            >
              {currentAccountRole === "admin" ? (<option value={"active"}>ACTIVE</option>) : undefined}
              {currentAccountRole === "admin" ? (<option value={"de-active"}>INACTIVE</option>) : undefined}
              {currentAccountRole === "admin" ? (<option value={"closed"}>CLOSE</option>) : undefined}
              <option value={"done"}>DONE</option>
          </NativeSelect>  
        </FormControl>
        
        <Button color="primary"
          className={clsx(classes.button)}
          onClick={handleUpdateProject}
          >
          <FormattedMessage
            id="project.btn.modify"
            defaultMessage="Modify"
          />
        </Button>
        <Button
            className={clsx(classes.buttonBack)}
            color="secondary"
            href={`/projects`}
            onClick={(e) => e.stopPropagation()}
          >
            <FormattedMessage
              id="project.button.back"
              defaultMessage="Back To Project List"
            />
          </Button>
      </Grid>
    </React.Fragment>
  </div>
);
}

export default ProjectDetail;
