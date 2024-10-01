import { configureStore } from "@reduxjs/toolkit";
import { MasterAppliancesReducer, MasterVehicleFuelTypeReducer, MasterVehicleReducer } from "../slice/MasterApiSlices";
import { MasterFoodItemsReducer } from "../slice/MasterApiSlices";
import { CalcEmissionReducer } from "../slice/CalculationSlice";
import { TransactionReducer } from "../slice/TransactionSlice";

export const store = configureStore({
  reducer: {
    masterVehicles: MasterVehicleReducer,
    masterFoodItems: MasterFoodItemsReducer,
    masterAppliances: MasterAppliancesReducer,
    carbonValue: CalcEmissionReducer, // Note the key 'carbonValue'
    TransationData: TransactionReducer, // Consider removing if not needed
    masterVehicleFuelType: MasterVehicleFuelTypeReducer,
  },
});
