import React from "react";
import {
  TableRow,
  TableCell,
  Button,
  Checkbox,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import Task from "../../interfaces/Task";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import Router from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(0.5),
    },
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    textField: {
      width: "40ch",
    },
    select: {
      width: "35ch",
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
  })
);

type Props = {
  task: Task;
  selectedItemIds: String[];
  handleToggleSelectTask: any;
};

function convertDate(date: any) {
  return moment(date).format("YYYY-MM-DD");
}

const TaskItem = ({ task, selectedItemIds, handleToggleSelectTask }: Props) => {
  const classes = useStyles();
  const selectedIds = new Set(selectedItemIds);
  const hanleViewUser = () => {
    Router.push(`/users/${task.user.id}`);
  };
  return (
    <TableRow key={task.id} hover>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={selectedIds.has(task.id)}
          onChange={(e) => handleToggleSelectTask(e.target.checked, task.id)}
        />
      </TableCell>
      <TableCell>{task.id}</TableCell>
      <TableCell>{task.taskName}</TableCell>
      <TableCell style={{ textTransform: "uppercase" }}>
        {" "}
        <Chip
          style={
            task.status === "open"
              ? { backgroundColor: "#128acf" }
              : task.status === "in-progress"
              ? { backgroundColor: "#ffa500" }
              : task.status === "finished"
              ? { backgroundColor: "#007300" }
              : task.status === "re-opened"
              ? { backgroundColor: "#ff4040" }
              : { backgroundColor: "#730073" }
          }
          label={task.status}
        />
      </TableCell>
      <TableCell>{task.project.projectName}</TableCell>
      {/* <TableCell>{task.isDeleted.toString()}</TableCell> */}
      <TableCell>{convertDate(task.startDate)}</TableCell>
      <TableCell>{convertDate(task.endDate)}</TableCell>
      {task.user ? (
        <TableCell>
          {" "}
          <Chip
            icon={<FaceIcon />}
            label={task.user.email}
            clickable
            color="primary"
            onClick={hanleViewUser}
          />
        </TableCell>
      ) : (
        <TableCell>No Assignee</TableCell>
      )}
      <TableCell>
        <Button
          variant="contained"
          size="small"
          color="primary"
          startIcon={<ListAltRoundedIcon />}
          className={classes.margin}
          href={`/tasks/${task.id}`}
          onClick={(e) => e.stopPropagation()}
        >
          <FormattedMessage id="task.button.view" defaultMessage="View" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TaskItem;
