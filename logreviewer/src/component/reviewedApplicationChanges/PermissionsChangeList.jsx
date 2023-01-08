import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton } from '@mui/material';
import { 
    permissionsChangeListSelector, 
    permissionsChangeListPromiseSelector
   } from '../../module/permissionsChange/permissionsChangeSelector';
import { getPermissionsChangeListAction } from '../../module/permissionsChange/permissionsChangeAction';
import {ADDITIONAL_DETAILS,
    EVENT_DATE,
    SUBJECT_EMPLOYEE_ID,
    ISA_EMPLOYEE_ID,
    APPLICATION_NAME,
    APPLICATION_INVENTORY_NO,
    APPLICATION_ROLE_NAME,
    EVENT_ID,
    PERMISSION_CHANGES
} from '../../config/names_PL'
import { Box, Typography } from '@mui/material';
import { DataGrid, plPL } from '@mui/x-data-grid';
import {permissionChangeSelected} from '../../module/reconciliation/reconciliationSlice';

const PermissionsChangeList = ({ permissionsChangeList , listTitle, handleRowClick }) => {
      const dispatch = useDispatch();
      const rows = permissionsChangeList;
      const columns = [
        { field: 'id', headerName: EVENT_ID, width: 120 },
        { field: 'eventDate', headerName: EVENT_DATE, width: 160 },
        { field: 'subjectUserEmploeeId', headerName: SUBJECT_EMPLOYEE_ID, width: 110 },
        { field: 'informationSecurityAdministratorEmploeeId', headerName: ISA_EMPLOYEE_ID, width: 80 },
        { field: 'applicationName', headerName: APPLICATION_NAME, width: 120 },
        { field: 'applicationInventoryNo', headerName: APPLICATION_INVENTORY_NO, width: 120 },
        { field: 'applicationRoleName', headerName: APPLICATION_ROLE_NAME, width: 140 },       
        { field: 'additionalDetails', headerName: ADDITIONAL_DETAILS, width: 110 },
      ]

  return (
    <Box height= '100%' width= '100%'>
        <Box>{listTitle}</Box>
        <DataGrid
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100]}
        rowHeight={30}
        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
        columnVisibilityModel={{
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
        onRowClick={handleRowClick}
        />
  </Box>
  )
}

export default PermissionsChangeList