import React from 'react';
import {
    SAVE,
    CANCEL,
    JUSTIFY,
} from '../../config/names_PL';
import { 
    postReconciliationJustified, 
    postReconciliationRequested, 
    permissionChangeClearSelections,
    hasSelectedPermissionChanges,
    hasSelectedPermissionRequest,
    reconcilePermissionChange,
    isReconcileSelector,
    selectedPermissionChanges
} from '../../module/reconciliation/reconciliationSlice';
import { readdPermisionsChangeToList } from '../../module/permissionsChange/permissionsChangeAction';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';




const ButtonsPanel = () => {
    
    const dispatch = useDispatch();
    const _hasSelectedPermissionChanges = useSelector(hasSelectedPermissionChanges);
    const _hasSelectedPermissionRequest = useSelector(hasSelectedPermissionRequest);
    const _selectedPermissionChanges =  useSelector(selectedPermissionChanges);
    const isReconcile = useSelector(isReconcileSelector);


    const handelSaveClick = () => {
        dispatch(postReconciliationRequested());
    };
    const handelCancelClick = () => {
        dispatch(permissionChangeClearSelections());
        dispatch(readdPermisionsChangeToList(_selectedPermissionChanges));
    };
    const handelJustifyClick = () => {
        dispatch(reconcilePermissionChange());
    }

    return (
        <Box>
            <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={!_hasSelectedPermissionChanges || !_hasSelectedPermissionRequest}
                onClick={handelSaveClick}
            >
                {SAVE}
            </Button>
            <Button
                type='reset'
                variant='contained'
                color='secondary'
                disabled={ isReconcile }
                onClick={handelCancelClick}
                sx={{
                    marginLeft:'1rem'
                }}
            >
                {CANCEL}
            </Button>
            <Button
                type='submit'
                variant='contained'
                color='warning'
                disabled={ _hasSelectedPermissionRequest || !_hasSelectedPermissionChanges || isReconcile}

                sx={{
                    marginLeft:'1rem'
                }}
                onClick={handelJustifyClick}
            >
                {JUSTIFY}
            </Button>
        </Box>

    )
}

export default ButtonsPanel