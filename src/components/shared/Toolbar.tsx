import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { format } from "date-fns";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { AddCircle, Delete } from "@material-ui/icons";
import MoreIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from 'react-redux';
import ProjectCreate from "../../components/Projects/ProjectCeate";
import { changeDateFillter, searchProject, softDeleteRequest } from '../../redux/Projects/actions';
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
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
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const mobileMenuId = "primary-search-account-menu-mobile";
  const [fromDate, setfromDate] = React.useState(String);
  const [toDate, setToDate] = React.useState(String);
  // const [strSearch, setStrSearch] = React.useState(String
  //   // format(new Date(), "yyy-MM-dd")
  // );

  const [open, setOpen] = React.useState(false);
  const [isOpenCreatePopup, setOpenCreatePopup] = React.useState(false);

  function handleClose() {
    setOpen(false);
  };

  function handleClickOpen() {
    setOpen(true);
  };

  function handleCloseCreatePopup() {
    setOpenCreatePopup(false);
  };

  function handleOpenCreatePopup() {
    setOpenCreatePopup(true);
  };

  let ids = new Array();
  ids = useSelector(
    (state: any) => state.projects.item2Delete,
  );

  const handleFromDateChange = (date: any) => {
    setfromDate(date);
    dispatch(changeDateFillter([Date.parse(date), Date.parse(toDate)]));
  };

  const handleToDateChange = (date: any) => {
    setToDate(date);
    dispatch(changeDateFillter([Date.parse(fromDate), Date.parse(date)]));
  };

  const handleChangeSearch = (e: any) => {
    let timeout;
    clearTimeout(timeout);
    const value = e.target.value;
    timeout = setTimeout(() => {
      dispatch(searchProject(value));
    }, 1000);
  };

  const handleClickDelete = () => {
      ids.map(function(id){
        dispatch(softDeleteRequest(id.toString()));
      })
      setOpen(false);
  };

  const renderToolbar = () => {
    let res = undefined;
    const currenRole = useSelector((state: any) => state.authentication.currentAccountRole);
    if(currenRole === "admin"){
      res = (<div>
        <IconButton onClick = {handleOpenCreatePopup}>
            <AddCircle color="primary"/>
          </IconButton>
          <IconButton onClick = {handleClickOpen}>
            <Delete color="primary" />
          </IconButton>
      </div>)
    }
    return (
      res
    )
  };

  return (
    <div className={classes.grow}>
      <Toolbar>
        <div className={classes.sectionDesktop}>
          {renderToolbar()}
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={e => handleChangeSearch(e)}
          />
        </div>
        <div className={classes.menuButton}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                margin="normal"
                id="date-picker-inline-start"
                label={
                  <FormattedMessage
                    id="toolbar.startdate"
                    defaultMessage="Start date"
                  />
                }
                value={fromDate || null}
                onChange={handleFromDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                margin="normal"
                id="date-picker-inline-end"
                label={
                  <FormattedMessage
                    id="toolbar.enddate"
                    defaultMessage="End date"
                  />
                }
                value={toDate || null}
                onChange={handleToDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete Selected Project</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are You Sure ?
            </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleClickDelete}
                    color="primary" autoFocus>
                    OK
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={isOpenCreatePopup}
          onClose={handleCloseCreatePopup}
          aria-labelledby="form-dialog-title"
        >
          <ProjectCreate handleClose={handleCloseCreatePopup} />
        </Dialog>
      </Toolbar>
    </div>
  );
}
