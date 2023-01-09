import React from 'react'
import { Box, Alert } from '@mui/material';
import {
    SELECTED_ITEMS,
    NO_REQUEST_SELECTED,
    NO_CHANGES_SELECTED,
    CHANGES
} from '../../config/names_PL';
import { useSelector, useDispatch } from 'react-redux';
import {
    hasSelectedPermissionChanges,
    hasSelectedPermissionRequest,
    selectedPermissionChanges,
    permissionChangeDeselected
} from '../../module/reconciliation/reconciliationSlice';
import RequestCard from './RequestCard';
import PermissionsChangeList from './PermissionsChangeList';

const ReconciliationContainer = () => {
    const dispatch = useDispatch();

    const _hasSelectedPermissionChanges = useSelector(hasSelectedPermissionChanges);
    const _hasSelectedPermissionRequest = useSelector(hasSelectedPermissionRequest);
    const _selectedPermissionChanges = useSelector(selectedPermissionChanges);

    const handlePermissionChangeRowClick = (params) => {
        dispatch(permissionChangeDeselected(params.row));
    };

    return (
        <>
            <Box>{SELECTED_ITEMS}</Box>
            {_hasSelectedPermissionRequest && (
                <Box mt={1} mr={1} ml={1} mb={1} >
                    <RequestCard />
                </Box>
            )}
            {!_hasSelectedPermissionRequest && (
                <Box mt={2} mr={2}>
                    <Alert severity="info">{NO_REQUEST_SELECTED}</Alert>
                </Box>
            )}

            {!_hasSelectedPermissionChanges && (
                <Box mt={2} mr={2}>
                    <Alert severity="info">{NO_CHANGES_SELECTED}</Alert>
                </Box>
            )}

            {_hasSelectedPermissionChanges && (
                <Box height="30vh" mt={1} mr={2} ml={1}>
                    <PermissionsChangeList
                        permissionsChangeList={_selectedPermissionChanges}
                        listTitle={CHANGES}
                        handleRowClick={handlePermissionChangeRowClick}
                    />
                </Box>
            )}
        </>
    )
}


export default ReconciliationContainer