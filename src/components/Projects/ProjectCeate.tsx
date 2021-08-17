import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Project from "../../interfaces/Project";
import { useDispatch } from "react-redux";
import { addProject } from "../../redux/Projects/actions";
import { makeStyles, createStyles } from "@material-ui/core";

type Props = {
  handleClose: any;
};

const useStyles = makeStyles(()=>
    createStyles({
      overflow: {
        overflow: 'hidden',
      },
    })
  );

const ProjectCreate = (props: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch = useDispatch();

  const handleCancle = () => {
    props.handleClose();
  };

  const handleOK = () => {
    const project: Project = {
      projectName: name,
      description: description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: "active",
      isDeleted: false,
      id: 10,
      user: null,
      numberOfTasks: 0,
      numberOfMembers: 0,
      projectMembers: null
    };

    dispatch(addProject(project));

    props.handleClose();
  };

  const classes = useStyles();

  return (
    <div>
      <DialogTitle id="form-dialog-title">Create new project</DialogTitle>
      <DialogContent className={classes.overflow}>
        <FormControl>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                label="Project Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                name="description"
                label="Description"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="startdate"
                label="Start Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="enddate"
                label="End Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancle} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOK} color="primary">
          OK
        </Button>
      </DialogActions>
    </div>
  );
};

export default ProjectCreate;
