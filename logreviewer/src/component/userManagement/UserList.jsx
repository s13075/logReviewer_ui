import React from 'react';
import {
    EMPLOEE_ID,
    EMPLOEE_NAME,
    EMPLOEE_SURNAME,
    EMPLOEE_EMAIL,
    ROLE_ADMIN,
    ROLE_REVIEWER,
    ROLE_REVIEWER_MANAGER,
    ROLE_REVIEWED_ISA
} from '../../config/names_PL';
import {
    ADMIN,
    REVIEWED_ISA,
    REVIEWER,
    REVIEWER_MANAGER
} from '../../config/constants';
import { DataGrid, plPL } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../module/manegedUser/managedUserAction';
import {
    getManagedUserEditPromiseSelector
} from '../../module/manegedUser/managedUserSelector';

const UserList = (allUsers) => {
    const dispatch = useDispatch();

    const managedUserEditProise = useSelector(getManagedUserEditPromiseSelector);

    const userIsAdmin = (params) => {    
        return params.row.roles.some(role => role.roleName === ADMIN) ? true : false;
    };
    const userIsReviewer = (params) => {    
        return params.row.roles.some(role => role.roleName === REVIEWER) ? true : false;
    };
    const userIsReviewerManager = (params) => {    
        return params.row.roles.some(role => role.roleName === REVIEWER_MANAGER) ? true : false;
    };
    const userIsReviewedISA = (params) => {    
        return params.row.roles.some(role => role.roleName === REVIEWED_ISA) ? true : false;
    };

    const handleRowClick = (params) =>{
        dispatch(selectUser(params.row.emploeeId));
    };

    const columns = [
        { field: 'emploeeId', headerName: EMPLOEE_ID, width: 120 },
        { field: 'name', headerName: EMPLOEE_NAME, width: 130 },
        { field: 'surname', headerName: EMPLOEE_SURNAME, width: 130 },
        { field: 'email', headerName: EMPLOEE_EMAIL, width: 250 },
        {
            field: ROLE_ADMIN,
            headerName: ROLE_ADMIN,
            type: 'boolean',
            sortable: true,
            width: 180,
            valueGetter: userIsAdmin,
        },
        {
            field: ROLE_REVIEWER,
            headerName: ROLE_REVIEWER,
            type: 'boolean',
            sortable: true,
            width: 130,
            valueGetter: userIsReviewer,
        },        
        {
            field: ROLE_REVIEWER_MANAGER,
            headerName: ROLE_REVIEWER_MANAGER,
            type: 'boolean',
            sortable: true,
            width: 180,
            valueGetter: userIsReviewerManager,
        },        
        {
            field: ROLE_REVIEWED_ISA,
            headerName: ROLE_REVIEWED_ISA,
            type: 'boolean',
            sortable: true,
            width: 180,
            valueGetter: userIsReviewedISA,
        },
 
    ];

    const rows = allUsers.allUsers;

  return (
    <div style={{ height: 420, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        rowHeight={30}
        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
        onRowClick={handleRowClick}
        disabled = {managedUserEditProise.isSelected}
      />
    </div>
  )
}

export default UserList