import React from 'react';
import Proptypes from 'prop-types';
import { Box } from "@mui/material";
import ReviewedApplicationListItem from './ReviewedApplicationListItem'

const propTypes = {
    reviewedApplications: Proptypes.arrayOf({
        id: Proptypes.string.isRequired,
        name: Proptypes.string.isRequired,
        inventoryNo: Proptypes.number.isRequired,
        piiData: Proptypes.bool.isRequired,
        criticalFunction: Proptypes.bool.isRequired,
        financialOperation: Proptypes.bool.isRequired,
        supportContactGroup: Proptypes.string.isRequired,
        smeEmployee: Proptypes.string.isRequired,
    }).isRequired,
};

const ReviewedApplicationList = ({reviewedApplications}) => {
    return(
        <Box
            ml = {2}
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