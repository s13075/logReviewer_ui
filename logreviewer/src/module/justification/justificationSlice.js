import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getJustificationPermissionsChangeListService, getJustificationListService, putJustificationService } from '../services';
import { createSelector } from 'reselect';


const initialState = {
    justifications: [],
    selectedJustification: null,
    selectedJustificationPermissionsChangeList: [],
    status: 'idle',
    statusJustificationPermissionsChangeList: 'idle',

}

const justificationSlice = createSlice({
    name: 'justification',
    initialState,
    reducers: {
        justificationSelected(state, action) {
            state.selectedJustification = action.payload
        },
        justificationDeselected(state, action) {
            state.selectedJustification = null
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getJustificationList.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getJustificationList.fulfilled, (state, action) => {
                state.justifications = action.payload.data;
                state.status = 'idle';
            })
            .addCase(getJustificationPermissionsChangeList.pending, (state, action) => {
                state.statusJustificationPermissionsChangeList = 'loading';
            })
            .addCase(getJustificationPermissionsChangeList.fulfilled, (state, action) => {
                state.selectedJustificationPermissionsChangeList = action.payload.data;
                state.statusJustificationPermissionsChangeList = 'idle';
            })
            .addCase(putJustification.pending, (state, action) => {
                state.statusJustificationPermissionsChangeList = 'loading';
            })
            .addCase(putJustification.fulfilled, (state, action) => {
                state.selectedJustificationPermissionsChangeList = action.payload.data;
                state.selectedJustification = null;
                state.selectedJustificationPermissionsChangeList = [];
                state.statusJustificationPermissionsChangeList = 'idle';
            })
    }
});

export const getJustificationList = createAsyncThunk(
    'justification/getJustificationList', async () => {
        try {
            const data = await getJustificationListService();
            return await data;
        } catch (error) {
            console.log(error);
        }
});
export const getJustificationPermissionsChangeList = createAsyncThunk(
    'justification/getJustificationPermissionsChangeList', async (justificationId, thunkAPI) => {
        try {
            const data = await getJustificationPermissionsChangeListService(justificationId);
            return await data;
        } catch (error) {
            console.log(error);
        }
});

export const putJustification = createAsyncThunk(
    'justification/putJustification', 
    async (justificationData, {dispatch}) => {
        try {
            const body = {
                "curentStatus":justificationData[2],
                "lastComment":justificationData[1]          
            }
            const data = await putJustificationService(justificationData[0], body);

            dispatch(getJustificationList())

            return await data;
        } catch (error) {
            console.log(error);
        }
});

export const {
    justificationSelected,
    justificationDeselected,
} = justificationSlice.actions

export const getJustificationsListSelector = (state)=> state.justification.justifications;
export const getSelectedJustification = (state)=> state.justification.selectedJustification;
export const getJustificationsListStatus = (state) => state.justification.status;
export const getStatusJustificationPermissionsChangeListSelector = (state) => state.justification.statusJustificationPermissionsChangeList;
export const getSelectedJustificationPermissionsChangeListSelector = (state) => state.justification.selectedJustificationPermissionsChangeList;

export const hasSelectedJustification = createSelector(
    [getSelectedJustification],
    (selectedJustification) => selectedJustification === null ? false : true   
);

export const isLoadingJustification = createSelector(
    [getJustificationsListStatus],
    (status) => status === 'loading' ? true : false   
);

export const isIdleJustification = createSelector(
    [getJustificationsListStatus],
    (status) => status === 'idle' ? true : false   
);

export const isLoadingJustificationPermissionsChangeList = createSelector(
    [getStatusJustificationPermissionsChangeListSelector],
    (statusJustificationPermissionsChangeList) => statusJustificationPermissionsChangeList === 'loading' ? true : false   
);

export const isIdleJustificationPermissionsChangeList = createSelector(
    [getStatusJustificationPermissionsChangeListSelector],
    (statusJustificationPermissionsChangeList) => statusJustificationPermissionsChangeList === 'idle' ? true : false   
);

export const getSelectedJustificationHistorySelector = createSelector(
    [getSelectedJustification, hasSelectedJustification],
    (selectedJustification, hasJustification) =>
    hasJustification ? selectedJustification.justificationHistorySet : []
);


export default justificationSlice.reducer