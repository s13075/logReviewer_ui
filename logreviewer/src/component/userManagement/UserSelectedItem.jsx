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
    ROLE_ADMIN,
    ROLE_REVIEWER,
    ROLE_REVIEWER_MANAGER,
    ROLE_REVIEWED_ISA
} from '../../config/names_PL';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { getManagedUserSelector, getManagedUserPromiseSelector } from '../../module/manegedUser/managedUserSelector';
import * as yup from 'yup';

const UserSelectedItem = () => {

    const managedUserPromise = useSelector(getManagedUserPromiseSelector);
    const managedUser = useSelector(getManagedUserSelector);

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }
    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(7, 'Password should have minimum 7 characters')
            .required('Password is required'),
    });


    const formik = useFormik({
        initialValues: {
            name: [managedUser ? managedUser.name : ''],
            surname: [managedUser ? managedUser.surname :''],
            email: [managedUser ? managedUser.email : ''],
            emploeeId: [managedUser ? managedUser.emploeeId : ''],
            password: [managedUser ? managedUser.password : '']
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            //           dispatch(loginAction(values.email, values.password))
        }
    });

    return (
        <Paper sx={{
            width: '100%',
            height: 160,
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
                    <Avatar
                        width="100%"
                        height="100%"
                        {...stringAvatar('Kent Dodds')} />
                </Stack>

                <Box
                    display='flex'
                    width='30%'
                    flexDirection='column'
                    alignContent='space-around'
                >
                    <TextField
                        name='email'
                        id='email'
                        label={EMPLOEE_NAME}
                        variant='outlined'
                        size="small"
                        placeholder={EMPLOEE_NAME}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        helperText={formik.touched.email && formik.errors.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}

                    />
                    <TextField
                        name='email'
                        id='email'
                        label={EMPLOEE_SURNAME}
                        variant='outlined'
                        size="small"
                        placeholder={EMPLOEE_SURNAME}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        helperText={formik.touched.email && formik.errors.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}

                    />
                    <TextField
                        name='email'
                        id='email'
                        label={EMPLOEE_ID}
                        variant='outlined'
                        size="small"
                        placeholder={EMPLOEE_ID}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        helperText={formik.touched.email && formik.errors.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}

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

                    />
                    {/* <Typography>{`${EMPLOEE_NAME}:`}</Typography>
                    <Typography>{`${EMPLOEE_SURNAME}:`}</Typography>
                    <Typography>{`${EMPLOEE_EMAIL}:`}</Typography>
                    <Typography>{`${EMPLOEE_ID}:`}</Typography> */}
                </Box>
                <Box
                    width='40%'
                    display='flex'
                >{`${EMPLOEE_ROLES}:  `}
                    <FormControlLabel disabled control={<Checkbox defaultChecked />} label={ROLE_ADMIN} />
                    <FormControlLabel disabled control={<Checkbox defaultChecked />} label={ROLE_REVIEWER} />
                    <FormControlLabel disabled control={<Checkbox defaultChecked />} label={ROLE_REVIEWER_MANAGER} />
                    <FormControlLabel disabled control={<Checkbox defaultChecked />} label={ROLE_REVIEWED_ISA} />

                </Box>
            </Box>
        </Paper>
    )
}
export default UserSelectedItem