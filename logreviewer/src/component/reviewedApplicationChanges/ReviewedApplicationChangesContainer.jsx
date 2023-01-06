import React, { useEffect } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import PermissionsChangeList from './PermissionsChangeList';
import PermissionsRequestList from './PermissionsRequestList';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton } from '@mui/material';
import {
  permissionsChangeListSelector,
  permissionsChangeListPromiseSelector
} from '../../module/permissionsChange/permissionsChangeSelector';
import { getPermissionsChangeListAction } from '../../module/permissionsChange/permissionsChangeAction';
import { 
  permissionsRequestListSelector, 
  permissionsRequestListPromiseSelector
 } from '../../module/permissionsRequest/permissionsRequestSelector';
import { getPermissionsRequestListAction } from '../../module/permissionsRequest/permissionsRequestAction';
import ReconciliationContainer from './ReconciliationContainer';

const ReviewedApplicationChangesContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPermissionsChangeListAction());
  }, [dispatch]);


  const permissionsChangeList = useSelector(permissionsChangeListSelector);
  const permissionsChangeListPromise = useSelector(permissionsChangeListPromiseSelector);

  useEffect(() => {
    dispatch(getPermissionsRequestListAction());
  }, [dispatch]);


  const permissionsRequestList = useSelector(permissionsRequestListSelector);
  const permissionsRequestListPromise = useSelector(permissionsRequestListPromiseSelector);




  return (
    <Box >
      <Typography height='5%'>reviewedApplicationChangesContainer</Typography>
      <Box height="100vh" width='100vw' display='flex' flexDirection='row'>
        <Box height="100vh" width='50vw' display='flex' flexDirection='column'>
          <Box height="50vh" width='50vw'>
            {permissionsChangeListPromise.isPending && (
              <Box ml={2}>
                <Skeleton
                  variant="react"
                  animation="pulse"
                  height="50vh" 
                  width='50vw'
                />
              </Box>
            )}
            {permissionsChangeListPromise.isFulfilled && (<PermissionsChangeList permissionsChangeList={permissionsChangeList} />)};
            {permissionsChangeListPromise.isErrorOcurred && (
              <div>
                Error message...
              </div>
            )}
          </Box>
          <Box height="50vh" width='50vw'> 
            <ReconciliationContainer/>
          </Box>
        </Box>
        <Box height="100vh" width='50vw' display='flex' flexDirection='column'>
          <Box height="70vh" width='50vw'>
          {permissionsRequestListPromise.isPending && (
              <Box ml={2}>
                <Skeleton
                  variant="react"
                  animation="pulse"
                  height="70vh" 
                  width='50vw'
                />
              </Box>
            )}
            {permissionsRequestListPromise.isFulfilled && (<PermissionsRequestList permissionsRequestList={permissionsRequestList} />)};
            {permissionsRequestListPromise.isErrorOcurred && (
              <div>
                Error message...
              </div>
            )}
          </Box>
          <Box height="30vh" width='50vw'> box parent</Box>
        </Box>
      </Box>
    </Box>

  )
}

export default ReviewedApplicationChangesContainer