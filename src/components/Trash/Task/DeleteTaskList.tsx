import React from "react";
import DeletedTaskItem from './DeletedTaskItem';
import Task from "../../../interfaces/Task";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
} from "@material-ui/core";
import { selectTask, deselectTask, resetSelectTask, selectAllTask } from '../../../redux/Trash/actions';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type Props = {
  tasks: Task[];
  selectedIds: String[];
};

const DeletedTaskList = (props: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const totalTaskCount = props.tasks.length;

  const handleToggleSelectTask = (checked: boolean, taskId: string) => {
    if (checked) {
      dispatch(selectTask(taskId));
    } else {
      dispatch(deselectTask(taskId));
    }
  }

  const toggleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(selectAllTask(props.tasks));
      return;
    }
    dispatch(resetSelectTask());
  };

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color='primary'
                indeterminate={
                  props.selectedIds.length > 0 &&
                  props.selectedIds.length < totalTaskCount
                }
                checked={
                  totalTaskCount > 0 &&
                  props.selectedIds.length === totalTaskCount
                }
                onChange={(e) => toggleCheckAll(e)}
                inputProps={{ 'aria-label': 'select all' }}
              />
            </TableCell>
            <TableCell>
              <FormattedMessage id='task.table.id' defaultMessage='ID' />
            </TableCell>
            <TableCell>
              <FormattedMessage
                id="task.table.name"
                defaultMessage="Name"
              />
            </TableCell>
            <TableCell>
              <FormattedMessage
                id='task.table.userid'
                defaultMessage='UserID'
              />
            </TableCell>
            <TableCell>
              <FormattedMessage
                id='task.table.status'
                defaultMessage='Status'
              />
            </TableCell>
            <TableCell>
              <FormattedMessage
                id='task.table.project'
                defaultMessage='Project'
              />
            </TableCell>
            <TableCell>
              Is Deleted
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tasks.map((task) => (
            <DeletedTaskItem
              key={task.id}
              task={task}
              selectedItemIds={props.selectedIds}
              handleToggleSelectTask={handleToggleSelectTask}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeletedTaskList;
