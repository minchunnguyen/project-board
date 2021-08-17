import React from 'react';
import { selectUser, deselectUser } from '../../redux/Trash/actions';
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

import User from '../../interfaces/User';
import { FormattedMessage } from 'react-intl';
import { restoreUserRequest } from '../../redux/Trash/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      marginRight: theme.spacing(1),
    },
    userRow: {
      transition: 'display 0.5s ease',
    },
  }),
);

type Props = {
  user: User;
  selectedItemIds: String[];
};

const UserItem = ({ user, selectedItemIds }: Props) => {
  const classes = useStyles();
  const selectedTrashUserIds = new Set(selectedItemIds)

  const dispatch = useDispatch();
  
  const toggleCheckbox = (userId: string) => {
    if (selectedTrashUserIds.has(userId)) {
      dispatch(deselectUser(userId));
    } else {
      dispatch(selectUser(userId));
    }
  };

  return (
    <TableRow
      hover
      onClick={() => toggleCheckbox(user.id)}
      role="checkbox"
      aria-checked={selectedTrashUserIds.has(user.id)}
      tabIndex={-1}
      key={user.id}
      selected={selectedTrashUserIds.has(user.id)}
      className={classes.userRow}
    >
      <TableCell padding="checkbox">
        <Checkbox color="primary" checked={selectedTrashUserIds.has(user.id)} />
      </TableCell>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.firstName}</TableCell>
      <TableCell>{user.lastName}</TableCell>
      <TableCell>{user.email}</TableCell>
      {/* <TableCell>{user.password}</TableCell> */}
      <TableCell>{user.role?.roleName}</TableCell>
      <TableCell>{user.isDeleted.toString()}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          size="small"
          color="primary"
          startIcon={<RestoreIcon />}
          className={classes.margin}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(restoreUserRequest(user.id));
          }}
        >
          <FormattedMessage id="trash.btn.restore" defaultMessage="Restore" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserItem;
