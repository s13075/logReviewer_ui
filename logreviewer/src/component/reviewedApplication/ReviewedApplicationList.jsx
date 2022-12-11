import React from 'react';
import PropTypes from 'prop-types';
import { Box } from "@mui/material";
import ReviewedApplicationListItem from './ReviewedApplicationListItem'

const propTypes = {
    reviewedApplications: PropTypes.arrayOf(
        PropTypes.shape(({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            inventoryNo: PropTypes.string.isRequired,
            piiData: PropTypes.bool.isRequired,
            criticalFunction: PropTypes.bool.isRequired,
            financialOperation: PropTypes.bool.isRequired,
            supportContactGroup: PropTypes.string.isRequired,
            smeEmployee: PropTypes.string.isRequired,
        }).isRequired,
        )).isRequired,
};

const ReviewedApplicationList = ({ reviewedApplications }) => {
    return (
        <Box
            ml={2}
            sx={{
                width: '80%'
            }}>
            {reviewedApplications.map((reviewedApplication) => (
                <ReviewedApplicationListItem reviewedApplication={reviewedApplication} key={reviewedApplication.id} />
            ))}
        </Box>
    );
};

ReviewedApplicationList.propTypes = propTypes;

export default ReviewedApplicationList;