import React from 'react';
import {
    ENTER_YOUR_PASSWORD,
    PASSWORD_IS_REQUIRED,
    PASSWORD_MINIMUM_LENGHT,
    ENTER_YOUR_EMAIL,
    EMAIL_IS_REQUIRED,
    EMAIL_SHOULD_BE_VALID,
    ENTER_YOUR_NAME,
    NAME_IS_REQUIRED,
    NAME_MINIMUM_LENGHT,
    ENTER_YOUR_SURNAME,
    SURNAME_IS_REQUIRED,
    SURNAME_MINIMUM_LENGHT,
    COMMENT_MINIMUM_LENGHT,
    COMMENT_IS_REQUIRED,
    INVALID_STATUS,
    STATUS_IS_REQUIRED,
    CONFIRM_YOUR_PASSWORD,
    CONFIRM_PASSWORD_IS_REQUIRED,
    PASSWORDS_DO_NOT_MATCH
} from './names_PL';
import * as yup from 'yup';

export const validationSchema = yup.object({
    email: yup
        .string(ENTER_YOUR_EMAIL)
        .email(EMAIL_SHOULD_BE_VALID)
        .required(EMAIL_IS_REQUIRED),
    password: yup
        .string(ENTER_YOUR_PASSWORD)
        .required(PASSWORD_IS_REQUIRED),
});

export const userManagementValidationSchema = yup.object({
    email: yup
        .string(ENTER_YOUR_EMAIL)
        .email(EMAIL_SHOULD_BE_VALID)
        .required(EMAIL_IS_REQUIRED),
    password: yup
        .string(ENTER_YOUR_PASSWORD)
        .min(8, PASSWORD_MINIMUM_LENGHT)
        .required(PASSWORD_IS_REQUIRED),
    passwordRepeat: yup
        .string(CONFIRM_YOUR_PASSWORD)
        .oneOf([yup.ref('password'), null], PASSWORDS_DO_NOT_MATCH)
        .required(CONFIRM_PASSWORD_IS_REQUIRED),
    name: yup
        .string(ENTER_YOUR_NAME)
        .min(3, NAME_MINIMUM_LENGHT)
        .required(NAME_IS_REQUIRED),
    surname: yup
        .string(ENTER_YOUR_SURNAME)
        .min(3, SURNAME_MINIMUM_LENGHT)
        .required(SURNAME_IS_REQUIRED),
});

export const justificationValidationSchema = yup.object().shape({
    comment: yup
        .string()
        .min(20, COMMENT_MINIMUM_LENGHT)
        .required(COMMENT_IS_REQUIRED),
    curentStatus: yup
        .string()
        .oneOf(['PENDING_ADMIN', 'PENDING_REVIEW', 'COMPLETE'], INVALID_STATUS)
        .required(STATUS_IS_REQUIRED),
});



