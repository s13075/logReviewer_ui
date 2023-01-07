import React from 'react'
import { Box, Typography } from '@mui/material';
import {JUSTIFICATION_PAGE} from '../../config/names_PL';


const JustificationContainer = () => {
  return (
    <Box >
    <Typography height='5%'>{JUSTIFICATION_PAGE}</Typography>
    <Box height="100vh" width='100vw' display='flex' flexDirection='column'>
      <Box height="50vh" width='100vw'>
        LISTA WYJASNIENIEŃ
      </Box>
      <Box height="50vh" width='100vw' display='flex' flexDirection='ROW'>
        <Box height="50vh" width='50vw'>
          RECONCILIATION CONTAINER
        </Box>
        <Box height="50vh" width='50vw'>JUSTIFICATION HISTORY</Box>
      </Box>
    </Box>
  </Box>
  )
}

export default JustificationContainer