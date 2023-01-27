import React from 'react';
import { useDispatch } from 'react-redux';
import {
  ADDITIONAL_DETAILS,
  EVENT_DATE,
  SUBJECT_EMPLOYEE_ID,
  ISA_EMPLOYEE_ID,
  APPLICATION_NAME,
  APPLICATION_INVENTORY_NO,
  APPLICATION_ROLE_NAME,
  EVENT_ID
} from '../../config/names_PL'
import { Box } from '@mui/material';
import { DataGrid, plPL } from '@mui/x-data-grid';
import { dateFormater } from '../justification/renderCelllExpand';

const PermissionsChangeList = ({ permissionsChangeList, listTitle, handleRowClick }) => {
  const rows = permissionsChangeList;
  const columns = [
    { field: 'id', headerName: EVENT_ID, width: 300 },
    { field: 'eventDate', headerName: EVENT_DATE, width: 160, valueGetter: dateFormater },
    { field: 'subjectUserEmploeeId', headerName: SUBJECT_EMPLOYEE_ID, width: 110 },
    { field: 'informationSecurityAdministratorEmploeeId', headerName: ISA_EMPLOYEE_ID, width: 90 },
    { field: 'applicationName', headerName: APPLICATION_NAME, width: 120 },
    { field: 'applicationInventoryNo', headerName: APPLICATION_INVENTORY_NO, width: 120 },
    { field: 'applicationRoleName', headerName: APPLICATION_ROLE_NAME, width: 140 },
    { field: 'additionalDetails', headerName: ADDITIONAL_DETAILS, width: 110 },
  ]

  return (
    <Box height='100%' width='100%'>
      <Box>{listTitle}</Box>
      <DataGrid
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
        hideFooter
        onRowClick={handleRowClick}
      />
    </Box>
  )
}

export default PermissionsChangeList