import React from 'react';
import { Box } from '@mui/material';
import ApplicationFilter from './ApplicationFilter';


const ApplicationContainer = () => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
        }}>
            <ApplicationFilter />
            <Box sx={{
                width: '80%'
            }}>
                Display all applications.
            </Box>

        </Box>
    );
}

export default ApplicationContainer;

