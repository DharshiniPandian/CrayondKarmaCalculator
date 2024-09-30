import { createSlice } from "@reduxjs/toolkit";

// Helper function to calculate total emissions based on given vehicle data
const calculateTotalEmission = ({ vehicle_value, vehicle_count, travel_distance, fuel_value }) => {
  // If there is no base emission value or count, return 0
  if (!vehicle_value || !vehicle_count) return 0;

  // Calculate base emissions for vehicle type
  let emission = vehicle_value * vehicle_count;

  // Apply the fuel value multiplier if provided
  if (fuel_value) {
    emission = emission * fuel_value;
  }

  // If travel distance is provided, adjust the emission based on it
  if (travel_distance) {
    emission = (emission) * (travel_distance / 10).toFixed(2) // Assume a factor based on distance; adjust as needed
  }

  return emission;
};

const initialState = {
  vehicle: {
    vehicle_id: null,
    vehicle_value: null, // Base emission value per vehicle type
    vehicle_count: 1,
    fuel_id: null, // ID of the selected fuel type
    fuel_value: null, // Emission factor based on fuel type
    travel_distance: null, // Distance traveled in km per week
    total_vehicle_emission:null,
  },
  total_emission: {
    total_emission: 0,
  },
};

const CalculateCarbonEmission = createSlice({
  name: "CarbonEmission",
  initialState: initialState,
  reducers: {
    // Update the base vehicle value and ID
    selectVehicle(state, action) {
      const { vehicleId, vehicleValue } = action.payload;
      state.vehicle.vehicle_id = vehicleId;
      state.vehicle.vehicle_value = vehicleValue;

      // Recalculate total emission
      state.total_emission.total_emission = calculateTotalEmission(state.vehicle);
    },

    // Update the vehicle count and recalculate emission
    addVehicleCount(state, action) {
      state.vehicle.vehicle_count = action.payload.vehicleCount;

      // Recalculate total emission based on new count
      state.total_emission.total_emission = calculateTotalEmission(state.vehicle);
    },

    // Update the fuel type and fuel value, then recalculate emission
    selectFuelType(state, action) {
      const { fuelId, fuelValue } = action.payload;
      state.vehicle.fuel_id = fuelId;
      state.vehicle.fuel_value = fuelValue;

      // Recalculate total emission based on new fuel value
      state.total_emission.total_emission = calculateTotalEmission(state.vehicle);
    },

    // Update the travel distance and recalculate emission
    addTravelDistance(state, action) {
      state.vehicle.travel_distance = action.payload.travelDistance;

      // Recalculate total emission based on new travel distance
      const data = calculateTotalEmission(state.vehicle);
      state.vehicle.total_vehicle_emission = data
      state.total_emission.total_emission = data
    },

    // Reverting the deistance 
    revertTravelDistance(state,action){
      const travel = state.vehicle.travel_distance
      const vehicle_emission = state.vehicle.total_vehicle_emission
      const total_emission = state.total_emission.total_emission
      const new_total_emission = (total_emission) / (travel / 10).toFixed(2)
      state.vehicle.total_vehicle_emission = new_total_emission
      state.total_emission.total_emission = new_total_emission
    },

    // Reverting the fuel use
    revertFuelUse(state,action){
      const fuel = state.vehicle.fuel_value
      const total_emmision = state.total_emission.total_emission 
      const new_total_emission = (total_emmision) / fuel
      state.vehicle.total_vehicle_emission = new_total_emission
      state.total_emission.total_emission = new_total_emission
    },
    
    // Reverting the  vehicle count
    revertVehicleCount(state,action){
      const vehicle_count = state.vehicle.vehicle_count
      const  total_emmision = state.total_emission.total_emission 
      const new_total_emission = total_emmision /  vehicle_count
      state.vehicle.total_vehicle_emission = new_total_emission
      state.total_emission.total_emission = new_total_emission
    },

    // Revert the selected Vehicle
    // revertSelectedVehicle(state,action){
    //   const selected_vehicle = state.vehicle.vehicle_value
    //   const total_emmision = state.total_emission.total_emission
    //   const new_total_emission = total_emmision / selected_vehicle
    //   state.vehicle.vehicle_value = new_total_emission
    //   state.total_emission.total_emission = new_total_emission
    // },

    // Reset vehicle details if needed
    resetVehicleDetails(state) {
      state.vehicle = initialState.vehicle;
      state.total_emission.total_emission = 0;
    },
  },
});

// Action creators
export const {
  selectVehicle, // Handles vehicle selection and value
  addVehicleCount, // Handles vehicle count
  selectFuelType, // Handles fuel type and value selection
  addTravelDistance, // Handles travel distance
  resetVehicleDetails, // Resets the state
  revertTravelDistance, //reverse travel distance
  revertFuelUse, //reverse fuel use
  revertVehicleCount, // reverse the  vehicle count
  // revertSelectedVehicle, //reverse the selected vehicle

} = CalculateCarbonEmission.actions;

// Reducer
export const CalcEmissionReducer = CalculateCarbonEmission.reducer;
