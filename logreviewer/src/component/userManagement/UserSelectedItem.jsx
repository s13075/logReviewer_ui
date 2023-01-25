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
    ROLE_ADMIN,
    ROLE_REVIEWED_ISA,
    ROLE_REVIEWER,
    ROLE_REVIEWER_MANAGER,
} from '../../config/names_PL';
import {

} from '../../config/constants';
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
import { userManagementValidationSchema } from '../../config/validation';


const UserSelectedItem = () => {
    const dispatch = useDispatch();
    const userPossibleRoles = [
        ['REVIEWER', ROLE_REVIEWER],
        ['REVIEWED_ISA', ROLE_REVIEWED_ISA],
        ['ADMIN', ROLE_ADMIN],
        ['REVIEWER_MANAGER', ROLE_REVIEWER_MANAGER],
      ];

    const managedUserPromise = useSelector(getManagedUserPromiseSelector);
    const managedUser = useSelector(getManagedUserSelector);
    const managedUserEditPromise = useSelector(getManagedUserEditPromiseSelector);
    const managedUserRegisterPromise = useSelector(getManagedUserRegisterPromiseSelector);
    const managedUserRoles = useSelector(getManagedUserRolesSelector);
    const hasManagedUser = useSelector(hasManagedUserSelector)
    

    const insertsSelected = () => {
        return managedUserEditPromise.isSelected || managedUserRegisterPromise.isSelected ? true : false;
    };

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

    const fields = [
        {
            name: 'emploeeId',
            id: 'emploeeId',
            label: EMPLOEE_ID,
            placeholder: EMPLOEE_ID,
            disabled: true,
        },
        {
            name: 'name',
            id: 'name',
            label: EMPLOEE_NAME,
            placeholder: EMPLOEE_NAME,
            disabled: !insertsSelected(),
        },
        {
            name: 'surname',
            id: 'surname',
            label: EMPLOEE_SURNAME,
            placeholder: EMPLOEE_SURNAME,
            disabled: !insertsSelected(),
        },
        {
            name: 'email',
            id: 'email',
            label: EMPLOEE_EMAIL,
            placeholder: EMPLOEE_EMAIL,
            disabled: !insertsSelected(),
        },
        {
            name: 'password',
            id: 'password',
            label: EMPLOEE_PASSWORD,
            placeholder: EMPLOEE_PASSWORD,
            type: 'password',
            disabled: !insertsSelected(),
        },
        {
            name: 'passwordRepeat',
            id: 'passwordRepeat',
            label: CONFIRM_YOUR_PASSWORD,
            placeholder: CONFIRM_YOUR_PASSWORD,
            type: 'password',
            disabled: !insertsSelected(),
        }
    ];
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
    const buttons = [{
        condition: managedUserEditPromise.isSelected,
        buttons: [
            {
                key:'SaveEdit',
                type: 'submit',
                color: 'primary',
                label: SAVE,
            },
            {
                key:'CancelEdit',
                type: 'reset',
                color: 'secondary',
                label: CANCEL,
                onClick: handelCancelEditedClick,
            },
        ],
    },
    {
        condition: managedUserRegisterPromise.isSelected,
        buttons: [
            {
                key:'SaveRegiser',
                type: 'submit',
                color: 'primary',
                label: SAVE,
            },
            {
                key:'CancelRegiser',
                type: 'reset',
                color: 'secondary',
                label: CANCEL,
                onClick: handelCancelAddedClick,
            },
        ],
    },
    {
        condition: !insertsSelected(),
        buttons: [
            {
                key: 'add',
                type: 'reset',
                color: 'success',
                label: ADD,
                onClick: handelAddClick,
            },
            {
                key: 'edit',
                type: 'reset',
                color: 'warning',
                label: EDIT,
                onClick: handelEditClick,
                disabled: !hasManagedUser,
            },
        ],
    },
    ];

    const managedUserHasRole = (roleNamep) => {
        let hasRole = false
        managedUser ?
            formik.values.roles.some(role => role === roleNamep) ? hasRole = true : hasRole = false
            : hasRole = false
        return hasRole;

    };

    return (
        <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
            <Paper sx={{
                width: '100%',
                height: 350,
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
                        {/* <UserForm/> */}
                        {fields.map(field => (
                            <TextField
                                name={field.name}
                                key={field.id}
                                label={field.label}
                                variant="outlined"
                                size="small"
                                placeholder={field.placeholder}
                                value={formik.values[field.name]}
                                onChange={formik.handleChange}
                                helperText={formik.touched[field.name] && formik.errors[field.name]}
                                error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                                disabled={field.disabled}
                                sx={{
                                    marginTop: '1rem',
                                }}
                                type={field.type}
                            />
                        ))}

                    </Box>
                    <Box width='20%' display='flex' flexDirection='column' ml={5} mt={9}>
                        <Box>{EMPLOEE_ROLES}</Box>
                        {userPossibleRoles.map(role =>
                            <FormControlLabel
                                disabled={!insertsSelected()}
                                label={role[1]}
                                key={role[0]}
                                control={
                                    <Checkbox
                                        checked={managedUserHasRole(role[0])}
                                        name={role[0]}
                                        onChange={e => {
                                            console.log(e)
                                            if (e.target.checked) {
                                                formik.setFieldValue("roles", [...formik.values.roles, role[0]]);
                                            } else {
                                                formik.setFieldValue(
                                                    "roles",
                                                    formik.values.roles.filter(r => r !== role[0])
                                                );
                                            }
                                        }}
                                    />
                                }
                            />
                        )
                        }
                    </Box>
                    {buttons.map(buttonSet => {
                        if (buttonSet.condition) {
                            return (
                                <Box
                                sx={{
                                    height:'100%',
                                    display: 'flex',
                                    flexDirection:'column',
                                    justifyContent: 'center',
                                  }}
                                >
                                    {buttonSet.buttons.map(button => (
                                        <Button
                                            key={button.key}
                                            type={button.type}
                                            variant='contained'
                                            color={button.color}
                                            sx={{
                                                marginLeft: '1rem',
                                                marginTop: '1rem',
                                                fontSize: '1.2rem',
                                            }}
                                            onClick={button.onClick}
                                            disabled={button.disabled}
                                        >
                                            {button.label}
                                        </Button>
                                    ))}
                                </Box>
                            );
                        }
                    })}
                </Box>
            </Paper>
        </form>
    )
}
export default UserSelectedItem