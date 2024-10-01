import { Box } from '@mui/material';
import Img from '../../assets/notfound.svg'
import React from 'react';
import { useDispatch } from "react-redux";
import { resetProgress } from '../../slice/UserSlice';
import { resetVehicleDetails } from '../../slice/CalculationSlice';

function NotFound() {
  const dispatch = useDispatch();
  dispatch(resetProgress());
  dispatch(resetVehicleDetails())
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
