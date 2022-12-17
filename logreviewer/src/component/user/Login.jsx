import React, { useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../module/user/userAction';
import { getUserPromiseSelector} from '../../module/user/userSelector';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should have minimum 8 characters')
        .required('Password is required'),
});

const Login = () => {
    const dispatch = useDispatch();
    const userPromise = useSelector(getUserPromiseSelector);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        if (userPromise.isErrorOcurred) {
            enqueueSnackbar('Incorrect email or password. Login failed!',{
                variant:'error'
            });
        } else if (userPromise.isFulfilled) {
            enqueueSnackbar('Login success!',{
                variant:'success'
            });
            navigate('/');
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
                        Login Page
                    </Typography>
                    <TextField
                        name='email'
                        id='email'
                        label='Enter email adress'
                        variant='outlined'
                        placeholder='Enter email adress'
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
                        label='Enter password'
                        variant='outlined'
                        placeholder='Enter password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        helperText={formik.touched.password && formik.errors.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        sx={{
                            marginTop: '2rem'
                        }}
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
                        Login
                    </Button>
                </Paper>
            </Box>
        </form>
    );
};

export default Login;