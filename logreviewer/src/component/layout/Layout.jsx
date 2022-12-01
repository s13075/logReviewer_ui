import React from'react';
import {Box} from '@mui/material';
import Header from './Header'
import PropTypes from 'prop-types'


const propTypes = {
    children: PropTypes.node.isRequired 
};

const Layout = ({ children }) => {
    return (
        <Box>
            <Box>
                <Header/>
            </Box>
            <Box mt={8} ml={5}>
                {children} 
            </Box>
        </Box>
    );
};

Layout.propTypes = propTypes;
export default Layout;