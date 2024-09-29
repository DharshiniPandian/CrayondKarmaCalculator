import { createSlice } from "@reduxjs/toolkit";

const vehicles = [];
const foodItems = [];

const MasterVehicles = createSlice({
    name:"MasterVehicles",
    initialState:vehicles,
    reducers:{
        addMasterVehiclesData(state,action){
            const data = action.payload;
            return state = data
        }
    }
})

const MasterFoodItems = createSlice({
    name:"MasterFoods",
    initialState:foodItems,
    reducers:{
        addMasterFoodsData(state,action){
            const data = action.payload;
            return state = data
        }
    }
})

export const {addMasterVehiclesData} = MasterVehicles.actions
export const {addMasterFoodsData} = MasterFoodItems.actions

export const MasterVehicleReducer = MasterVehicles.reducer
export const MasterFoodItemsReducer = MasterFoodItems.reducer