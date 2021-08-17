import { Box, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteSweepOutlinedIcon from "@material-ui/icons/DeleteSweepOutlined";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/shared/Layout";
import SearchTask from "../../components/Tasks/SearchTask";
import TaskCreate from "../../components/Tasks/TaskCreate";
import TaskList from "../../components/Tasks/TaskList";
import { useRouter } from "next/router";
import {
  deleteTasks,
  getActiveTasks,
  resetSelectTask,
  getTasksByProjectIdRequest
} from "../../redux/Tasks/actions";
import { withAuthSync } from "../../utils/auth";

const useStyles = makeStyles({
  pageTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnAdd: {
    height: 36,
    marginRight: 8,
  },
  btnRemove: {
    height: 36,
  },
});

const TasksIndex = () => {
  const router = useRouter();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const {
    taskData,
    selectedTaskIds,
    currentAccountRole,
    taskError,
  } = useSelector((state: any) => ({
    taskData: state.tasks.taskData,
    selectedTaskIds: state.tasks.selectedTaskIds,
    currentAccountRole: state.authentication.currentAccountRole,
    taskError: state.tasks.error,
  }));
  const disableAddAndDeleteTask =
    currentAccountRole === null || currentAccountRole === "member";

  const dispatch = useDispatch();

  useEffect(() => {
    if(router.asPath === '/tasks'){
      dispatch(getActiveTasks());
    } else {
      dispatch(getTasksByProjectIdRequest(router.query.projectId));
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleClickAgreeConfirm = () => {
    handleSoftDelete().then(() => dispatch(resetSelectTask()));
    setOpenConfirm(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleSoftDelete = async () => {
    dispatch(deleteTasks());
  };

  return (
    <Layout title="Tasks List">
      <Box className={classes.pageTitle}>
        <h1>
          <FormattedMessage id="task.title" defaultMessage="Tasks List" />
        </h1>
        <SearchTask />
        <Box>
          {!disableAddAndDeleteTask ? (
            <Button
              className={classes.btnAdd}
              variant="contained"
              color="primary"
              size="medium"
              startIcon={<AddBoxIcon />}
              onClick={handleClickOpen}
            >
              <FormattedMessage id="user.btn.add" defaultMessage="Add" />
            </Button>
          ) : null}

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <TaskCreate handleClose={handleClose} />
          </Dialog>
          {!disableAddAndDeleteTask ? (
            <Button
              className={classes.btnRemove}
              variant="contained"
              color="secondary"
              size="medium"
              disabled={selectedTaskIds.length === 0}
              startIcon={<DeleteSweepOutlinedIcon />}
              onClick={handleClickOpenConfirm}
            >
              <FormattedMessage id="user.btn.delete" defaultMessage="Delete" />
            </Button>
          ) : null}
          <Dialog
            open={openConfirm}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              id="alert-dialog-title"
              style={{ display: "inline-flex", justifyContent: "center", color: '#ff4040' }}
            >
              {"DELETE TASKS"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <span>
                  This action will delete all selected items below!
                  <br />
                  Do You Want To Continue?
                </span>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirm}>Cancel</Button>
              <Button
                onClick={handleClickAgreeConfirm}
                color="primary"
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
      <TaskList
        tasks={taskData}
        selectedIds={selectedTaskIds}
        taskError={taskError}
      />
    </Layout>
  );
};

export default withAuthSync(TasksIndex);
