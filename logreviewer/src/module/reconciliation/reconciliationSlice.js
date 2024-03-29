import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postReconciliationRequestedService, postReconciliationJustifiedService} from '../services';
import { createSelector } from 'reselect';
import {ALERT_UNMATCHED_ISA} from '../../config/names_PL';
import { readdPermisionsChangeToList, removePermisionsChangeFromList } from '../../module/permissionsChange/permissionsChangeAction';

const initialState = {
    permissionRequest:null,
    permissionChanges:[],
    status: 'idle',
    reconcile: false
}

export const postReconciliationRequested = createAsyncThunk(
    'reconciliation/postReconciliationRequested', async(arg,{ getState }) =>{
    const state = getState()
    try {
        const passedpermissionChanges = state.reconciliation.permissionChanges;
        const passedpermissionRequest = state.reconciliation.permissionRequest;
        const body = {
            "ofPermisionChanges":passedpermissionChanges,
            "permissionsRequest":passedpermissionRequest          
        }
        const response = await postReconciliationRequestedService(body);
        return await response;
      } catch (error) {
        console.log(error);
      }

})

export const postReconciliationJustified = createAsyncThunk(
    'reconciliation/postReconciliationJustified', async(arg,{ getState }) =>{
    const state = getState()
    try {
        const passedPermissionChanges = state.reconciliation.permissionChanges;
        const body = {
            "ofPermisionChanges":passedPermissionChanges,
            "lastComment": arg,
            "curentStatus": 'PENDING_ADMIN',
            "permissionsRequest":null          
        }
        const response = await postReconciliationJustifiedService(body);
        return await response;
      } catch (error) {
        console.log(error);
      }

})



const reconciliationSlice = createSlice({
    name: 'reconciliation',
    initialState,
    reducers:{
        permissionRequestSelected(state, action){
            state.permissionRequest = action.payload
        },
        permissionRequestDeselected(state, action){
            state.permissionRequest = null
        },
        permissionChangeSelected(state, action){
            if(!state.permissionChanges.some((change) => change.id === action.payload.id)){

                if(!state.permissionChanges.some((change) => 
                change.informationSecurityAdministratorEmploeeId === action.payload.informationSecurityAdministratorEmploeeId) &&
                state.permissionChanges.length !== 0){
                    alert(ALERT_UNMATCHED_ISA);
                }else{
                    state.permissionChanges.push(action.payload);
                }              
            }
        },
        permissionChangeDeselected(state, action){
            state.permissionChanges = state.permissionChanges.filter((change) => change.id !== action.payload.id);
            readdPermisionsChangeToList(action.payload);
            
        },
        permissionChangeClearSelections(state,action){
            state.permissionRequest=null;
            state.permissionChanges=[];
            state.status = 'idle';
            state.reconcile = false;
        },
        reconcilePermissionChange(state, action){
            state.reconcile = true;
        },
    },
    extraReducers: builder =>{
        builder
            .addCase(postReconciliationRequested.pending, (state, action) =>{
                state.status = 'saving';
            })
            .addCase(postReconciliationRequested.fulfilled, (state, action) => {
                state.permissionRequest=null;
                state.permissionChanges=[];
                state.status= 'idle';
                state.reconcile = false;
            })
            .addCase(postReconciliationJustified.pending, (state, action) =>{
                state.status = 'saving';
            })
            .addCase(postReconciliationJustified.fulfilled, (state, action) => {
                state.permissionRequest=null;
                state.permissionChanges=[];
                state.status= 'idle';
                state.reconcile = false;
            })
    }
})

export const {
    permissionRequestSelected, 
    permissionChangeSelected, 
    permissionChangeClearSelections, 
    permissionChangeDeselected, 
    permissionRequestDeselected,
    reconcilePermissionChange,
} = reconciliationSlice.actions

export const selectedPermissionRequest = (state) => state.reconciliation.permissionRequest;
export const selectedPermissionChanges = (state) => state.reconciliation.permissionChanges;
export const isReconcileSelector = (state) => state.reconciliation.reconcile;

export const hasSelectedPermissionChanges = createSelector(
    [selectedPermissionChanges],
    (permissionChanges) => permissionChanges.length === 0 ? false : true
);

export const hasSelectedPermissionRequest = createSelector(
    [selectedPermissionRequest],
    (permissionRequest) => permissionRequest === null ? false : true
);

export default reconciliationSlice.reducer

