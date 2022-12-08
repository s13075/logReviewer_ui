import React from 'react';
import Proptypes from 'prop-types';
import { Box } from "@mui/material";

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
        <Box sx={{
            width: '80%'
        }}>
            {reviewedApplications.map((reviewedApplication) => (
            <div key={reviewedApplication.id}>{reviewedApplication.id}</div>
            ))}
        </Box>
    );
};

ReviewedApplicationList.propTypes = propTypes;

export default ReviewedApplicationList;