import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';  // For Grid2 usage
import { Container, Stack } from "@mui/material"
import Router from "./router/router";

function App() {
 

  return (
    <Stack direction='row'>
    <Box flex={4}>
       hello
    </Box>
    <Box flex={4} sx={{backgroundColor:'red', height:'100vh'}}>
       <Router />
    </Box>
    <Box flex={4}>
       hello
    </Box>

   </Stack>
      
  )
}

export default App
