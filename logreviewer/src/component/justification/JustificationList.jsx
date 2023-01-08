import { Box } from '@mui/system'
import React from 'react'
import {
    PENDING_JUSTIFICATION_LIST,
    JUSTIFICATION_ID,
    CURENT_STATUS,
    LAST_COMMENT,
    ASSIGNED_REVIEWER,
    ASSIGNED_ISA,
    CREATE_DATE,
    MODIFY_DATE,
    PENDING_ADMIN,
    PENDING_REVIEW,
    COMPLETE,
    UNKNOWN
} from '../../config/names_PL';
import { DataGrid, plPL } from '@mui/x-data-grid';
import { renderCellExpand } from './renderCelllExpand';
import { getJustificationPermissionsChangeList, justificationSelected } from '../../module/justification/justificationSlice';
import { useDispatch } from 'react-redux';

const JustificationList = ({ justificationList }) => {
    const dispatch = useDispatch();

    const handleRowClick = (props) => {
        console.log(props.row);
        dispatch(justificationSelected(props.row));
        dispatch(getJustificationPermissionsChangeList(props.row.id));
    };

    const rows = justificationList;
    const columns = [
        { field: 'id', headerName: JUSTIFICATION_ID, width: 180 },
        { field: 'curentStatus', headerName: CURENT_STATUS, width: 240, valueGetter: statusGetter,},
        { field: 'lastComment', headerName: LAST_COMMENT, width: 250,
            renderCell: renderCellExpand,
        },
        { field: 'assignedReviewerEmploeeId', headerName: ASSIGNED_REVIEWER, width: 110 },
        { field: 'assignedISAEmploeeId', headerName: ASSIGNED_ISA, width: 80 },
        { field: 'createdDate', headerName: CREATE_DATE, width: 160 },
        { field: 'modifiedDate', headerName: MODIFY_DATE, width: 160 }
    ]

    return (
        <Box height='90%' width='90%'>
            <Box>{PENDING_JUSTIFICATION_LIST}</Box>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={100}
                rowsPerPageOptions={[100]}
                rowHeight={30}
                localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
                columnVisibilityModel={{
                    id: false,
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
        </Box>
    )

}

const statusGetter = (value) => {
    switch (value.row.curentStatus) {
      case "PENDING_ADMIN":
        return PENDING_ADMIN;
      case 'PENDING_REVIEW':
        return PENDING_REVIEW;
      case 'COMPLETE':
        return COMPLETE;
      default:
        return UNKNOWN;
    }
  };

export default JustificationList