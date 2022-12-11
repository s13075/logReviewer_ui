import React, { useState } from 'react';
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
                <Typography> Search Applicatioins</Typography>
                <Box>
                    <TextField
                        placeholder='Enter Application name'
                        id='application-serach'
                        label='Enter Application name'
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
                    Search
                </Button>
            </Paper>
        </Box>

    );
}

export default ReviewedApplicationFilter;