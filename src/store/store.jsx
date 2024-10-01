import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  MasterVehicleFuelTypeReducer,
  MasterVehicleReducer,
  MasterFoodItemsReducer,
} from "../slice/MasterApiSlices";
import { CalcEmissionReducer } from "../slice/CalculationSlice";
import { TransactionReducer } from "../slice/TransactionSlice";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';

// Create persist configuration
const persistConfig = {    // This object defines the configuration for how the Redux state should be persisted.
  key: 'root',//This is the key used in localStorage to store the persisted state
  storage,//Specifies that the state will be saved in localStorage.
};

// Combine your reducers
const rootReducer = combineReducers({
  masterVehicles: MasterVehicleReducer,
  masterFoodItems: MasterFoodItemsReducer,
  carbonValue: CalcEmissionReducer,
  transactionData: TransactionReducer, // Fixed typo: "TransationData" to "transactionData"
  masterVehicleFuelType: MasterVehicleFuelTypeReducer,
});

// Create a persisted reducer This wraps the rootReducer with the persistReducer function, which enhances the reducer to enable persistence. It will manage saving and rehydrating the state in local storage based on the configuration provided.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
export const store = configureStore({  //This creates the Redux store
  reducer: persistedReducer,//The store uses the persistedReducer, meaning the state will be persisted.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({//getDefaultMiddleware: Provides the default middleware setup from Redux Toolkit
      serializableCheck: {//serializableCheck: Disables serializability checks for specific actions (persist/PERSIST and persist/REHYDRATE) that are used by Redux Persist. This is important because the state being persisted might contain non-serializable values, which Redux Toolkit typically warns against.
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create a persistor
export const persistor = persistStore(store);//This creates a persistor that works with the store. It handles the process of rehydrating the state from local storage when the app starts.