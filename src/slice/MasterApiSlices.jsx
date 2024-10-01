import { createSlice } from "@reduxjs/toolkit";

const vehicles = [];
const foodItems = [];
const vehicleFuelType = [];
const appliances = [];
const electricity = [];

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

const MasterAppliances = createSlice({
    name:"MasterAppliances",
    initialState:appliances,
    reducers:{
        addMasterAppliances(state,action){
            const data = action.payload;
            return state = data
        }
    }
})

const MasterElectricity = createSlice({
    name:"MasterElectricity",
    initialState:electricity,
    reducers:{
        addMasterElectricity(state,action){
            const data = action.payload;
            return state = data
        }
    }
})

const MasterVehicleFuelTypes = createSlice({
    name:"MasterVehicleFuelTypes",
    initialState:vehicleFuelType,
    reducers:{
        addMasterVehicleFuelTypeDatas(state,action){
            const data = action.payload;
            return state = data
        }
    }
})

export const {addMasterVehiclesData} = MasterVehicles.actions
export const {addMasterFoodsData} = MasterFoodItems.actions
export const {addMasterAppliances} = MasterAppliances.actions
export const {addMasterElectricity} = MasterElectricity.actions
export const {addMasterVehicleFuelTypeDatas} = MasterVehicleFuelTypes.actions

export const MasterVehicleReducer = MasterVehicles.reducer
export const MasterFoodItemsReducer = MasterFoodItems.reducer
export const MasterAppliancesReducer = MasterAppliances.reducer
export const MasterElectricityReducer = MasterElectricity.reducer
export const MasterVehicleFuelTypeReducer = MasterVehicleFuelTypes.reducer