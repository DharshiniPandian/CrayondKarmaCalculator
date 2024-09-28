import { createSlice } from "@reduxjs/toolkit";

const vehicles = [];

const MasterVehicles = createSlice({
    name:"MasterVehicles",
    initialState:vehicles,
    reducers:{
        addMesterVehiclesData(state,action){
            const data = action.payload;
            return state = data
        }
    }
})

export const {addMesterVehiclesData} = MasterVehicles.actions

export const MasterVehicleReducer = MasterVehicles.reducer