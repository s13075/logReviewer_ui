import React from 'react';
import {
    EMPLOEE_ID, 
    EMPLOEE_NAME, 
    EMPLOEE_SURNAME, 
    EMPLOEE_EMAIL, 
    EMPLOEE_ROLES,
    EMPLOEE_ROLES_HINT
} from '../../config/names_PL';
import { DataGrid, plPL } from '@mui/x-data-grid';

const UserList = (allUsers) => {
    {console.log(allUsers)}

    function getRoleNames(params){
        const roles = params.row.roles;
        let rolesStringified = "";
        roles.forEach(role =>{
            rolesStringified+= `${role.roleName} `
        });
        return rolesStringified;

    }

    const columns = [
        { field: 'emploeeId', headerName: EMPLOEE_ID, width: 120 },
        { field: 'name', headerName: EMPLOEE_NAME, width: 130 },
        { field: 'surname', headerName: EMPLOEE_SURNAME, width: 130 },
        { field: 'email', headerName: EMPLOEE_EMAIL, width: 250 },
        {
            field: 'roles',
            headerName: EMPLOEE_ROLES,
            description: EMPLOEE_ROLES_HINT,
            sortable: true,
            width: 380,
            valueGetter: getRoleNames,
          },
 
    ];

    const rows = allUsers.allUsers;

  return (
    <div style={{ height: 640, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
      />
    </div>
  )
}

export default UserList