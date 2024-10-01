import { Box } from '@mui/material';
import Img from '../../assets/notfound.svg'
import React from 'react';

function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
        backgroundColor: 'white' 
      }}
    >
      <img 
        src={Img}
        alt="Not Found"
        height={'60%'}
        width={'100%'}
      />
    </Box>
  );
}

export default NotFound;
