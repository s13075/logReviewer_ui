import React, { useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../module/user/userAction';
import { getUserPromiseSelector } from '../../module/user/userSelector';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const Register = () => {


    return (
        <form autoComplete="off" noValidate>
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
                        Register Page
                    </Typography>

                </Paper>
            </Box>
        </form>
    );
};

export default Register;