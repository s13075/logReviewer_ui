import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton } from '@mui/material';
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
  PERMISSION_REQUESTS
} from '../../config/names_PL'
import { Box, Typography } from '@mui/material';
import { DataGrid, plPL } from '@mui/x-data-grid';
import { hasSelectedPermissionRequest, permissionRequestSelected } from '../../module/reconciliation/reconciliationSlice';
import { dateFormater } from '../justification/renderCelllExpand';


const PermissionsRequestList = ({ permissionsRequestList }) => {
  const dispatch = useDispatch();
  const _hasSelectedPermissionRequest = useSelector(hasSelectedPermissionRequest);

  const rows = permissionsRequestList;
  const columns = [
    { field: 'id', headerName: EVENT_ID, width: 300 },
    { field: 'requestNumber', headerName: REQUEST_NUMBER, width: 110 },
    { field: 'eventDate', headerName: EVENT_DATE, width: 160, valueGetter: dateFormater },
    { field: 'subjectUserEmploeeId', headerName: SUBJECT_EMPLOYEE_ID, width: 110 },
    { field: 'approverUserEmploeeId', headerName: APPROVER_EMPLOYEE_ID, width: 110 },
    { field: 'informationSecurityAdministratorEmploeeId', headerName: ISA_EMPLOYEE_ID, width: 80 },
    { field: 'applicationName', headerName: APPLICATION_NAME, width: 120 },
    { field: 'applicationInventoryNo', headerName: APPLICATION_INVENTORY_NO, width: 120 },
    { field: 'applicationRoleName', headerName: APPLICATION_ROLE_NAME, width: 140 },
    { field: 'status', headerName: REQUEST_STATUS, width: 120 },

  ]
  const handleRowClick = (params) => {
    dispatch(permissionRequestSelected(params.row))
  }

  return (
    <Box height="90%">
      <Box>{PERMISSION_REQUESTS}</Box>
      {!_hasSelectedPermissionRequest && (<DataGrid
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100]}
        rowHeight={30}
        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
              applicationName: false,
              applicationInventoryNo: false,
              status: false
            },
          },
        }}
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            textOverflow: "clip",
            whiteSpace: "break-spaces",
            lineHeight: 1
          }
        }}
        onRowClick={handleRowClick}
      />
      )}
    </Box>
  )
}
export default PermissionsRequestList