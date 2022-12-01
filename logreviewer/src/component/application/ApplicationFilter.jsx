import React from 'react';
import {Box, Paper} from '@mui/material';
import styles from './ApplicationStyles';

const ApplicationFilter = () => {
    const classes = styles();
    
    return(
        <Box className={classes.applicationFilter}>
            <Paper className={classes.applicationFilterPaper}>
                Application filter.
            </Paper>
        </Box>

    );
}

export default ApplicationFilter;