import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Select, MenuItem, FormLabel } from '@mui/material';
import { useSelector } from 'react-redux';
import {
    PENDING_ADMIN,
    PENDING_REVIEW,
    COMPLETE,
    SELECT_NEW_STATUS
} from '../../config/names_PL'
import { getSelectedJustification } from '../../module/justification/justificationSlice'

export const StatusDropdown = () => {
    
    return (
        <>
            <FormLabel>{SELECT_NEW_STATUS}</FormLabel>
            <Field name="status" as={Select} initialvalue = "PENDING_REVIEW">
                <MenuItem value="PENDING_ADMIN" key="PENDING_ADMIN" >{PENDING_ADMIN}</MenuItem>
                <MenuItem value="PENDING_REVIEW" key="PENDING_REVIEW">{PENDING_REVIEW}</MenuItem>
                <MenuItem value="COMPLETE" key="COMPLETE" >{COMPLETE}</MenuItem>
            </Field>
        </>

    );
};