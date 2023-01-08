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
import {
  REVIEW_CHANGES_FOR,
  NO_REQUEST_SELECTED,
  PERMISSION_CHANGES,
} from '../../config/names_PL';
import { getPermissionsRequestListAction } from '../../module/permissionsRequest/permissionsRequestAction';
import ReconciliationContainer from './ReconciliationContainer';
import { hasSelectedPermissionRequest, permissionChangeSelected } from '../../module/reconciliation/reconciliationSlice';
import RequestCard from './RequestCard';
import ButtonsPanel from './ButtonsPanel';



const ReviewedApplicationChangesContainer = () => {

  const dispatch = useDispatch();
  const permissionsChangeList = useSelector(permissionsChangeListSelector);
  const permissionsChangeListPromise = useSelector(permissionsChangeListPromiseSelector);
  const permissionsRequestList = useSelector(permissionsRequestListSelector);
  const permissionsRequestListPromise = useSelector(permissionsRequestListPromiseSelector);
  const _hasSelectedPermissionRequest = useSelector(hasSelectedPermissionRequest);

  const permissionsChangesRowClick = (params) => {
    dispatch(permissionChangeSelected(params.row));
  };

  useEffect(() => {
    dispatch(getPermissionsRequestListAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPermissionsChangeListAction());
  }, [dispatch]);

  return (
    <Box >
      <Typography height='5%'>{REVIEW_CHANGES_FOR}</Typography>
      <Box height="95%" width='100%' display='flex' flexDirection='row'>
        <Box height="100vh" width='50vw' display='flex' flexDirection='column'>
          {!_hasSelectedPermissionRequest && (
            <Box height="50vh" width='50vw'>
              {permissionsRequestListPromise.isPending && (
                <Box ml={2}>
                  <Skeleton
                    variant="react"
                    animation="pulse"
                    height="50vh"
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
          )}
          <Box height="50vh" width='50vw'>
            <ReconciliationContainer />
          </Box>
        </Box>
        <Box height="100vh" width='50vw' display='flex' flexDirection='column'>
          <Box height="70vh" width='50vw'>

            {permissionsChangeListPromise.isPending && (
              <Box ml={2}>
                <Skeleton
                  variant="react"
                  animation="pulse"
                  height="70vh"
                  width='50vw'
                />
              </Box>
            )}

            {permissionsChangeListPromise.isFulfilled && (
              <PermissionsChangeList
                permissionsChangeList={permissionsChangeList}
                listTitle={PERMISSION_CHANGES}
                handleRowClick={permissionsChangesRowClick}
              />)};

            {permissionsChangeListPromise.isErrorOcurred && (
              <div>
                Error message...
              </div>
            )}
          </Box>
          <Box height="30vh" width='50vw'>
            <ButtonsPanel></ButtonsPanel>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ReviewedApplicationChangesContainer