import React, { useEffect } from 'react';
import { withAuthSync } from '../../utils/auth';
import DeletedUserList from '../../components/Trash/DeletedUserList';
import DeletedProjectList from '../../components/Trash/Project/ProjectList';
import DeleteTaskList from '../../components/Trash/Task/DeleteTaskList';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Layout from '../../components/shared/Layout';
import { FormattedMessage } from 'react-intl';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  getTrashUsersRequest,
  getTrashProjectRequest,
  getTrashTasksRequest,
  deleteTrashTasks,
  resetSelectTask,
  changeContext,
  resetSelectProject,
  emptyTrashProject
} from '../../redux/Trash/actions';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 'calc(100% - 60px - 1.34em)',
  },
  pageTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: 160,
  },
  btnRemove: {
    height: 36,
  },
  tabPanel: {
    width: '100%',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <Box
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className={classes.tabPanel}
      {...other}
    >
      {children}
    </Box>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const TrashBin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const trashProjectData = useSelector((state: any) => state.trash.trashProjectData);
  const trashContex = useSelector((state: any) => state.trash.trashContext);
  const currentRole = useSelector((state: any) => state.authentication.currentAccountRole);
  const [open, setOpen] = React.useState(false);
  const { trashUserData, trashTaskData, selectedTaskIds } = useSelector((state: any) => ({
    trashUserData: state.trash.trashUserData,
    trashTaskData: state.trash.trashTaskData,
    selectedTaskIds: state.trash.selectedTaskIds,
  }));

  const { selectedTrashUserIds, selectedProjectIds } = useSelector((state: any) => ({
    selectedTrashUserIds: state.trash.selectedTrashUserIds,
    selectedProjectIds: state.trash.selectedProjectIds
  }));

  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    let context = '';
    if(newValue === 0){
      context = 'tasksTab';
    } else if(newValue === 1){
      context = 'usersTab';
    } else if (newValue === 2){
      context = 'projectsTab';
    }
    setValue(newValue);
    dispatch(changeContext(context));
  };

  useEffect(() => {
    dispatch(getTrashUsersRequest());
    dispatch(getTrashProjectRequest());
    dispatch(getTrashTasksRequest());
  }, []);

  const handleDeleteTrash = async () => {
    dispatch(deleteTrashTasks());
  }

  const handleDeleteTrashProjects = async () => {
    dispatch(emptyTrashProject());
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const checkSelected = () => {
    if(selectedTrashUserIds.length === 0 && selectedProjectIds.length === 0 && selectedTaskIds.length === 0){
      return false
    } else return true
  };

  const handleClose = () => {
    if(trashContex === 'tasksTab') {
      handleDeleteTrash().then(() =>
      dispatch(resetSelectTask()))
    } else if(trashContex === 'usersTab') {
      //do delete manual User
    } else {
      handleDeleteTrashProjects().then(() =>
      dispatch(resetSelectProject()))
    }  
    setOpen(false);
  };

  return (
    <Layout title="Trash Bin">
      <Box className={classes.pageTitle}>
        <h1>Trash Bin</h1>
        <Button
          className={classes.btnRemove}
          variant="contained"
          color="secondary"
          size="medium"
          startIcon={<DeleteForeverOutlinedIcon />}
          onClick={
            handleClickOpen
          }
        >
          <FormattedMessage id="trash.btn.empty" defaultMessage="Delete" />
        </Button>
      </Box>
      <Box component={Paper} className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
          indicatorColor="primary"
        >
          <Tab label="Tasks" {...a11yProps(0)} />
          {currentRole === "admin" ? <Tab label="User" {...a11yProps(1)} /> : undefined}
          {currentRole === "admin" ? <Tab label="Projects" {...a11yProps(2)} /> : undefined}
          
        </Tabs>
        <TabPanel value={value} index={0}>
          <DeleteTaskList
            tasks={trashTaskData}
            selectedIds={selectedTaskIds}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DeletedUserList users={trashUserData} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DeletedProjectList projects = {trashProjectData}/>
        </TabPanel>
      </Box>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Clean Trash"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {checkSelected() == true ? (<span>This action will be delete all selected Item below!<br/>Do You Want To Continue?</span>) : (<span>This action will be remove all the record in trash!<br/>Do You Want To Continue?</span>)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpen(false)}} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default withAuthSync(TrashBin);
