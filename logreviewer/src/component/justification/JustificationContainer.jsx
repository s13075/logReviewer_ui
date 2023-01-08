import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import {
  JUSTIFICATION_PAGE,
  ABOUT_PERMISSION_CHANGES
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
    <Box >
      <Typography height='5%'>{JUSTIFICATION_PAGE}</Typography>
      <Box height="100vh" width='100vw' display='flex' flexDirection='column'>
        <Box height="30vh" width='100vw'>
          {_isLoadingJustification && (
            <Box> LISTA WYJASNIENIEŃ się ładuje</Box>
          )}
          {_isIdleJustification && (
            <JystificationList justificationList={justificationsList} />

          )}
        </Box>
        <Box height="70vh" width='100vw' display='flex' flexDirection='ROW'>
          <Box height="50vh" width='50vw'>

            {!_hasSelectedJustification && (
              <Box>NO JUSTIFICATION selected TO SHOW CHANGES AVAILIBLE</Box>
            )}

            {_hasSelectedJustification && (
              <Box height="50%" width='100%'>

                {_isLoadingJustificationPermissionsChangeList && (
                  <Box>JUSTIFICATION się ładuje</Box>
                )}

                {_isIdleJustificationPermissionsChangeList && (
                  <PermissionsChangeList
                    listTitle={ABOUT_PERMISSION_CHANGES}
                    permissionsChangeList={selectedJustificationPermissionsChangeListSelector}
                  />
                )}
                <JustificationPanel></JustificationPanel>
              </Box>
            )}
          </Box>
          <Box height="50vh" width='50vw'>
            {!_hasSelectedJustification && (
              <Box>NO JUSTIFICATION selected TO SHOW CHANGES AVAILIBLE</Box>
            )}
            {_hasSelectedJustification && (
              <JustificationHistoryList justificationHistoryList = {selectedJustificationHistory}/>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default JustificationContainer