import React from 'react';
import {
    Typography,
    Box,
    Paper,
    Avatar,
    Stack,
    FormControlLabel,
    Checkbox,
    TextField,
    Button
} from '@mui/material';
import {
    EMPLOEE_ID,
    EMPLOEE_NAME,
    EMPLOEE_SURNAME,
    EMPLOEE_EMAIL,
    EMPLOEE_ROLES,
    EMPLOEE_PASSWORD,
    ROLE_ADMIN,
    ROLE_REVIEWER,
    ROLE_REVIEWER_MANAGER,
    ROLE_REVIEWED_ISA,
    SAVE,
    EDIT,
    ADD,
    CANCEL,
} from '../../config/names_PL';
import {
    ADMIN,
    REVIEWED_ISA,
    REVIEWER,
    REVIEWER_MANAGER
} from '../../config/constants';
import { validationSchema } from '../../config/validation';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, unSelectUser, lockForUserRegister, lockForUserEdit, unlockForUserRegister, unlockForUserEdit, updateUserRoles, updateUser, getUserList } from '../../module/manegedUser/managedUserAction';
import {
    getManagedUserRegisterPromiseSelector,
    getManagedUserSelector,
    getManagedUserPromiseSelector,
    getManagedUserEditPromiseSelector
} from '../../module/manegedUser/managedUserSelector';
import { stringAvatar } from '../../module/user/userAvatar';

