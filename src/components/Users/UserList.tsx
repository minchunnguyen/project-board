import React from "react";
import UserItem from "./UserItem";
import User from "../../interfaces/User";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Typography,
  TableFooter,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { resetSelectUser, selectAllUser } from "../../redux/Users/actions";
import Paper from "@material-ui/core/Paper";
import { FormattedMessage } from "react-intl";
import Pagination from "@material-ui/lab/Pagination";

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
  users: User[];
  selectedIds: String[];
};
const UserList = (props: Props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const totalUserCount = props.users.length;

  const toggleCheckAll = () => {
    if (props.selectedIds.length > 0) {
      dispatch(resetSelectUser());
      return;
    }
    dispatch(selectAllUser(props.users));
  };
  // const [actualItems, setActualItems] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemPerPage, setItemPerPage] = React.useState(5);

  const indexOfLastItems = currentPage * itemPerPage;
  const indexOfFirstItems = indexOfLastItems - itemPerPage;
  const actualItems = props.users.slice(indexOfFirstItems, indexOfLastItems);
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
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      props.selectedIds.length > 0 &&
                      props.selectedIds.length < totalUserCount
                    }
                    checked={
                      totalUserCount > 0 &&
                      props.selectedIds.length === totalUserCount
                    }
                    onChange={() => toggleCheckAll()}
                    inputProps={{ "aria-label": "select all" }}
                  />
                </TableCell>
                <TableCell>
                  <FormattedMessage id="user.table.id" defaultMessage="Id" />
                </TableCell>
                <TableCell>
                  <FormattedMessage
                    id="user.table.firstname"
                    defaultMessage="First Name"
                  />
                </TableCell>
                <TableCell>
                  <FormattedMessage
                    id="user.table.lastname"
                    defaultMessage="Last Name"
                  />
                </TableCell>
                <TableCell>
                  <FormattedMessage
                    id="user.table.email"
                    defaultMessage="Email"
                  />
                </TableCell>
                <TableCell>
                  <FormattedMessage
                    id="user.table.role"
                    defaultMessage="Role"
                  />
                </TableCell>
                <TableCell>
                  <FormattedMessage id="user.table.isDeleted" defaultMessage="Is Deleted" />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {actualItems.map((user) => (
                <UserItem
                  key={user.id}
                  user={user}
                  selectedItemIds={props.selectedIds}
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
        &nbsp;&nbsp;Showing {firstNumber} to {lastNumber} of total {totalUserCount} items
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

export default UserList;
