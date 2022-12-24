import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';

// const propTypes = {
//     menuOptions: PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         path: PropTypes.string.isRequired,
//     }).isRequired,

// };

const MenuButtons = ({ menuOptions, handleCloseNavMenu }) => {
    if(menuOptions != null){
        return(
            
                    menuOptions.map((menuOption) => (
                        <Link key={menuOption.name} to={menuOption.path}>
                            <MenuItem key={menuOption.name} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">{menuOption.name}</Typography>
                            </MenuItem>
                        </Link>
                    ))
             
        );
    }else{
        return null;
    }
};

//MenuButtons.propTypes = propTypes;
export default MenuButtons;
