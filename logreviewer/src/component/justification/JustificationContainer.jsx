import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Alert, Skeleton } from '@mui/material';
import {
  JUSTIFICATION_PAGE,
  ABOUT_PERMISSION_CHANGES,
  NO_JUSTIFICATION_SELECTED_TO_SHOW_CHANGES_FOR,
  NO_JUSTIFICATION_NO_HISTORY
} from '../../config/names_PL';
import { getSelectedJustificationHistorySelector, getSelectedJustificationPermissionsChangeListSelector, isIdleJustificationPermissionsChangeList, isLoadingJustificationPermissionsChangeList, hasSelectedJustification, isIdleJustification, getJustificationList, getJustificationsListSelector, isLoadingJustification } from '../../module/justification/justificationSlice';
import JystificationList from './JustificationList';
import PermissionsChangeList from '../reviewedApplicationChanges/PermissionsChangeList';
import JustificationPanel from './JustificationPanel';
import JustificationHistoryList from './JustificationHistoryList';

const JustificationContainer = () => {
  const dispatch = useDispatch();

  const justificationsList = useSelector(getJustificationsListSelector);
  const selectedJustificationPermissionsChangeListSelector = useSelector(getSelectedJustificationPermissionsChangeListSelector)
  const selectedJustificationHistory = useSelector(getSelectedJustificationHistorySelector);
  const _isLoadingJustification = useSelector(isLoadingJustification);
  const _isIdleJustification = useSelector(isIdleJustification);
  const _hasSelectedJustification = useSelector(hasSelectedJustification);
  const _isLoadingJustificationPermissionsChangeList = useSelector(isLoadingJustificationPermissionsChangeList);
  const _isIdleJustificationPermissionsChangeList = useSelector(isIdleJustificationPermissionsChangeList);

  useEffect(() => {
    dispatch(getJustificationList());
  }, [dispatch]);

  return (
    <>
      <Typography variant='h5'>{JUSTIFICATION_PAGE}</Typography>
      <Box width='100%' display='flex' flexDirection='column'>
        <Box height="30vh" mt={2} ml={1} mr={1} >
          {_isLoadingJustification && (
            <Box height="100%" width='100%'>
              <Skeleton
                variant="react"
                animation="pulse"
                height="100%"
                width='100%'
              />
            </Box>
          )}
          {_isIdleJustification && (
            <JystificationList justificationList={justificationsList} />

          )}
        </Box>
        <Box display='flex' flexDirection='ROW'>
          <Box height="50vh" width='50%' mt={2} ml={1} mr={1} >

            {!_hasSelectedJustification && (
              <Alert severity="info">{NO_JUSTIFICATION_SELECTED_TO_SHOW_CHANGES_FOR}</Alert>
            )}

            {_hasSelectedJustification && (
              <Box height="50%" width='100%'>

                {_isLoadingJustificationPermissionsChangeList && (
                              <Box height="100%" width='100%'>
                              <Skeleton
                                variant="react"
                                animation="pulse"
                                height="100%"
                                width='100%'
                              />
                            </Box>
                )}

                {_isIdleJustificationPermissionsChangeList && (
                  <PermissionsChangeList
                    listTitle={ABOUT_PERMISSION_CHANGES}
                    permissionsChangeList={selectedJustificationPermissionsChangeListSelector}
                  />
                )}
                <Box mt={4}>
                <JustificationPanel></JustificationPanel>
                </Box>
              </Box>
            )}
          </Box>
          <Box height="50vh" width='50%' mt={2} ml={1} mr={1}>
            {!_hasSelectedJustification && (
              <Alert severity="info">{NO_JUSTIFICATION_NO_HISTORY}</Alert>
           )}
            {_hasSelectedJustification && (
              <JustificationHistoryList justificationHistoryList={selectedJustificationHistory} />
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default JustificationContainer