import { configureStore } from "@reduxjs/toolkit";
import { MasterVehicleFuelTypeReducer, MasterVehicleReducer } from "../slice/MasterApiSlices";
import { MasterFoodItemsReducer } from "../slice/MasterApiSlices";
import { CalcEmissionReducer } from "../slice/CalculationSlice";
import { TransactionReducer } from "../slice/TransactionSlice";


export const store = configureStore({
    reducer:{
        masterVehicles:MasterVehicleReducer,
        masterFoodItems: MasterFoodItemsReducer,
        carbonValue:CalcEmissionReducer,
        TransationData:TransactionReducer, // think so we need to take it off
        masterVehicleFuelType:MasterVehicleFuelTypeReducer
    }
})