import React, { useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../module/user/userAction';
import { getUserPromiseSelector, getUserRolesSelector} from '../../module/user/userSelector';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { validationSchema } from '../../config/validation';
import { 
    LOGIN_FAILED_SNACKBAR,
    LOGIN_SUCCESS_SNACKBAR,
    ENTER_EMAIL_ADRESS,
    ENTER_PASSWORD,
    LOGIN,
    LOGIN_PAGE
 } from '../../config/names_PL';

const Login = () => {
    const dispatch = useDispatch();
    const userPromise = useSelector(getUserPromiseSelector);
    const userRoles = useSelector(getUserRolesSelector);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const redirectWhere = (userRoles) => {
        const redirectPath = {
            ADMIN: '/userManagement',
            REVIEWER: '/review',
            REVIEWER_MANAGER: '/review',
            REVIEWED_ISA: '/justification'
        };       
        const foundRole = userRoles.find(role => redirectPath[role]);
        return redirectPath[foundRole];
    };

    useEffect(() => {
        if (userPromise.isErrorOcurred) {
            enqueueSnackbar(LOGIN_FAILED_SNACKBAR,{
                variant:'error'
            });
        } else if (userPromise.isFulfilled) {

            enqueueSnackbar(LOGIN_SUCCESS_SNACKBAR,{
                variant:'success'
            });

            console.log(redirectWhere(userRoles));
            navigate(redirectWhere(userRoles));
        }
    }, [userPromise,enqueueSnackbar,navigate])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(loginAction(values.email, values.password))
        }
    });

    return (
        <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px'
                    }}
                >
                    <Typography variant='h4'>
                        {LOGIN_PAGE}
                    </Typography>
                    <TextField
                        name='email'
                        id='email'
                        label= {ENTER_EMAIL_ADRESS}
                        variant='outlined'
                        placeholder= {ENTER_EMAIL_ADRESS}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        helperText={formik.touched.email && formik.errors.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        sx={{
                            marginTop: '2rem'
                        }}
                    />
                    <TextField
                        name='password'
                        id='password'
                        label= {ENTER_PASSWORD}
                        variant='outlined'
                        placeholder= {ENTER_PASSWORD}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        helperText={formik.touched.password && formik.errors.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        sx={{
                            marginTop: '2rem'
                        }}
                        type= 'password'
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        disabled = {userPromise.isPending}
                        sx={{
                            marginTop: '2rem'
                        }}
                    >
                        {LOGIN}
                    </Button>
                </Paper>
            </Box>
        </form>
    );
};

export default Login;