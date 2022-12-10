import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Avatar, Typography } from '@mui/material';


const propTypes = {
    reviewedApplication: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        inventoryNo: PropTypes.number.isRequired,
        piiData: PropTypes.bool.isRequired,
        criticalFunction: PropTypes.bool.isRequired,
        financialOperation: PropTypes.bool.isRequired,
        supportContactGroup: PropTypes.string.isRequired,
        smeEmployee: PropTypes.string.isRequired,
    }).isRequired,
};

const ReviewedApplicationListItem = ({ reviewedApplication }) => {
    return (
        <Box mb={2}>
            <Paper 
                elevation = {2}
                sx={{
                    padding: '10px',
                    display: 'flex',
                    width: '80%'
                }}>
                <Avatar 
                    variant="square" 
                    sx={{
                        width: '180px',
                        height: '200px'
                    }}>
                {reviewedApplication.name}
                </Avatar>
                <Box
                    ml ={1}
                    >
                    <Typography variant="h5">{reviewedApplication.name}</Typography>
                    <Typography>{reviewedApplication.inventoryNo}</Typography>
                    <Typography>{reviewedApplication.piiData}</Typography>
                    <Typography>{reviewedApplication.criticalFunction}</Typography>
                    <Typography>{reviewedApplication.financialOperation}</Typography>
                    <Typography>{reviewedApplication.supportContactGroup}</Typography>
                    <Typography>{reviewedApplication.smeEmployee}</Typography>
                </Box>
            </Paper>
        </Box>

    );

};

ReviewedApplicationListItem.propTypes = propTypes;
export default ReviewedApplicationListItem;