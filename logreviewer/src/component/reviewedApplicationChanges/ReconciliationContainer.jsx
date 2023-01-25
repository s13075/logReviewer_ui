import React from 'react'
import { Box, Alert, Button, Paper } from '@mui/material';
import {
    SELECTED_ITEMS,
    NO_REQUEST_SELECTED,
    NO_CHANGES_SELECTED,
    CHANGES,
    COMMENT,
    CANCEL,
    PROVIDE_JUSTIFICATION,
    SEND,
    DESCRIBE_DOUBTS
} from '../../config/names_PL';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { useSelector, useDispatch } from 'react-redux';
import {
    postReconciliationJustified,
    hasSelectedPermissionChanges,
    hasSelectedPermissionRequest,
    selectedPermissionChanges,
    permissionChangeDeselected,
    isReconcileSelector,
    permissionChangeClearSelections,
} from '../../module/reconciliation/reconciliationSlice';
import { readdPermisionsChangeToList } from '../../module/permissionsChange/permissionsChangeAction';
import RequestCard from './RequestCard';
import PermissionsChangeList from './PermissionsChangeList';
import { reconciliationValidationSchema } from '../../config/validation'

const ReconciliationContainer = () => {
    const dispatch = useDispatch();

    const _hasSelectedPermissionChanges = useSelector(hasSelectedPermissionChanges);
    const _hasSelectedPermissionRequest = useSelector(hasSelectedPermissionRequest);
    const _selectedPermissionChanges = useSelector(selectedPermissionChanges);
    const isReconcile = useSelector(isReconcileSelector);

    const handlePermissionChangeRowClick = (params) => {
        dispatch(permissionChangeDeselected(params.row));
        dispatch(readdPermisionsChangeToList([params.row]));
    };

    const handleCancelClick = () => {
        dispatch(permissionChangeClearSelections());
        dispatch(readdPermisionsChangeToList(_selectedPermissionChanges));
    };

    return (
        
        <>
            <Box>{SELECTED_ITEMS}</Box>
       
            {_hasSelectedPermissionRequest && (
                <Box mt={2} mr={2} ml={1} mb={1} >
                    <RequestCard />
                </Box>
            )}
            {!_hasSelectedPermissionRequest && !isReconcile && (
                <Box mt={2} mr={2}>
                    <Alert severity="info">{NO_REQUEST_SELECTED}</Alert>
                </Box>
            )}



            {!_hasSelectedPermissionChanges && (
                <Box mt={2} mr={2}>
                    <Alert severity="info">{NO_CHANGES_SELECTED}</Alert>
                </Box>
            )}

            {_hasSelectedPermissionChanges && (
                <Box height="190px" mt={1} mr={2} ml={1}>
                    <PermissionsChangeList
                        permissionsChangeList={_selectedPermissionChanges}
                        listTitle={CHANGES}
                        handleRowClick={handlePermissionChangeRowClick}
                    />
                </Box>
            )}

            {isReconcile &&(
                <Box mt={3} ml={1} mr={2} >
                    <Box>{DESCRIBE_DOUBTS}</Box>
                    
                        <Formik
                            initialValues={{
                                comment: ''
                            }}
                            validationSchema={reconciliationValidationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                dispatch(postReconciliationJustified(values.comment));
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form >
                                    <Field
                                        component={TextField}
                                        name="comment"
                                        label={COMMENT}
                                        multiline
                                        rows={2}
                                        variant="outlined"
                                        fullWidth
                                        sx={{
                                            marginTop: "5px"
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="error"
                                        disabled={isSubmitting || !_hasSelectedPermissionChanges}
                                        sx={{
                                            marginTop: '5px'
                                        }}
                                    >
                                        {SEND}
                                    </Button>
                                    <Button
                                        type="button" 
                                        variant="contained" 
                                        color="secondary"
                                        onClick={handleCancelClick}
                                        sx={{
                                            marginTop: '5px',
                                            marginLeft: '1rem'
                                        }}
                                    >
                                        {CANCEL}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Box>
            )}
        </>
    )
}


export default ReconciliationContainer