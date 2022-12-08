import React, {useEffect} from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import getReviewedApplicationAction from '../../module/reviewedApplication/reviewedApplicationAction';
import {getReviewedApplicationsSelector} from '../../module/reviewedApplication/reviewedApplicationSelector';
import ReviewedApplicationFilter from './ReviewedApplicationFilter';
import ReviewedApplicationList from './ReviewedApplicationList';


const ReviewedApplicationContainer = () => {
    const dispatch = useDispatch();
    

    useEffect(()=>{
        dispatch(getReviewedApplicationAction());
    },[dispatch])
    const reviewedApplications = useSelector(getReviewedApplicationsSelector);
    console.log(reviewedApplications);

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
                <ReviewedApplicationList reviewedApplications = {reviewedApplications} />
            </Box>

        </Box>
    );
}

export default ReviewedApplicationContainer;