const UserSelectedItem = () => {

    const dispatch = useDispatch();



    const managedUserPromise = useSelector(getManagedUserPromiseSelector);
    const managedUser = useSelector(getManagedUserSelector);
    const managedUserEditPromise = useSelector(getManagedUserEditPromiseSelector);
    const managedUserRegisterPromise = useSelector(getManagedUserRegisterPromiseSelector);

    const existsManagedUser = () => {
        return managedUser ? true : false;
    }

    const formikValues = {
        name: managedUser ? managedUser.name : '',
        surname: managedUser ? managedUser.surname : '',
        email: managedUser ? managedUser.email : '',
        emploeeId: managedUser ? managedUser.emploeeId : '',
        password: managedUser ? managedUser.password : '',
        roles: managedUser ? managedUser.roles : []
    };

    const formik = useFormik({
        initialValues: formikValues,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (!managedUserEditPromise.isSelected) {
                dispatch(registerUser([
                    values.name,
                    values.surname,
                    values.email,
                    values.password,
                    values.roles
                ]));

            } else {
                dispatch(updateUser(values.emploeeId, [
                    values.name,
                    values.surname,
                    values.email,
                    values.password,
                    values.roles
                ]));

            }



        }
    });

    const managedUserHasRole = (roleNamep) => {
        let hasRole = false
        managedUser ?
            formik.values.roles.some(role => role.roleName === roleNamep) ? hasRole = true : hasRole = false
            : hasRole = false
        return hasRole;
    };

    const handleCheckboxClick = (event) => {
        formik.values.roles.some(role => role.roleName === event.target.name) ? formik.values.roles.splice(formik.values.roles.indexOf(role => role.roleName === event.target.name), 1) : formik.values.roles.push({ roleName: event.target.name });
        dispatch(updateUserRoles(formik.values.roles));

    }

    const handelAddClick = () => {
        console.log("AddClick");
        dispatch(unSelectUser());
        dispatch(lockForUserRegister());

    };
    const handelEditClick = () => {
        dispatch(lockForUserEdit());
    };
    const handelSaveEditedClick = () => {
        // dispatch(updateUser(formik.values.emploeeId, {
        //     name: formik.values.name,
        //     surname: formik.values.surname,
        //     email: formik.values.email,
        //     password: formik.values.password,
        //     roles: formik.values.roles
        // }));

        dispatch(unlockForUserEdit());
        dispatch(getUserList());
    };
    const handelCancelEditedClick = () => {
        dispatch(unlockForUserEdit());
        dispatch(getUserList());
    };
    const handelSaveAddedClick = () => {
        // dispatch(registerUser({
        //     name: formik.values.name,
        //     surname: formik.values.surname,
        //     email: formik.values.email,
        //     password: formik.values.password,
        //     roles: formik.values.roles

        // }));
        dispatch(unlockForUserEdit());
        dispatch(getUserList());
    };
    const handelCancelAddedClick = () => {
        dispatch(unlockForUserRegister());
        dispatch(getUserList());
    };

    const insertsSelected = () => {
        return managedUserEditPromise.isSelected || managedUserRegisterPromise.isSelected ? true : false;
    };


    return (
        <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
            <Paper sx={{
                width: '100%',
                height: 320,
            }}>
                <Box
                    display="flex"
                    flexDirection='row'
                    width='100%'
                    height='100%'
                >

                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        width="7%"
                        spacing={4} >
                        {existsManagedUser() && (
                            <Avatar
                                width="100%"
                                height="100%"
                                {...stringAvatar(managedUser.name ? managedUser.name : 'X', managedUser.surname ? managedUser.surname : 'Y')} />
                        )}
                    </Stack>

                    <Box
                        display='flex'
                        width='30%'
                        flexDirection='column'
                        alignContent='space-around'
                    >
                        <TextField
                            name='emploeeId'
                            id='emploeeId'
                            label={EMPLOEE_ID}
                            variant='outlined'
                            size="small"
                            placeholder={EMPLOEE_ID}
                            value={formik.values.emploeeId}
                            onChange={formik.handleChange}
                            helperText={formik.touched.emploeeId && formik.errors.emploeeId}
                            error={formik.touched.emploeeId && Boolean(formik.errors.emploeeId)}
                            disabled={true}
                            sx={{
                                marginTop: '1rem'
                            }}
                        />
                        <TextField
                            name='name'
                            id='name'
                            label={EMPLOEE_NAME}
                            variant='outlined'
                            size="small"
                            placeholder={EMPLOEE_NAME}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            helperText={formik.touched.name && formik.errors.name}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            disabled={!insertsSelected()}
                            sx={{
                                marginTop: '1rem'
                            }}

                        />
                        <TextField
                            name='surname'
                            id='surname'
                            label={EMPLOEE_SURNAME}
                            variant='outlined'
                            size="small"
                            placeholder={EMPLOEE_SURNAME}
                            value={formik.values.surname}
                            onChange={formik.handleChange}
                            helperText={formik.touched.surname && formik.errors.surname}
                            error={formik.touched.surname && Boolean(formik.errors.surname)}
                            disabled={!insertsSelected()}
                            sx={{
                                marginTop: '1rem'
                            }}

                        />
                        <TextField
                            name='email'
                            id='email'
                            label={EMPLOEE_EMAIL}
                            variant='outlined'
                            size="small"
                            placeholder={EMPLOEE_EMAIL}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            helperText={formik.touched.email && formik.errors.email}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            disabled={!insertsSelected()}
                            sx={{
                                marginTop: '1rem'
                            }}

                        />
                        <TextField
                            name='password'
                            id='password'
                            label={EMPLOEE_PASSWORD}
                            variant='outlined'
                            size="small"
                            placeholder={EMPLOEE_PASSWORD}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            helperText={formik.touched.password && formik.errors.npassword}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            sx={{
                                marginTop: '1rem'
                            }}
                            disabled={!insertsSelected()}
                        />
                    </Box>
                    <Box
                        width='40%'
                        display='flex'
                    >{`${EMPLOEE_ROLES}:  `}
                        <FormControlLabel disabled={!insertsSelected()} control={<Checkbox checked={managedUserHasRole(ADMIN)} name={ADMIN} onChange={handleCheckboxClick} />} label={ROLE_ADMIN} />
                        <FormControlLabel disabled={!insertsSelected()} control={<Checkbox checked={managedUserHasRole(REVIEWER)} name={REVIEWER} onChange={handleCheckboxClick} />} label={ROLE_REVIEWER} />
                        <FormControlLabel disabled={!insertsSelected()} control={<Checkbox checked={managedUserHasRole(REVIEWER_MANAGER)} name={REVIEWER_MANAGER} onChange={handleCheckboxClick} />} label={ROLE_REVIEWER_MANAGER} />
                        <FormControlLabel disabled={!insertsSelected()} control={<Checkbox checked={managedUserHasRole(REVIEWED_ISA)} name={REVIEWED_ISA} onChange={handleCheckboxClick} />} label={ROLE_REVIEWED_ISA} />
                    </Box>
                    {managedUserEditPromise.isSelected && (
                        <Box>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                sx={{
                                    marginTop: '2rem'
                                }}
 //                               onClick={handelSaveEditedClick}
                            >
                                {SAVE}ed
                            </Button>
                            <Button
                                type='reset'
                                variant='contained'
                                color='primary'
                                sx={{
                                    marginTop: '2rem'
                                }}
                                onClick={handelCancelEditedClick}
                            >
                                {CANCEL}ed
                            </Button>
                        </Box>
                    )}
                    {managedUserRegisterPromise.isSelected && (
                        <Box>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                sx={{
                                    marginTop: '2rem'
                                }}
 //                               onClick={handelSaveAddedClick}
                            >
                                {SAVE}
                            </Button>
                            <Button
                                type='reset'
                                variant='contained'
                                color='primary'
                                sx={{
                                    marginTop: '2rem'
                                }}
                                onClick={handelCancelAddedClick}
                            >
                                {CANCEL}
                            </Button>
                        </Box>
                    )}
                    {!insertsSelected() && (
                        <Box>
                            <Button
                                type='reset'
                                variant='contained'
                                color='primary'
                                sx={{
                                    marginTop: '2rem'
                                }}
                                onClick={handelAddClick}
                            >
                                {ADD}
                            </Button>
                            <Button
                                type='reset'
                                variant='contained'
                                color='primary'
                                disabled={!existsManagedUser()}
                                sx={{
                                    marginTop: '2rem'
                                }}
                                onClick={handelEditClick}
                            >
                                {EDIT}
                            </Button>
                        </Box>
                    )}
                </Box>
            </Paper>
        </form>
    )
}
export default UserSelectedItem