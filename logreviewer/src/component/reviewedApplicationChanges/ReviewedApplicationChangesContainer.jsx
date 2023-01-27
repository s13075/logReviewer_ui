import React, { useEffect } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import PermissionsChangeList from './PermissionsChangeList';
import PermissionsRequestList from './PermissionsRequestList';
import { useSelector, useDispatch } from 'react-redux';
import {
  permissionsChangeListSelector,
  permissionsChangeListPromiseSelector
} from '../../module/permissionsChange/permissionsChangeSelector';
import { getPermissionsChangeListAction, removePermisionsChangeFromList } from '../../module/permissionsChange/permissionsChangeAction';
import {
  permissionsRequestListSelector,
  permissionsRequestListPromiseSelector
} from '../../module/permissionsRequest/permissionsRequestSelector';
import {
  REVIEW_CHANGES_FOR,
  PERMISSION_CHANGES,
} from '../../config/names_PL';
import { getPermissionsRequestListAction } from '../../module/permissionsRequest/permissionsRequestAction';
import ReconciliationContainer from './ReconciliationContainer';
import { hasSelectedPermissionRequest, permissionChangeSelected, isReconcileSelector, selectedPermissionChanges } from '../../module/reconciliation/reconciliationSlice';
import { getSelectedApplicationSelector } from '../../module/reviewedApplication/reviewedApplicationSelector';
import ButtonsPanel from './ButtonsPanel';



const ReviewedApplicationChangesContainer = () => {

  const dispatch = useDispatch();
  const permissionsChangeList = useSelector(permissionsChangeListSelector);
  const permissionsChangeListPromise = useSelector(permissionsChangeListPromiseSelector);
  const permissionsRequestList = useSelector(permissionsRequestListSelector);
  const permissionsRequestListPromise = useSelector(permissionsRequestListPromiseSelector);
  const _hasSelectedPermissionRequest = useSelector(hasSelectedPermissionRequest); 
  const application = useSelector(getSelectedApplicationSelector);
  const isReconcile = useSelector(isReconcileSelector);

  const permissionsChangesRowClick = (params) => {
    dispatch(permissionChangeSelected(params.row));
    dispatch(removePermisionsChangeFromList(params.row));
  };

  useEffect(() => {
    dispatch(getPermissionsRequestListAction(application.id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPermissionsChangeListAction(application.id));
  }, [dispatch]);
  
  return (
    <>
      <Typography variant='h5'>{REVIEW_CHANGES_FOR}{application.name}</Typography>
      <Box width='100%' display='flex' flexDirection='row'>
        <Box width='53.5%' display='flex' flexDirection='column'>
          {!_hasSelectedPermissionRequest && !isReconcile && (
            <Box height="50vh" mt={2} ml={1} mr={1} >
              {permissionsRequestListPromise.isPending && (
                <Box height="100%" width='100%'>
                  <Skeleton
                    variant="react"
                    animation="pulse"
                    height="100%"
                    width='100%'
                  />
                </Box>
              )}
              {permissionsRequestListPromise.isFulfilled && (
                <>
                  {!isReconcile && (
                    <PermissionsRequestList permissionsRequestList={permissionsRequestList} />
                  )}
                  {isReconcile && (
                    <PermissionsRequestList permissionsRequestList={permissionsRequestList} />
                  )}
                </>
              )}
              {permissionsRequestListPromise.isErrorOcurred && (
                <div>
                  Error message...
                </div>
              )}
            </Box>
          )}
          <Box width='100%' ml={1} mr={1}>
            <ReconciliationContainer/>
          </Box>
        </Box>
        <Box width='46.5%' display='flex' flexDirection='column'>
          <Box height="70vh" mt={2} ml={1} mr={1} >
            {permissionsChangeListPromise.isPending && (
              <Box height="100%" width='100%'>
                <Skeleton
                  variant="react"
                  animation="pulse"
                  height="100%"
                  width='100%'
                />
              </Box>
            )}

            {permissionsChangeListPromise.isFulfilled && (
              <PermissionsChangeList
                permissionsChangeList={permissionsChangeList}
                listTitle={PERMISSION_CHANGES}
                handleRowClick={permissionsChangesRowClick}
              />
              )}

            {permissionsChangeListPromise.isErrorOcurred && (
              <div>
                Error message...
              </div>
            )}
          </Box>
          <Box ml={3} mt={4}>
            <ButtonsPanel></ButtonsPanel>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ReviewedApplicationChangesContainer