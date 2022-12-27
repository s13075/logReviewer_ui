import React, { useState } from 'react';
import {
    APPLICATION_SEARCH,
    ENTER_APPLICATION_NAME,
    SEARCH
    } from '../../config/names_PL';
import { Box, Paper, Typography, Button, TextField } from '@mui/material';
import { useDispatch} from 'react-redux';
import { getReviewedApplicationByNameAction } from '../../module/reviewedApplication/reviewedApplicationAction';


const ReviewedApplicationFilter = () => {
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();
    return (
        <Box sx={{
            width: '20%',
            height: '500px'
        }}>
            <Paper sx={{
                width: '100%',
                height: '100%'
            }}>
                <Typography> {APPLICATION_SEARCH}</Typography>
                <Box>
                    <TextField
                        placeholder= {ENTER_APPLICATION_NAME}
                        id='application-serach'
                        label= {ENTER_APPLICATION_NAME}
                        variant='outlined'
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                    />
                </Box>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                        console.log('called');
                        dispatch(getReviewedApplicationByNameAction(searchText));
                    }}
                >
                    {SEARCH}
                </Button>
            </Paper>
        </Box>

    );
}

export default ReviewedApplicationFilter;