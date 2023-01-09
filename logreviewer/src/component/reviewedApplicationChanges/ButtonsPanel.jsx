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
    hasSelectedPermissionRequest
} from '../../module/reconciliation/reconciliationSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';




const ButtonsPanel = () => {
    
    const dispatch = useDispatch();
    const _hasSelectedPermissionChanges = useSelector(hasSelectedPermissionChanges);
    const _hasSelectedPermissionRequest = useSelector(hasSelectedPermissionRequest);

    const handelSaveClick = () => {
        dispatch(postReconciliationRequested());
    };
    const handelCancelClick = () => {
        dispatch(permissionChangeClearSelections());
    };
    const handelJustifyClick = () => {
        dispatch(postReconciliationJustified());
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
                disabled={ _hasSelectedPermissionRequest || !_hasSelectedPermissionChanges}

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