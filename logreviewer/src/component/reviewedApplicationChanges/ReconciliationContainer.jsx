import React from 'react'
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import {
    ADDITIONAL_DETAILS,
    EVENT_DATE,
    SUBJECT_EMPLOYEE_ID,
    ISA_EMPLOYEE_ID,
    APPLICATION_NAME,
    APPLICATION_INVENTORY_NO,
    APPLICATION_ROLE_NAME,
    EVENT_ID,
    REQUEST_NUMBER,
    APPROVER_EMPLOYEE_ID,
    REQUEST_STATUS,
    SAVE,
    EDIT,
    ADD,
    CANCEL,
    JUSTIFY,
    SELECTED_ITEMS,
    NO_REQUEST_SELECTED,
    NO_CHANGES_SELECTED,
    CHANGES
} from '../../config/names_PL';
import { useSelector, useDispatch } from 'react-redux';
import { postReconciliationJustified, postReconciliationRequested, permissionChangeClearSelections, selectedPermissionRequest, hasSelectedPermissionChanges, hasSelectedPermissionRequest, selectedPermissionChanges, permissionChangeDeselected, permissionRequestDeselected } from '../../module/reconciliation/reconciliationSlice';
import { DataGrid, plPL } from '@mui/x-data-grid';
import RequestCard from './RequestCard';
import PermissionsChangeList from './PermissionsChangeList';


const ReconciliationContainer = () => {
    const dispatch = useDispatch();

    const _hasSelectedPermissionChanges = useSelector(hasSelectedPermissionChanges);
    const _hasSelectedPermissionRequest = useSelector(hasSelectedPermissionRequest);
    const _selectedPermissionRequest = useSelector(selectedPermissionRequest);
    const _selectedPermissionChanges = useSelector(selectedPermissionChanges);

    const handlePermissionChangeRowClick = (params) => {
        dispatch(permissionChangeDeselected(params.row));
    };
    const handlePermissionRequestRowClick = (params) => {
        dispatch(permissionRequestDeselected());
    };

    return (
        <Paper>
            <Box>{SELECTED_ITEMS}</Box>
            {_hasSelectedPermissionRequest && (
            <RequestCard />
          )}
          {!_hasSelectedPermissionRequest && (
            <Box>{NO_REQUEST_SELECTED}</Box>
          )}

            {!_hasSelectedPermissionChanges && (
                <Box>{NO_CHANGES_SELECTED}</Box>
            )}

            {_hasSelectedPermissionChanges && (
                <Box height="40vh">
                    <PermissionsChangeList
                        permissionsChangeList={_selectedPermissionChanges}
                        title={CHANGES}
                        handleRowClick={handlePermissionChangeRowClick}
                    />
                </Box>
            )}
        </Paper>
    )
}


export default ReconciliationContainer