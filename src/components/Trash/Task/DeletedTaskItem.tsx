import React from 'react';
import { useDispatch } from 'react-redux';
import {
  TableRow,
  TableCell,
  Checkbox,
  makeStyles,
  Theme,
  createStyles,
  Button,
} from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/Restore';
import Task from '../../../interfaces/Task';
import { FormattedMessage } from 'react-intl';
import { restoreTaskRequest } from '../../../redux/Trash/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      marginRight: theme.spacing(1),
    },
    taskRow: {
      transition: 'display 0.5s ease',
    },
  }),
);

type Props = {
  task: Task;
  selectedItemIds: String[];
  handleToggleSelectTask: any;
};

const TaskItem = ({ task, selectedItemIds, handleToggleSelectTask }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedIds = new Set(selectedItemIds);
  return (
    <TableRow key={task.id}>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={selectedIds.has(task.id)}
          onChange={(e) => handleToggleSelectTask(e.target.checked, task.id)} />
      </TableCell>
      <TableCell>{task.id}</TableCell>
      <TableCell>{task.taskName}</TableCell>
      <TableCell>{task.user?.email}</TableCell>
      <TableCell>{task.status}</TableCell>
      <TableCell>{task.project.id}</TableCell>
      <TableCell>{task.isDeleted.toString()}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          size="small"
          color="primary"
          startIcon={<RestoreIcon />}
          className={classes.margin}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(restoreTaskRequest(task.id));
          }}
        >
          <FormattedMessage id="trash.btn.restore" defaultMessage="Restore" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TaskItem;
