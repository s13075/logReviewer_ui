import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton } from '@mui/material';
import {ADDITIONAL_DETAILS,
    EVENT_DATE,
    SUBJECT_EMPLOYEE_ID,
    ISA_EMPLOYEE_ID,
    APPLICATION_NAME,
    APPLICATION_INVENTORY_NO,
    APPLICATION_ROLE_NAME,
    EVENT_ID,
    REQUEST_NUMBER,
    APPROVER_EMPLOYEE_ID,
    REQUEST_STATUS
} from '../../config/names_PL'
import { Box, Typography } from '@mui/material';
import { DataGrid, plPL } from '@mui/x-data-grid';

const PermissionsRequestList = ({ permissionsRequestList }) => {
    console.log(permissionsRequestList);

      const rows = permissionsRequestList;
      const columns = [
        { field: 'id', headerName: EVENT_ID, width: 120 },
        { field: 'requestNumber', headerName: REQUEST_NUMBER, width: 120 },
        { field: 'eventDate', headerName: EVENT_DATE, width: 120 },
        { field: 'subjectUserEmploeeId', headerName: SUBJECT_EMPLOYEE_ID, width: 120 },
        { field: 'approverUserEmploeeId', headerName: APPROVER_EMPLOYEE_ID, width: 120 },
        { field: 'informationSecurityAdministratorEmploeeId', headerName: ISA_EMPLOYEE_ID, width: 120 },
        { field: 'applicationName', headerName: APPLICATION_NAME, width: 120 },
        { field: 'applicationInventoryNo', headerName: APPLICATION_INVENTORY_NO, width: 120 },
        { field: 'applicationRoleName', headerName: APPLICATION_ROLE_NAME, width: 120 }, 
        { field: 'status', headerName: REQUEST_STATUS, width: 120 },
        
      ]

  return (
    <Box height= '100%' width= '100%'>
        <Box>PERMISSION REQUESTS</Box>
        <DataGrid
        rows={rows}
        columns={columns}
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
 //       onRowClick={}
        />
  </Box>
  )
}

export default PermissionsRequestList