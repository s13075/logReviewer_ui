import React from 'react'
import { Box, Paper } from '@mui/material';
import { SELECTED_ITEMS,
    NO_REQUEST_SELECTED,
    NO_CHANGES_SELECTED,
    CHANGES
} from '../../config/names_PL';
import { useSelector, useDispatch } from 'react-redux';
import { hasSelectedPermissionChanges, 
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