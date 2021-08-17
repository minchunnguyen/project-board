import React, { useEffect } from 'react';
import { withAuthSync } from '../../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import {
  getActiveUsersRequest,
  resetSelectUser,
  softDeleteRequest,
} from '../../redux/Users/actions';
import Layout from '../../components/shared/Layout';
import UserList from '../../components/Users/UserList';
import { Button, Box, Dialog, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage, useIntl, defineMessages } from 'react-intl';
import UserCreate from '../../components/Users/UserCreate';

const useStyles = makeStyles({
  pageTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnAdd: {
    height: 36,
    marginRight: 8,
  },
  btnRemove: {
    height: 36,
  },
});

const UsersIndex = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const userData = useSelector((state: any) => state.users.userData);
  const selectedUserIds = useSelector(
    (state: any) => state.users.selectedUserIds,
  );

  useEffect(() => {
    dispatch(getActiveUsersRequest());
  }, []);

  const handleSoftDelete = async (userIds: string[]) => {
    userIds.map((id: string) => {
      dispatch(softDeleteRequest(id));
    });
    setOpenDelete(false);
  };

  const [isOpenCreatePopup, setOpenCreatePopup] = React.useState(false);

  function handleCloseCreatePopup() {
    setOpenCreatePopup(false);
  };

  function handleOpenCreatePopup() {
    setOpenCreatePopup(true);
  };

  const intl = useIntl();

  const user = defineMessages({
    title: {
      id: 'user.title',
      defaultMessage: 'Users List',
    },
  });

  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <Layout title={intl.formatMessage(user.title)}>
      <Box className={classes.pageTitle}>
        <h1>
          <FormattedMessage id="user.title" defaultMessage="Users List" />
        </h1>
        <Box>
          <Button
            className={classes.btnAdd}
            variant="contained"
            color="primary"
            size="medium"
            // href={`/users/add`}
            onClick = {handleOpenCreatePopup}
            startIcon={<PersonAddOutlinedIcon />}
          >
            <FormattedMessage id="user.btn.add" defaultMessage="Add" />
          </Button>

          <Button
            className={classes.btnRemove}
            variant="contained"
            color="secondary"
            size="medium"
            startIcon={<DeleteSweepOutlinedIcon />}
            onClick={() => handleClickDelete()}
          >
            <FormattedMessage id="user.btn.trash" defaultMessage="Trash" />
          </Button>

          <Dialog
            open={isOpenCreatePopup}
            onClose={handleCloseCreatePopup}
            aria-labelledby="form-dialog-title"
          >
            <UserCreate handleClose={handleCloseCreatePopup} />
          </Dialog>
          
          <Dialog
            open={openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="form-dialog-title"
          >
            
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <FormattedMessage id="user.detele.confirm" defaultMessage="Are you sure you want to delete this?"/>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete} color="primary">
                <FormattedMessage id="btn.cancel" defaultMessage="Cancel"/>
              </Button>
              <Button 
                onClick={()=>handleSoftDelete(selectedUserIds).then(() =>
                  dispatch(resetSelectUser()),
                  )} 
                color="primary" autoFocus>
                  <FormattedMessage id="btn.ok" defaultMessage="OK"/>
              </Button>
            </DialogActions>
          </Dialog>

        </Box>
      </Box>
      <UserList users={userData} selectedIds={selectedUserIds} />
    </Layout>
  );
};

export default withAuthSync(UsersIndex);
