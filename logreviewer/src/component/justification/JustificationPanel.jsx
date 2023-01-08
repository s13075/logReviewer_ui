import React from 'react';
import {
    COMMENT,
    SAVE,
    CANCEL,
    PENDING_ADMIN,
    PENDING_REVIEW,
    COMPLETE,
    SELECT_NEW_STATUS,
    UNKNOWN
} from '../../config/names_PL'
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { Select, MenuItem, FormLabel, Button } from '@mui/material';
import { justificationValidationSchema } from '../../config/validation';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { getUserObjectSelector } from '../../module/user/userSelector';
import { getSelectedJustification, putJustification } from '../../module/justification/justificationSlice';

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
            if (currentStatus != 'PENDING_ADMIN' || roles.some(role => role.roleName === 'REVIEWER_MANAGER')) {
                statuses.push('COMPLETE');
            }
        }
        return statuses.filter(status => status !== currentStatus);
    };
    
    const OptionMenu = ({ currentStatus, roles }) => {
        const statuses = availableStatuses(currentStatus, roles);
        return (
            <Field name="curentStatus" as={Select} defaultValue={statuses[0]}>
                {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                        {options[status]}
                    </MenuItem>
                ))}
            </Field>
        );
    };
    
    return (
        <Formik
            initialValues={{
                comment: '',
                curentStatus: ''
            }}
            validationSchema={justificationValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
                // Submit the form
                console.log(values);
                console.log(values.comment);
                console.log(values.curentStatus);
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
                        rows={4}
                        variant="outlined"
                        fullWidth
                    />
                    <OptionMenu currentStatus={selecedJustificationStatus} roles={userRoles} />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                    >
                        {SAVE}
                    </Button>
                    <Button type="button" variant="contained" color="secondary">
                        {CANCEL}
                    </Button>
                </Form>
            )}
        </Formik>

    )
}

export default JustificationPanel