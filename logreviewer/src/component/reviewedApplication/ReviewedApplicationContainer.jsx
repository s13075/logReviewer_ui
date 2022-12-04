import React, {useEffect} from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import getReviewedApplicationAction from '../../module/reviewedApplication/reviewedApplicationAction';
import {getReviewedApplicationsSelector} from '../../module/reviewedApplication/reviewedApplicationSelector';
import ReviewedApplicationFilter from './ReviewedApplicationFilter';


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
                Display all reviewed applications.
            </Box>

        </Box>
    );
}

export default ReviewedApplicationContainer;

