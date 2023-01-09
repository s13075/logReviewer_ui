import { Box, Alert } from '@mui/material'
import React from 'react'
import {
    JUSTIFICATION_HISTORY_LIST,
    STATUS_UPDATE_DATE,
    STATUS_UPDATE_ID,
    CHENGED_BY,
    NEW_STAUS,
    PREVIOUS_STATUS,
    PREVIOUS_COMMENT,
    NEW_COMMENT,
    NO_JUSTIFICATION_HISTORY_FIRST_QUERY,
} from '../../config/names_PL';
import { DataGrid, plPL } from '@mui/x-data-grid';
import { renderCellExpand, statusGetter, dateFormater } from './renderCelllExpand';

const JustificationHistoryList = ({ justificationHistoryList }) => {

    const rows = justificationHistoryList;
    const columns = [
        { field: 'id', headerName: STATUS_UPDATE_ID, width: 300 },
        { field: 'createdDate', headerName: STATUS_UPDATE_DATE, width: 160, valueGetter: dateFormater },
        { field: 'changedBy', headerName: CHENGED_BY, width: 100 },
        { field: 'oldStatus', headerName: PREVIOUS_STATUS, width: 220, valueGetter: statusGetter, },
        { field: 'newStatus', headerName: NEW_STAUS, width: 220, valueGetter: statusGetter, },
        { field: 'previousComment', headerName: PREVIOUS_COMMENT, width: 160, renderCell: renderCellExpand, },
        { field: 'newComment', headerName: NEW_COMMENT, width: 160, renderCell: renderCellExpand, }
    ]

    if (justificationHistoryList.length !== 0) {
        return (
            <Box height="100%" width="100%">
                <Box> {JUSTIFICATION_HISTORY_LIST}</Box>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={100}
                    rowsPerPageOptions={[100]}
                    rowHeight={80}
                    localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                id: false,
                                previousComment: false,
                                newComment: false,
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
                />
            </Box>
        )

    }
    return (
        <Box>
            <Box> {JUSTIFICATION_HISTORY_LIST}</Box>
            <Alert severity="info">{NO_JUSTIFICATION_HISTORY_FIRST_QUERY}</Alert>
        </Box>
    )
}

export default JustificationHistoryList;