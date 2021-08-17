import React from "react";
import {
  TableRow,
  TableCell,
  Checkbox,
} from '@material-ui/core';

import Button from "@material-ui/core/Button";
import RestoreIcon from '@material-ui/icons/Restore';
import Project from "../../../interfaces/Project";
import { FormattedMessage } from "react-intl";
import { useDispatch } from 'react-redux'
import { selectProject, deselectProject } from '../../../redux/Trash/actions';
import { restoreProjectRequest } from '../../../redux/Trash/actions';

type Props = {
  project: Project;
};

const ProjectItem = ({ project }: Props) => {
  const dispatch = useDispatch();
  // useEffect(() => {

  // })
  const toggleCheckbox = (e : any) => {
    if(e.target.checked){
      dispatch(selectProject(project.id.toString()));
    } else {
      dispatch(deselectProject(project.id.toString()));
    }
  };

  return (
    <TableRow key={project.id}>
      <TableCell padding="checkbox">
        <Checkbox color="primary" onChange = {e => toggleCheckbox(e)}/>
      </TableCell>
      <TableCell>{project.id}</TableCell>
      <TableCell>{project.projectName}</TableCell>
      <TableCell>{project.user?.email}</TableCell>
      <TableCell>{new Date(project.startDate).toISOString().slice(0,10)}</TableCell>
      <TableCell>{new Date(project.endDate).toISOString().slice(0,10)}</TableCell>
      <TableCell>{project.status}</TableCell>
      <TableCell>{project.description}</TableCell>
      <TableCell>
      <Button
          variant="contained"
          size="small"
          color="primary"
          startIcon={<RestoreIcon />}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(restoreProjectRequest(project.id.toString(), project));
          }}
        >
          <FormattedMessage id="trash.btn.restore" defaultMessage="Restore" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ProjectItem;
