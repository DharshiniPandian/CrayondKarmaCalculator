import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  MasterVehicleFuelTypeReducer,
  MasterVehicleReducer,
  MasterFoodItemsReducer,
  MasterAppliancesReducer
} from "../slice/MasterApiSlices";
import { CalcEmissionReducer } from "../slice/CalculationSlice";
import { TransactionReducer } from "../slice/TransactionSlice";
import storageSession from 'redux-persist/lib/storage/session'; // Use sessionStorage instead of localStorage
import { persistReducer, persistStore } from 'redux-persist';
import UserReducer from "../slice/UserSlice";

// Create persist configuration with sessionStorage
const persistConfig = {
  key: 'root', // This is the key used in sessionStorage to store the persisted state
  storage: storageSession, // Use sessionStorage instead of localStorage
};

// Combine your reducers
const rootReducer = combineReducers({
  masterVehicles: MasterVehicleReducer,
  masterFoodItems: MasterFoodItemsReducer,
  masterAppliances: MasterAppliancesReducer,
  carbonValue: CalcEmissionReducer,
  transactionData: TransactionReducer,
  masterVehicleFuelType: MasterVehicleFuelTypeReducer,
  user: UserReducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
export const store = configureStore({

  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create a persistor
export const persistor = persistStore(store);
