import React from "react";
import {
  TableRow,
  TableCell,
  Checkbox,
} from '@material-ui/core';

import Button from "@material-ui/core/Button";
import Apps from "@material-ui/icons/Apps";
import Project from "../../interfaces/Project";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from 'react-redux'
import { addProject2Delete, deSelectProject } from '../../redux/Projects/actions';
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import  ProjectUserPop from "./ProjectUserPop";
// import { getTasksByProjectIdRequest } from "../../redux/Tasks/actions";

type Props = {
  project: Project;
};

const ProjectItem = ({ project }: Props) => {

  const dispatch = useDispatch();
  const { selectedIds } = useSelector((state: any) => ({
    selectedIds: state.projects.item2Delete

  }));

  const toggleCheckbox = (e : any) => {
    if(e.target.checked){
      dispatch(addProject2Delete(project.id));
    } else {
      dispatch(deSelectProject(project.id));
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableRow key={project.id}>
      <TableCell padding="checkbox">
        <Checkbox color="primary" checked={selectedIds.includes(parseInt(project.id.toString()))} onChange = {e => toggleCheckbox(e)}/>
      </TableCell>
      <TableCell>{project.id}</TableCell>
      <TableCell>{project.projectName}</TableCell>
      <TableCell>{project.user?.email}</TableCell>
      <TableCell>{new Date(project.startDate).toISOString().slice(0,10)}</TableCell>
      <TableCell>{new Date(project.endDate).toISOString().slice(0,10)}</TableCell>
      <TableCell>{project.status}</TableCell>
      <TableCell>{project.description}</TableCell>
      <TableCell>{project.numberOfTasks}</TableCell>
      <TableCell>
        {project.numberOfMembers}&nbsp;
        <u style = {{color: '#518bc3', cursor: 'pointer'}} onClick = {handleClickOpen}><b>(View Member)</b></u>
        <ProjectUserPop users = {project.projectMembers} open={open} onClose={handleClose} />
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Apps />}
          href={`tasks?projectId=${project.id}`}
        >
          <FormattedMessage id="project.btn.task" defaultMessage="Task" />
        </Button> 
        &nbsp;
        <Button
          variant="contained"
          color="primary"
          startIcon={<ListAltRoundedIcon />}
          href={`/projects/${project.id}`}
          onClick={(e) => e.stopPropagation()}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ProjectItem;
