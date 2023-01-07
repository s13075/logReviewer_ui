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

    const handelSaveClick = () => {
        console.log('handelSaveClick');
        dispatch(postReconciliationRequested());
    };
    const handelCancelClick = () => {
        console.log('handelCancelClick');
        dispatch(permissionChangeClearSelections());
    };
    const handelJustifyClick = ()=>{
        console.log('handelJustifyClick');
        dispatch(postReconciliationJustified());
    }

    const permissionChangeRows = _selectedPermissionChanges;
    const permissionChangeColumns = [
        { field: 'id', headerName: EVENT_ID, width: 120 },
        { field: 'eventDate', headerName: EVENT_DATE, width: 120 },
        { field: 'subjectUserEmploeeId', headerName: SUBJECT_EMPLOYEE_ID, width: 120 },
        { field: 'informationSecurityAdministratorEmploeeId', headerName: ISA_EMPLOYEE_ID, width: 120 },
        { field: 'applicationName', headerName: APPLICATION_NAME, width: 120 },
        { field: 'applicationInventoryNo', headerName: APPLICATION_INVENTORY_NO, width: 120 },
        { field: 'applicationRoleName', headerName: APPLICATION_ROLE_NAME, width: 120 },
        { field: 'additionalDetails', headerName: ADDITIONAL_DETAILS, width: 120 },
    ]


    return (
        <Box>
            <Box>{SELECTED_ITEMS}</Box>
            {_hasSelectedPermissionRequest && (<RequestCard />)}
            {!_hasSelectedPermissionRequest && (<Box>{NO_REQUEST_SELECTED}</Box>)}
            {_hasSelectedPermissionChanges && (
                <Box height="20vh">
                    <Box>{CHANGES}</Box>
                    <DataGrid
                        rows={permissionChangeRows}
                        columns={permissionChangeColumns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        rowHeight={30}
                        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
                        columnVisibilityModel={{
                            // Hide columns status and traderName, the other columns will remain visible
                            id: false,
                            applicationName: false,
                            applicationInventoryNo: false,
                        }}
                        sx={{
                            '& .MuiDataGrid-columnHeaderTitle': {
                                textOverflow: "clip",
                                whiteSpace: "break-spaces",
                                lineHeight: 1
                            }}}
                        onRowClick={handlePermissionChangeRowClick}
                    />
                </Box>
            )}
            {!_hasSelectedPermissionChanges && (<Box>{NO_CHANGES_SELECTED}</Box>)}
            <Box>
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    disabled={!_hasSelectedPermissionChanges || !_selectedPermissionRequest}
                    onClick={handelSaveClick}
                >
                    {SAVE}
                </Button>
                <Button
                    type='reset'
                    variant='contained'
                    color='primary'
                    onClick={handelCancelClick}
                >
                    {CANCEL}
                </Button>
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    disabled={_hasSelectedPermissionRequest||!_hasSelectedPermissionChanges}
                    onClick={handelJustifyClick}
                >
                    {JUSTIFY}
                </Button>
            </Box>
        </Box>
    )
}


export default ReconciliationContainer