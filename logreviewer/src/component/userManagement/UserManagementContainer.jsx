import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton } from '@mui/material';
import { getUserList } from '../../module/manegedUser/managedUserAction';
import {
  getManagedUserListSelector,
  getManagedUserListPromiseSelector,
  getManagedUserEditPromiseSelector,
  getManagedUserRegisterPromiseSelector
} from '../../module/manegedUser/managedUserSelector';
import { Box, Typography } from '@mui/material';
import UserList from './UserList';
import UserSelectedItem from './UserSelectedItem';
import {
  USER_MANAGEMENT_PAGE
} from '../../config/names_PL';

const UserManagementContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const allUsers = useSelector(getManagedUserListSelector);
  const allUsersPromise = useSelector(getManagedUserListPromiseSelector);
  const managedUserEditPromise = useSelector(getManagedUserEditPromiseSelector);
  const managedUserRegisterPromise = useSelector(getManagedUserRegisterPromiseSelector);

  const insertsSelected = () => {
    return managedUserEditPromise.isSelected || managedUserRegisterPromise.isSelected ? true : false;
  };

  return (
    <Box>
      <Typography variant='h5'>{USER_MANAGEMENT_PAGE}</Typography>
      <UserSelectedItem />


      {allUsersPromise.isPending && (
        <Box height="100%" width='100%'>
          <Skeleton
            variant="react"
            animation="pulse"
            height="100%"
            width='100%'
          />
        </Box>
      )}
      {allUsersPromise.isFulfilled && (
        <Box mt={1}>
          {!insertsSelected() && (
            <UserList allUsers={allUsers} />
          )}
        </Box>
      )}
      {allUsersPromise.isErrorOcurred && (
        <div>
          Error message...
        </div>
      )}


    </Box>
  )
}

export default UserManagementContainer