import React from "react";
import ProjectItem from "./ProjectItem";
import Project from "../../interfaces/Project";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Typography,
  createStyles,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { FormattedMessage } from "react-intl";
import { useSelector , useDispatch } from 'react-redux';
import { toggleAllProject } from '../../redux/Projects/actions';
import Pagination from "@material-ui/lab/Pagination";
// import { selectProject, deselectProject } from "../../redux/Trash/actions";

const projectStyles = makeStyles((theme) => 
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
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2),
    // textAlign: "right",
    color: "#518bc3",
  },
  showRowNumberPerPage: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: "left",
    color: "#518bc3",
  },
  table: {
    minWidth: 650,
  },
})
);

type Props = {
  projects: Project[];
  selectedIds: Number[];
};

const ProjectList = (props: Props) => {
  const dispatch = useDispatch();
  const classes = projectStyles();
  var condition = new Array();
  condition = useSelector(
    (state: any) => state.projects.dateFillter,
  );
  var strSearch = useSelector(
    (state: any) => state.projects.searchStr,
  );
  const projectList = props.projects;
  var res = [];
  if(strSearch !== null){
    res = projectList.filter(item => {return (item.projectName.toUpperCase().includes(strSearch.toUpperCase()))})
  } else {
    if (condition[0] !== 0 && condition[1] !== 0 && !isNaN(condition[0]) && !isNaN(condition[1])) {
      const start = condition[0];
      const end = condition[1];
      res = projectList.filter(item => {return ((Date.parse(item.startDate.toString()) >= start) && (Date.parse(item.startDate.toString()) <= end) && (Date.parse(item.endDate.toString()) >= start) &&(Date.parse(item.endDate.toString()) <= end))});
    } else {
      res = projectList;
    }
  }
  const toggleCheckAll = (event : any) => {
    if (event.target.checked) {
      dispatch(toggleAllProject(props.projects));
    }
    else dispatch(toggleAllProject([]));
  };

  const totalProjectCount = res.length;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemPerPage, setItemPerPage] = React.useState(5);

  const indexOfLastItems = currentPage * itemPerPage;
  const indexOfFirstItems = indexOfLastItems - itemPerPage;
  const actualItems = res.slice(indexOfFirstItems, indexOfLastItems);
  const numOfPage = (totalProjectCount % itemPerPage) !== 0 ? ~~(totalProjectCount / itemPerPage) + 1 : ~~(totalProjectCount / itemPerPage);

  const firstNumber =
  totalProjectCount > 1 ? (currentPage - 1) * itemPerPage + 1 : 0;
  const lastNumber =
  totalProjectCount < itemPerPage
      ? totalProjectCount
      : totalProjectCount < indexOfLastItems
      ? totalProjectCount
      : indexOfLastItems;

  const handleChange = (event: any, value : number) => {
    if(event){
      setCurrentPage(value);
    }
  };

  return (
    <div>

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                inputProps={{ "aria-label": "select all" }}
                checked={
                  props.projects.length > 0 &&
                  props.selectedIds.length === props.projects.length
                }
                onChange={(e) => toggleCheckAll(e)}
              />
            </TableCell>
            <TableCell>
              <FormattedMessage id="project.table.id" defaultMessage="Id" />
            </TableCell>
            <TableCell>
              <FormattedMessage id="project.table.name" defaultMessage="Name" />
            </TableCell>
            <TableCell>
              <FormattedMessage
                id="project.table.manager"
                defaultMessage="Manager"
              />
            </TableCell>
            <TableCell>
              <FormattedMessage
                id="project.table.startdate"
                defaultMessage="Start Date"
              />
            </TableCell>
            <TableCell>
              <FormattedMessage
                id="project.table.enddate"
                defaultMessage="End Date"
              />
            </TableCell>
            <TableCell>
              <FormattedMessage
                id="project.table.status"
                defaultMessage="Status"
              />
            </TableCell>
            <TableCell>
              <FormattedMessage
                id="project.table.description"
                defaultMessage="Description"
              />
            </TableCell>

            <TableCell>
              <FormattedMessage
                id="project.table.totalTask"
                defaultMessage="Total Task"
              />
            </TableCell>

            <TableCell>
              <FormattedMessage
                id="project.table.totalMember"
                defaultMessage="Total Member"
              />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {actualItems.map((project) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                />
              ))}
        </TableBody>
      </Table>
    </TableContainer>

    <div className={classes.root}>
        <Typography className={classes.showRowNumberPerPage}>
          Showing {firstNumber} to {lastNumber} of total {totalProjectCount} items
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
            </b>&nbsp;&nbsp;
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

export default ProjectList;
