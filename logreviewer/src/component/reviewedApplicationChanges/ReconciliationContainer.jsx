import React from 'react'
import { Box, Typography, Paper, Grid } from '@mui/material';
import { connect } from 'react-redux'

const ReconciliationContainer = ({selectedPermissionRequest,selectedPermissionChange, reconcile}) => {
    console.log(selectedPermissionRequest);
    console.log(selectedPermissionChange);
    console.log(reconcile);
    return (
    <Box>ReconciliationContainer</Box>
  )
}
const select = appState => ({
    //appState.selectedPermissionRequest shouldgo here
    selectedPermissionRequest:'PermissionRequest',
    selectedPermissionChange:'PermissionChange'

})
const actions = { 
    //here reconcile action from redux
    reconcile: 'reconcileAction', 
}

export default connect(select, actions)(ReconciliationContainer)