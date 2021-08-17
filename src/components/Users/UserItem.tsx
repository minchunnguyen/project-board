import React from 'react';
import { selectUser, deselectUser } from '../../redux/Users/actions';
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
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';

import User from '../../interfaces/User';
import { FormattedMessage } from 'react-intl';

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
  const selectedIds = new Set(selectedItemIds)

  const dispatch = useDispatch();

  const toggleCheckbox = (userId: string) => {
    if (selectedIds.has(userId)) {
      dispatch(deselectUser(userId));
    } else {
      dispatch(selectUser(userId));
    }
  };

  return (
    //Table Body - list user items
    <TableRow
      hover
      onClick={() => toggleCheckbox(user.id)}
      role="checkbox"
      aria-checked={selectedIds.has(user.id)}
      tabIndex={-1}
      key={user.id}
      selected={selectedIds.has(user.id)}
      className={classes.userRow}
    >
      <TableCell padding="checkbox">
        <Checkbox color="primary" checked={selectedIds.has(user.id)} />
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
          onClick={(e) => e.stopPropagation()}
          href={`/users/${user.id}`}
          startIcon={<ListAltRoundedIcon />}
          className={classes.margin}
        >
          <FormattedMessage id="user.btn.view" defaultMessage="View" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserItem;
