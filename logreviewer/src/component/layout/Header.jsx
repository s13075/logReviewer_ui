import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography } from '@mui/material';
import {
    USER_MANAGEMENT_PAGE,
    REVIEW_PAGE,
    JUSTIFICATION_PAGE,
    LOGOUT
} from '../../config/names_PL';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { getUserObjectSelector, hasUserSelector, getUserRolesSelector } from '../../module/user/userSelector';
import { logoutAction } from '../../module/user/userAction';
import { stringAvatar } from '../../module/user/userAvatar';

const localMenuOptions = [
    {
        name: REVIEW_PAGE,
        path: '/review',
        roles: ['REVIEWER', 'REVIEWER_MANAGER']
    },
    {
        name: JUSTIFICATION_PAGE,
        path: '/justification',
        roles: ['REVIEWER', 'REVIEWED_ISA', 'REVIEWER_MANAGER']
    },
    {
        name: USER_MANAGEMENT_PAGE,
        path: '/userManagement',
        roles: ['ADMIN']
    }
];

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const user = useSelector(getUserObjectSelector);
    const hasUser = useSelector(hasUserSelector);
    const userRoles = useSelector(getUserRolesSelector);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = path => {
        navigate(path);
    };

    const handleCloseUserMenu = (event) => {
        dispatch(logoutAction());
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">

            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display:  'flex' ,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGREVIEWER
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        {
                            localMenuOptions.map(option => {
                                if (option.roles.some(role => userRoles.includes(role))) {
                                    return (
                                        <Button key={option.name} onClick={() => handleCloseNavMenu(option.path)}
                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                        >
                                            {option.name}
                                        </Button>
                                    );
                                }
                                return null;
                            })
                        }
                    </Box>
                    {hasUser && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar {...stringAvatar(user.name, user.surname)} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem key='logout' onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{LOGOUT}</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;