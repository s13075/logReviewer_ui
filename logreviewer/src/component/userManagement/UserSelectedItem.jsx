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
    CONFIRM_YOUR_PASSWORD,
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
import { userManagementValidationSchema } from '../../config/validation';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, unSelectUser, lockForUserRegister, lockForUserEdit, unlockForUserRegister, unlockForUserEdit, updateUserRoles, updateUser, getUserList } from '../../module/manegedUser/managedUserAction';
import {
    getManagedUserRegisterPromiseSelector,
    getManagedUserSelector,
    getManagedUserPromiseSelector,
    getManagedUserEditPromiseSelector,
    getManagedUserRolesSelector,
    hasManagedUserSelector
} from '../../module/manegedUser/managedUserSelector';
import { stringAvatar } from '../../module/user/userAvatar';

const UserSelectedItem = () => {

    const dispatch = useDispatch();

    const userPossibleRoles = [
        'REVIEWER',
        'REVIEWED_ISA',
        'ADMIN',
        'REVIEWER_MANAGER'
    ]

    const managedUserPromise = useSelector(getManagedUserPromiseSelector);
    const managedUser = useSelector(getManagedUserSelector);
    const managedUserEditPromise = useSelector(getManagedUserEditPromiseSelector);
    const managedUserRegisterPromise = useSelector(getManagedUserRegisterPromiseSelector);

    const managedUserRoles = useSelector(getManagedUserRolesSelector);

    // console.log('managedUserRoles');
    // console.log(managedUserRoles);

    const hasManagedUser = useSelector(hasManagedUserSelector)

    const formikValues = {
        name: managedUser ? managedUser.name : '',
        surname: managedUser ? managedUser.surname : '',
        email: managedUser ? managedUser.email : '',
        emploeeId: managedUser ? managedUser.emploeeId : '',
        password: managedUser ? managedUser.password : '',
        passwordRepeat: managedUser ? managedUser.password : '',
        roles: managedUser ? managedUserRoles : []
    };

    const formik = useFormik({
        initialValues: formikValues,
        enableReinitialize: true,
        validationSchema: userManagementValidationSchema,
        onSubmit: (values) => {
            if (!managedUserEditPromise.isSelected) {
                dispatch(registerUser(values));

            } else {
                dispatch(updateUser(values.emploeeId, values));

            }
        }
    });

    const managedUserHasRole = (roleNamep) => {

        // console.log('roleNamep');      
        // console.log(roleNamep);
        // console.log('formik.values.roles');
        // console.log(formik.values.roles);

        let hasRole = false
        managedUser ?
            formik.values.roles.some(role => role === roleNamep) ? hasRole = true : hasRole = false
            : hasRole = false
        return hasRole;

    };

    const handleCheckboxClick = (e, role) => {

        if (e.target.checked) {
            formik.setFieldValue('roles', [...formik.values.roles, role]);
        } else {
            formik.setFieldValue(
                'roles',
                formik.values.roles.filter(r => r !== role)
            );

            // if(formik.values.roles.some(role => role === event.target.name)){

            //     formik.values.roles.splice(formik.values.roles.indexOf(role => role === event.target.name), 1)
            // }else{
            //     formik.values.roles.push(event.target.name);
        }
        // console.log(formik.values.roles)
    }

    const handelAddClick = () => {
        dispatch(unSelectUser());
        dispatch(lockForUserRegister());

    };
    const handelEditClick = () => {
        dispatch(lockForUserEdit());
    };

    const handelCancelEditedClick = () => {
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
                        {hasManagedUser && (
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
                            helperText={formik.touched.password && formik.errors.password}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            type="password"
                            sx={{
                                marginTop: '1rem'
                            }}
                            disabled={!insertsSelected()}
                        />
                        <TextField
                            name='passwordRepeat'
                            id='passwordRepeat'
                            label={CONFIRM_YOUR_PASSWORD}
                            variant='outlined'
                            size="small"
                            placeholder={CONFIRM_YOUR_PASSWORD}
                            value={formik.values.passwordRepeat}
                            onChange={formik.handleChange}
                            helperText={formik.touched.passwordRepeat && formik.errors.passwordRepeat}
                            error={formik.touched.passwordRepeat && Boolean(formik.errors.passwordRepeat)}
                            type="password"
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
                        {/* <FormControlLabel disabled={!insertsSelected()} control={<Checkbox checked={managedUserHasRole(ADMIN)} name={ADMIN} onChange={handleCheckboxClick} />} label={ROLE_ADMIN} />
                        <FormControlLabel disabled={!insertsSelected()} control={<Checkbox checked={managedUserHasRole(REVIEWER)} name={REVIEWER} onChange={handleCheckboxClick} />} label={ROLE_REVIEWER} />
                        <FormControlLabel disabled={!insertsSelected()} control={<Checkbox checked={managedUserHasRole(REVIEWER_MANAGER)} name={REVIEWER_MANAGER} onChange={handleCheckboxClick} />} label={ROLE_REVIEWER_MANAGER} />
                        <FormControlLabel disabled={!insertsSelected()} control={<Checkbox checked={managedUserHasRole(REVIEWED_ISA)} name={REVIEWED_ISA} onChange={handleCheckboxClick} />} label={ROLE_REVIEWED_ISA} />
                     */}
                        {userPossibleRoles.map(role =>
                            <FormControlLabel
                                disabled={!insertsSelected()}
                                label={role}
                                key={role}
                                control={

                                    <Checkbox
                                        checked={managedUserHasRole(role)}
                                        name={role}
                                        onChange={e => {
                                            // Update the roles field in the form's values when the checkbox is clicked
                                            console.log(e)
                                            if (e.target.checked) {
                                                formik.setFieldValue("roles", [...formik.values.roles, role]);
                                            } else {
                                                formik.setFieldValue(
                                                    "roles",
                                                    formik.values.roles.filter(r => r !== role)
                                                );
                                            }
                                        }}
                                    />
                                }
                            />
                        )


                        }



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
                                disabled={!hasManagedUser}
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