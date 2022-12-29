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
      <Typography variant='h4'>
        {USER_MANAGEMENT_PAGE}
      </Typography>
      <UserSelectedItem />


      {allUsersPromise.isPending && (
        <Box ml={2}>
          <Skeleton
            variant="react"
            animation="pulse"
            width="80%"
            height="200px"
          />
        </Box>
      )}
      {allUsersPromise.isFulfilled && (
        <>
          {!insertsSelected() && (
            <UserList allUsers={allUsers} />
          )}
        </>
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