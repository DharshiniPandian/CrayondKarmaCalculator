import { configureStore } from "@reduxjs/toolkit";
import { MasterVehicleReducer } from "../slice/MasterApiSlices";


export const store = configureStore({
    reducer:{
        masterVehicles:MasterVehicleReducer
    }
})