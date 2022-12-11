import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { Skeleton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewedApplicationAction } from '../../module/reviewedApplication/reviewedApplicationAction';
import { getReviewedApplicationsSelector, getReviewedApplicationsPromiseSelector } from '../../module/reviewedApplication/reviewedApplicationSelector';
import ReviewedApplicationFilter from './ReviewedApplicationFilter';
import ReviewedApplicationList from './ReviewedApplicationList';


const ReviewedApplicationContainer = () => {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getReviewedApplicationAction());
    }, [dispatch])
    const reviewedApplications = useSelector(getReviewedApplicationsSelector);
    const reviewedApplicationsPromise = useSelector(getReviewedApplicationsPromiseSelector);


    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
        }}>
            <ReviewedApplicationFilter />
            <Box sx={{
                width: '80%'
            }}>
                {reviewedApplicationsPromise.isPending && (
                    <Box ml={2}>
                        <Skeleton
                            variant="react"
                            animation="pulse"
                            width="80%"
                            height="200px"
                        />
                    </Box>
                )}
                {reviewedApplicationsPromise.isErrorOcurred && (
                    <div>
                        Error message...
                    </div>
                )}
                {
                    reviewedApplicationsPromise.isFulfilled &&
                    <ReviewedApplicationList reviewedApplications={reviewedApplications} />
                }

            </Box>

        </Box>
    );
}

export default ReviewedApplicationContainer;

