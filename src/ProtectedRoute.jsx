import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import {resetVehicleDetails} from '../src/slice/CalculationSlice'
import { resetProgress } from './slice/UserSlice';

function ProtectedRoute({children, stepRequired}) {
   const currentStep = useSelector((state) => state.user.currentStep);
   const dispatch = useDispatch();

   if(currentStep === stepRequired ){
      return children  
   }
   dispatch(resetVehicleDetails());
   dispatch(resetProgress())
   return <Navigate to='/' />
}

export default ProtectedRoute