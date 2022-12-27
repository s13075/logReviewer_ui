import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom'
import { getUserPromiseSelector, getUserObjectSelector } from '../../module/user/userSelector';
import { getMenuOptions, getMenuOptionsPromise } from '../../module/menuOptions/menuOptionsSelector';
import MenuButtons from './MenuButtons';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const localMenuOptions = [
    {
        name: "Przegląd",
        path: '/review'
    }, {
        name: 'Wyjaśnienie',
        path: '/justification'
    }, {
        name: 'Zarządzanie użytkownikami',
        path: '/userManagement'
    }
]


const Header = () => {

    const dispatch = useDispatch();


    const menuOptions = useSelector(getMenuOptions);
    const menuOptionsavailibility = useSelector(getMenuOptionsPromise);

    const user = useSelector(getUserObjectSelector);
    const userPromise = useSelector(getUserPromiseSelector);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    function userIsAdmin() {
        if (typeof user === 'undefined' || user === null) {
            return false;
        } else {
            if (user.roles.some(role => role.roleName ==='ADMIN')) {
                return true;
            } else {
                return false;
            };
        };
    };
    const userIsISA = () => {
        if (typeof user === 'undefined' || user === null) {
            return false;
        } else {
            if (user.roles.some(role => role.roleName ==='REVIEWED_ISA')) {
                return true;
            } else {
                return false;
            };
        };
    };
    const userIsReviewer = () => {
        if (typeof user === 'undefined' || user === null) {
            return false;
        } else {
            if (user.roles.some(role => role.roleName ==='REVIEWER') ||
            user.roles.some(role => role.roleName ==='REVIEWER_MANAGER')) {
                return true;
            } else {
                return false;
            };
        };

    };
    console.log(user)
    console.log(userIsAdmin());
    console.log(userIsISA());
    console.log(userIsReviewer());




    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">

            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    {console.log(user)}
                    {menuOptionsavailibility.isAvailible && (

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {
                                    menuOptions.map((menuOption) => (
                                        <Link key={menuOption.name} to={menuOption.path}>
                                            <MenuItem key={menuOption.name} onClick={handleCloseNavMenu}>
                                                <Typography textAlign="center">{menuOption.name}</Typography>
                                            </MenuItem>
                                        </Link>
                                    ))
                                }
                            </Menu>

                        </Box>
                    )}
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {userIsReviewer() && (
                            <Link key={localMenuOptions[0].name} to={localMenuOptions[0].path}>
                                <Button key={localMenuOptions[0].name} onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {localMenuOptions[0].name}
                                </Button>
                            </Link>

                        )}
                        {userIsISA() && (
                            <Link key={localMenuOptions[1].name} to={localMenuOptions[1].path}>
                                <Button key={localMenuOptions[1].name} onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {localMenuOptions[1].name}
                                </Button>
                            </Link>
                        )}
                        {userIsAdmin() && (
                            <Link key={localMenuOptions[2].name} to={localMenuOptions[2].path}>
                                <Button key={localMenuOptions[2].name} onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {localMenuOptions[2].name}
                                </Button>
                            </Link>
                        )}
                    </Box>
                    {menuOptionsavailibility.isAvailible && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;