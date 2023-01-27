import React from 'react';
import {
    COMMENT,
    SAVE,
    CANCEL,
    PENDING_ADMIN,
    PENDING_REVIEW,
    COMPLETE,
    SELECT_NEW_STATUS,
    PROVIDE_JUSTIFICATION
} from '../../config/names_PL';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { Select, MenuItem, Button, Box } from '@mui/material';
import { justificationValidationSchema } from '../../config/validation';
import { useSelector, useDispatch } from 'react-redux';
import { getUserObjectSelector } from '../../module/user/userSelector';
import { getSelectedJustification, putJustification, justificationDeselected } from '../../module/justification/justificationSlice';

function JustificationPanel() {
    const dispatch = useDispatch();

    const user = useSelector(getUserObjectSelector);
    const selectedJustification = useSelector(getSelectedJustification)
    const selecedJustificationStatus = selectedJustification.curentStatus;
    const userRoles = user.roles;

    const options = {
        PENDING_ADMIN: PENDING_ADMIN,
        PENDING_REVIEW: PENDING_REVIEW,
        COMPLETE: COMPLETE
    };

    const availableStatuses = (currentStatus, roles) => {
        let statuses = [];
        if (roles.some(role => role.roleName === 'REVIEWED_ISA')) {
            statuses.push('PENDING_REVIEW');
        }
        if (roles.some(role => role.roleName === 'REVIEWER') || roles.some(role => role.roleName === 'REVIEWER_MANAGER')) {
            statuses.push('PENDING_ADMIN');
            if (currentStatus !== 'PENDING_ADMIN' || roles.some(role => role.roleName === 'REVIEWER_MANAGER')) {
                statuses.push('COMPLETE');
            }
        }
        return statuses.filter(status => status !== currentStatus);
    };

    const handleCancelClick = () =>{
        dispatch(justificationDeselected())
    };
    
    const OptionMenu = ({ currentStatus, roles }) => {
        const statuses = availableStatuses(currentStatus, roles);
        return (
            <Field 
                name="curentStatus" 
                as={Select} 
                defaultValue={statuses[0]}
                sx={{
                    width: '300px',
                    marginTop: '1rem'
                }}
            >
                <MenuItem value="none" disabled> {SELECT_NEW_STATUS}</MenuItem>
                {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                        {options[status]}
                    </MenuItem>
                ))}
            </Field>
        );
    };
    
    return (
        <>
        <Box>{PROVIDE_JUSTIFICATION}</Box>
        <Box mt={1} >
        <Formik
            initialValues={{
                comment: '',
                curentStatus: 'none',
            }}
            validationSchema={justificationValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(putJustification([selectedJustification.id, values.comment, values.curentStatus]));
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field
                        component={TextField}
                        name="comment"
                        label={COMMENT}
                        multiline
                        rows={2}
                        variant="outlined"
                        fullWidth
                    />
                    <OptionMenu currentStatus={selecedJustificationStatus} roles={userRoles} />
                    <Button
                        ml={2}
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        sx={{
                            marginLeft: '1rem'
                        }}
                    >
                        {SAVE}
                    </Button>
                    <Button 
                        ml={2}
                        type="button" 
                        variant="contained" 
                        color="secondary"
                        onClick={handleCancelClick}
                        sx={{
                            marginLeft: '1rem'
                        }}
                    >
                        {CANCEL}
                    </Button>
                </Form>
            )}
        </Formik>
        </Box>
        </>

    )
}

export default JustificationPanel