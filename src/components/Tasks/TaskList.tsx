import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { createStyles, fade, makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { default as React } from "react";
import { FormattedMessage } from "react-intl";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import Task from "../../interfaces/Task";
import {
  deselectTask,
  resetSelectTask,
  selectAllTask,
  selectTask
} from "../../redux/Tasks/actions";
import FilterStatus from "./FilterStatus";
// import _ from "lodash";
//component
import TaskItem from "./TaskItem";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: "flex",
      justifyContent: "space-between",
    },
    root2: {
      display: "flex",
      justifyContent: "space-around",
    },
    pagination: {
      // marginTop: theme.spacing(2),
      // marginBottom: theme.spacing(2),
      // display: "flex",
      // justifyContent: "center",
    },
    rowNumber: {
      color: "#518bc3",
    },
    title: {
      color: "#88b8e7",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    showRowNumberPerPage: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      textAlign: "left",
      color: "#518bc3",
    },
    showItems: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      textAlign: "right",
    },
    table: {
      minWidth: 650,
    },
    head: {
      backgroundColor: "#515151",
      color: theme.palette.common.white,
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  })
);

interface Props {
  tasks: Task[];
  selectedIds: String[];
  taskError: any;
}

const TaskList = (props: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const taskError = props.taskError;
  const totalTaskCount = props.tasks.length;
  const status = useSelector((state: any) => state.tasks.statusFillter);

  const handleToggleSelectTask = (checked: boolean, taskId: string) => {
    if (checked) {
      dispatch(selectTask(taskId));
    } else {
      dispatch(deselectTask(taskId));
    }
  };

  const toggleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(selectAllTask(props.tasks));
      return;
    }
    dispatch(resetSelectTask());
  };

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemPerPage, setItemPerPage] = React.useState(5);

  const indexOfLastItems = currentPage * itemPerPage;
  const indexOfFirstItems = indexOfLastItems - itemPerPage;

  var strSearch = useSelector((state: any) => state.tasks.searchStr);
  const taskList = props.tasks;
  let res = [];
  let resSearch = [];

  if (strSearch !== null) {
    resSearch = taskList.filter((item) => {
      return item.taskName.toUpperCase().includes(strSearch.toUpperCase());
    });
  } else {
    resSearch = taskList;
  }

  switch (status) {
    case "non":
      res = resSearch;
      break;
    default:
      res = resSearch.filter((item) => {
        return item.status === status;
      });
      break;
    }

  const actualItems = res?.slice(indexOfFirstItems, indexOfLastItems);
  const totalUserCount = res.length;
  const numOfPage =
    totalUserCount % itemPerPage !== 0
      ? ~~(totalUserCount / itemPerPage) + 1
      : ~~(totalUserCount / itemPerPage);
  const firstNumber =
    totalUserCount > 1 ? (currentPage - 1) * itemPerPage + 1 : 0;
  const lastNumber =
    totalUserCount < itemPerPage
      ? totalUserCount
      : totalUserCount < indexOfLastItems
      ? totalUserCount
      : indexOfLastItems;

  const handleChange = (event: any, value: number) => {
    if (event) {
      setCurrentPage(value);
    }
  };

  return (
    <div>
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      props.selectedIds.length > 0 &&
                      props.selectedIds.length < totalTaskCount
                    }
                    checked={
                      totalTaskCount > 0 &&
                      props.selectedIds.length === totalTaskCount
                    }
                    onChange={(e) => toggleCheckAll(e)}
                    inputProps={{ "aria-label": "select all" }}
                  />
                </TableCell>
                <TableCell className={classes.title}>
                  <FormattedMessage id="task.table.id" defaultMessage="ID" />
                </TableCell>
                <TableCell className={classes.title}>
                  <FormattedMessage
                    id="task.table.name"
                    defaultMessage="Name"
                  />
                </TableCell>

                <TableCell className={classes.title}>
                  <FormattedMessage
                    id="task.table.status"
                    defaultMessage="Status"
                  />
                  <FilterStatus />
                </TableCell>
                <TableCell className={classes.title}>
                  <FormattedMessage
                    id="task.table.project"
                    defaultMessage="Project"
                  />
                </TableCell>
                {/* <TableCell>
                  <FormattedMessage
                    id="task.table.isDeleted"
                    defaultMessage="isDeleted"
                  />
                </TableCell> */}
                <TableCell className={classes.title}>
                  <FormattedMessage
                    id="task.table.startdate"
                    defaultMessage="Start Date"
                  />
                </TableCell>
                <TableCell className={classes.title}>
                  <FormattedMessage
                    id="task.table.enddate"
                    defaultMessage="End Date"
                  />
                </TableCell>
                <TableCell className={classes.title}>
                  <FormattedMessage
                    id="task.table.assignee"
                    defaultMessage="Assignee"
                  />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskError
                ? NotificationManager.error(
                    "Failed To Load Data!",
                    "Failed!",
                    2000
                  )
                : null}
              {actualItems.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  selectedItemIds={props.selectedIds}
                  handleToggleSelectTask={handleToggleSelectTask}
                />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      <div className={classes.root}>
        <Typography className={classes.showRowNumberPerPage}>
          &nbsp;&nbsp;Showing {firstNumber} to {lastNumber} of total{" "}
          {totalUserCount} items
        </Typography>
        <div className={classes.root2}>
          <Typography className={classes.rowNumber}>
            Row per page:{" "}
            <b
              style={{ cursor: "pointer" }}
              onClick={() => {
                setItemPerPage(5);
                setCurrentPage(1);
              }}
            >
              5
            </b>{" "}
            |{" "}
            <b
              style={{ cursor: "pointer" }}
              onClick={() => {
                setItemPerPage(10);
                setCurrentPage(1);
              }}
            >
              10
            </b>{" "}
            |
            <b
              style={{ cursor: "pointer" }}
              onClick={() => {
                setItemPerPage(15);
                setCurrentPage(1);
              }}
            >
              15
            </b>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </Typography>

          <Pagination
            className={classes.pagination}
            count={numOfPage}
            variant="outlined"
            shape="rounded"
            page={currentPage}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskList;
