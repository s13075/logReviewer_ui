import React from 'react';
import { 
    ENTER_YOUR_PASSWORD,
    PASSWORD_IS_REQUIRED,
    PASSWORD_MINIMUM_LENGHT ,
    ENTER_YOUR_EMAIL,
    EMAIL_IS_REQUIRED,
    EMAIL_SHOULD_BE_VALID,
    ENTER_YOUR_NAME,
    NAME_IS_REQUIRED,
    NAME_MINIMUM_LENGHT,
    ENTER_YOUR_SURNAME,
    SURNAME_IS_REQUIRED,
    SURNAME_MINIMUM_LENGHT
} from './names_PL';
import * as yup from 'yup';

export const validationSchema = yup.object({
    email: yup
        .string(ENTER_YOUR_EMAIL)
        .email(EMAIL_IS_REQUIRED)
        .required(EMAIL_SHOULD_BE_VALID),
    password: yup
        .string(ENTER_YOUR_PASSWORD)
        .min(7, PASSWORD_MINIMUM_LENGHT)
        .required(PASSWORD_IS_REQUIRED),
    name: yup
        .string(ENTER_YOUR_NAME)
        .min(3, NAME_MINIMUM_LENGHT)
        .required(NAME_IS_REQUIRED),
    surname: yup
        .string(ENTER_YOUR_SURNAME)
        .min(3, SURNAME_MINIMUM_LENGHT)
        .required(SURNAME_IS_REQUIRED),
});

