import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Avatar, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';


const propTypes = {
    reviewedApplication: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        inventoryNo: PropTypes.string.isRequired,
        piiData: PropTypes.bool.isRequired,
        criticalFunction: PropTypes.bool.isRequired,
        financialOperation: PropTypes.bool.isRequired,
        supportContactGroup: PropTypes.string.isRequired,
        smeEmployee: PropTypes.string.isRequired,
    }).isRequired,
};

const ReviewedApplicationListItem = ({ reviewedApplication }) => {
    const navigate = useNavigate();
    return (
        <Box mb={2} onClick={() => navigate('/reviewChanges')}>
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
                    }}
                    onClick={() => navigate('/reviewChanges')}
                    >
                {reviewedApplication.name}
                </Avatar>
                <Box
                    ml ={1}
                    onClick={() => navigate('/reviewChanges')}
                    >
                    <Typography>{reviewedApplication.name}</Typography>
                    <Typography>{reviewedApplication.id}</Typography>
                    <Typography>{reviewedApplication.inventoryNo}</Typography>
                    {/*<Typography>{reviewedApplication.piiData}</Typography>
                    <Typography>{reviewedApplication.criticalFunction}</Typography>
                    <Typography>{reviewedApplication.financialOperation}</Typography>*/}
                    <Typography>{reviewedApplication.supportContactGroup}</Typography>
                    <Typography>{reviewedApplication.smeEmployee}</Typography>
                </Box>
            </Paper>
        </Box>

    );

};

ReviewedApplicationListItem.propTypes = propTypes;
export default ReviewedApplicationListItem;