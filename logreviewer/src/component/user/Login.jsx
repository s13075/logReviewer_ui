import React from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';

const Login = () => {
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
                        Login Page
                    </Typography>
                    <TextField
                        name='email'
                        id='email'
                        label='enter email adress'
                        variant='outlined'
                        placeholder='enter email adress'
                        sx={{
                            marginTop: '2rem'
                        }}
                    />
                    <TextField
                        name='password'
                        id='password'
                        label='enter password'
                        variant='outlined'
                        placeholder='enter password'
                        sx={{
                            marginTop: '2rem'
                        }}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
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