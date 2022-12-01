import React from 'react';
import {Box} from '@mui/material';
import ApplicationFilter from './ApplicationFilter';
import styles from './ApplicationStyles';

const ApplicationContainer = () => {
    const classes = styles();
    return(
        <Box className={classes.applicationContainer}>
            <ApplicationFilter />
            <Box className={classes.applicationList}>
                Display all applications.
            </Box>

        </Box>
    );
}

export default ApplicationContainer;

