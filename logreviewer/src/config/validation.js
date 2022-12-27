import React from 'react';
import * as yup from 'yup';

export const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(7, 'Password should have minimum 7 characters')
        .required('Password is required'),
});

