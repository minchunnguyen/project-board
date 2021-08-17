import React from "react";
import DeletedUserItem from './DeletedUserItem';
import User from "../../interfaces/User";
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
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { resetSelectUser, selectAllTrashUser } from "../../redux/Trash/actions";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type Props = {
  users: User[];
};


const DeletedUserList = (props: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedTrashUserIds = useSelector(
    (state: any) => state.trash.selectedTrashUserIds
  );

  const toggleCheckAll = () => {
    if(selectedTrashUserIds.length > 0){
      dispatch(resetSelectUser());
      return;
    }
    dispatch(selectAllTrashUser(props.users));
  };

  const totalTrashUserCount = props.users.length;

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={
                  selectedTrashUserIds.length > 0 &&
                  selectedTrashUserIds.length < totalTrashUserCount
                }
                checked={
                  totalTrashUserCount > 0 &&
                  selectedTrashUserIds.length === totalTrashUserCount
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
              <FormattedMessage id="user.table.email" defaultMessage="Email" />
            </TableCell>
            {/* <TableCell>
              <FormattedMessage
                id="user.table.password"
                defaultMessage="Password"
              />
            </TableCell> */}
            <TableCell>
              <FormattedMessage id="user.table.role" defaultMessage="Role" />
            </TableCell>
            <TableCell>
              <FormattedMessage id="user.table.isDeleted" defaultMessage="Is Deleted" />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map((user) => (
            <DeletedUserItem key={user.id} user={user} selectedItemIds={selectedTrashUserIds}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeletedUserList;
