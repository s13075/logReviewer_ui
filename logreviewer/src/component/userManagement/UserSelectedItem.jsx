import React from 'react';
import {
    Typography,
    Box,
    Paper,
    Avatar,
    Stack,
    FormControlLabel,
    Checkbox,
    TextField
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
    ROLE_REVIEWED_ISA
} from '../../config/names_PL';
import {
    ADMIN,
    REVIEWED_ISA,
    REVIEWER,
    REVIEWER_MANAGER
} from '../../config/constants';
import { validationSchema }from '../../config/validation';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { getManagedUserSelector, getManagedUserPromiseSelector } from '../../module/manegedUser/managedUserSelector';
import { stringAvatar } from '../../module/user/userAvatar';

const UserSelectedItem = () => {

    const managedUserPromise = useSelector(getManagedUserPromiseSelector);
    const managedUser = useSelector(getManagedUserSelector);

    const existsManagedUser = () =>{
        return managedUser ? true : false;
    }

    const formikValues = {
        name: managedUser ? managedUser.name : '',
        surname: managedUser ? managedUser.surname : '',
        email: managedUser ? managedUser.email : '',
        emploeeId: managedUser ? managedUser.emploeeId : '',
        password: managedUser ? managedUser.password : ''
    };

    const formik = useFormik({
        initialValues: formikValues,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
 //            dispatch(loginAction(values.email, values.password))
        }
    });

    const managedUserHasRole = (roleNamep) => {
        let hasRole = false
        managedUser ?
            managedUser.roles.some(role => role.roleName === roleNamep) ? hasRole=true : hasRole=false
            : hasRole = false
        return hasRole;
    };


    return (
        <Paper sx={{
            width: '100%',
            height: 300,
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
                        {existsManagedUser() &&(
                        <Avatar
                        width="100%"
                        height="100%"
                        {...stringAvatar(managedUser.name, managedUser.surname)} />
                        )}
                    
                </Stack>

                <Box
                    display='flex'
                    width='30%'
                    flexDirection='column'
                    alignContent='space-around'
                >
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
                        sx={{
                            marginTop: '1rem'
                        }}

                    />
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
                    />
                </Box>
                <Box
                    width='40%'
                    display='flex'
                >{`${EMPLOEE_ROLES}:  `}
                    <FormControlLabel disabled control={<Checkbox checked={managedUserHasRole(ADMIN)}/>} label={ROLE_ADMIN} />
                    <FormControlLabel disabled control={<Checkbox checked={managedUserHasRole(REVIEWER)}/>} label={ROLE_REVIEWER} />
                    <FormControlLabel disabled control={<Checkbox checked={managedUserHasRole(REVIEWER_MANAGER)}/>} label={ROLE_REVIEWER_MANAGER} />
                    <FormControlLabel disabled control={<Checkbox checked={managedUserHasRole(REVIEWED_ISA)}/>} label={ROLE_REVIEWED_ISA} />
                </Box>
            </Box>
        </Paper>
    )
}
export default UserSelectedItem