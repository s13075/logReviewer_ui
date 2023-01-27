import React from 'react';
import { Card, Typography, Grid, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  SUBJECT_EMPLOYEE_ID,
  ISA_EMPLOYEE_ID,
  APPLICATION_NAME,
  APPLICATION_INVENTORY_NO,
  APPLICATION_ROLE_NAME,
  EVENT_ID,
  REQUEST_NUMBER,
  APPROVER_EMPLOYEE_ID,
  REQUEST_STATUS,
  REQUEST
} from '../../config/names_PL'
import { selectedPermissionRequest, hasSelectedPermissionRequest } from '../../module/reconciliation/reconciliationSlice';

const RequestCard = () => {
  const _hasSelectedPermissionRequest = useSelector(hasSelectedPermissionRequest);
  const _selectedPermissionRequest = useSelector(selectedPermissionRequest);
  const requestValues = {
    id: [EVENT_ID, _hasSelectedPermissionRequest ? _selectedPermissionRequest.id : ''],
    requestNumber: [REQUEST_NUMBER, _hasSelectedPermissionRequest ? _selectedPermissionRequest.requestNumber : ''],
    eventDate: [SUBJECT_EMPLOYEE_ID, _hasSelectedPermissionRequest ? _selectedPermissionRequest.eventDate : ''],
    subjectUserEmploeeId: [SUBJECT_EMPLOYEE_ID, _hasSelectedPermissionRequest ? _selectedPermissionRequest.subjectUserEmploeeId : ''],
    approverUserEmploeeId: [APPROVER_EMPLOYEE_ID, _hasSelectedPermissionRequest ? _selectedPermissionRequest.approverUserEmploeeId : ''],
    informationSecurityAdministratorEmploeeId: [ISA_EMPLOYEE_ID, _hasSelectedPermissionRequest ? _selectedPermissionRequest.informationSecurityAdministratorEmploeeId : ''],
    applicationName: [APPLICATION_NAME, _hasSelectedPermissionRequest ? _selectedPermissionRequest.applicationName : ''],
    applicationInventoryNo: [APPLICATION_INVENTORY_NO, _hasSelectedPermissionRequest ? _selectedPermissionRequest.applicationInventoryNo : ''],
    applicationRoleName: [APPLICATION_ROLE_NAME, _hasSelectedPermissionRequest ? _selectedPermissionRequest.applicationRoleName : ''],
    status: [REQUEST_STATUS, _hasSelectedPermissionRequest ? _selectedPermissionRequest.status : '']
  };


  return (
    <Card >   
        <Box mt={1} mr={1} ml={1} mb={1} >
        <Typography>{REQUEST}</Typography>
        <Box mt={1} mr={1} ml={1} mb={1} >
        <Grid container spacing={1}>
          {Object.entries(requestValues).map(([key, value]) => (
            <Grid item xs={4} key={key}>
              <Typography variant="subtitle1" fontSize="small">{value[0]}:</Typography>
              <Typography variant="body1" fontSize="small" >{value[1]}</Typography>
            </Grid>
          ))}
        </Grid>
        </Box>
        </Box>
    </Card>
  )
}

export default RequestCard