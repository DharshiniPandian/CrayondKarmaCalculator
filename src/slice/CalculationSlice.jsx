import { createSlice } from "@reduxjs/toolkit";

const calculateVehicleEmission = ({ vehicle_value, vehicle_count, travel_distance, fuel_value , total_vehicle_emission }) => {
  if (!vehicle_value || !vehicle_count) return 0;

  let emission = vehicle_value * vehicle_count;

  if (fuel_value) {
    emission += fuel_value
  }

  if (travel_distance && fuel_value) {
    emission -= fuel_value
    const new_value = fuel_value * (travel_distance / 10).toFixed(2)
    emission = emission + new_value
  }

  console.log("Vehicle = ",emission)
  total_vehicle_emission = emission;
  return emission;
};

const calculateFoodEmission = ({ food_value , total_food_emission }) => {
  total_food_emission = food_value
  return food_value || 0;
};

const calculateApplianceEmission = ({ appliance_value, total_appliances_emission }) => {
  total_appliances_emission = appliance_value
  return appliance_value || 0;
};

const calculateElectricityEmission = ({ electricity_value, total_electricity_emission }) => {
  total_electricity_emission = electricity_value;
  if (!electricity_value) return 0;
  return electricity_value; 
};

// Function to calculate total emission by summing all categories
const calculateTotalEmission = (state) => {
  const vehicleEmission = calculateVehicleEmission(state.vehicle);
  const foodEmission = calculateFoodEmission(state.food);
  const applianceEmission = calculateApplianceEmission(state.appliances);
  const electricityEmission = calculateElectricityEmission(state.electricity);

  const total = vehicleEmission + foodEmission + applianceEmission + electricityEmission;
  console.log("Total Emission = ", total);
  return total;
};


const initialState = {
  vehicle: {
    vehicle_id: null,
    vehicle_value: null, // Base emission value per vehicle type
    vehicle_count: 1,
    fuel_id: null, // ID of the selected fuel type
    fuel_value: null, // Emission factor based on fuel type
    travel_distance: null, // Distance traveled in km per week
    total_vehicle_emission: 0,
  },
  food: {
    food_id: null,
    food_value: null, // Base emission value per food type
    total_food_emission: 0,
  },
  appliances: {
    appliance_id: [],
    appliance_value: null, // Base emission value per appliance type
    total_appliances_emission: 0,
  },
  electricity: {
    electricity_value: null, // Electricity consumed for a month
    total_electricity_emission: 0, // Corrected key
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
      state.vehicle.total_vehicle_emission = calculateVehicleEmission(state.vehicle);
      state.total_emission.total_emission = calculateTotalEmission(state);
    },

    // Update the vehicle count and recalculate emission
    addVehicleCount(state, action) {
      state.vehicle.vehicle_count = action.payload.vehicleCount;

      // Recalculate total emission based on new count
      state.vehicle.total_vehicle_emission = calculateVehicleEmission(state.vehicle);
      state.total_emission.total_emission = calculateTotalEmission(state);
    },

    // Update the fuel type and fuel value, then recalculate emission
    selectFuelType(state, action) {
      const { fuelId, fuelValue } = action.payload;
      state.vehicle.fuel_id = fuelId;
      state.vehicle.fuel_value = fuelValue;

      // Recalculate total emission based on new fuel value
      state.vehicle.total_vehicle_emission = calculateVehicleEmission(state.vehicle);
      state.total_emission.total_emission = calculateTotalEmission(state);
    },

    // Update the travel distance and recalculate emission
    addTravelDistance(state, action) {
      state.vehicle.travel_distance = action.payload.travelDistance;

      // Recalculate total emission based on new travel distance
      state.vehicle.total_vehicle_emission = calculateVehicleEmission(state.vehicle);
      state.total_emission.total_emission = calculateTotalEmission(state);
    },


    selectFoodType(state, action) {
      const { foodId, foodValue } = action.payload;
      state.food.food_id = foodId;
      state.food.food_value = foodValue;
      state.food.total_food_emission = calculateFoodEmission(state.food);
      state.total_emission.total_emission = calculateTotalEmission(state);
    },

    selectApplianceType(state, action) {
      const { applianceId, applianceValue } = action.payload;
      state.appliances.appliance_id = applianceId;
      state.appliances.appliance_value = applianceValue;
      state.appliances.total_appliances_emission = calculateApplianceEmission(state.appliances);
      state.total_emission.total_emission = calculateTotalEmission(state);
    },

    // Update the electricity value and recalculate emission
    addElectricityValue(state, action) {
      state.electricity.electricity_value = action.payload.electricityValue;
      state.electricity.total_electricity_emission = calculateElectricityEmission(state.electricity);
      state.total_emission.total_emission = calculateTotalEmission(state);
    },

    // Reverting the deistance 
    revertTravelDistance(state,action){
      const travel = state.vehicle.travel_distance
      const vehicle_emission = state.vehicle.total_vehicle_emission
      const total_emission = state.total_emission.total_emission
      const new_total_emission = (total_emission) - (travel / 10).toFixed(2)
      state.vehicle.total_vehicle_emission = new_total_emission
      state.total_emission.total_emission = new_total_emission
    },

    // Reverting the fuel use
    revertFuelUse(state,action){
      const fuel = state.vehicle.fuel_value
      const total_emmision = state.total_emission.total_emission 
      const new_total_emission = (total_emmision) - fuel
      state.vehicle.total_vehicle_emission = new_total_emission
      state.total_emission.total_emission = new_total_emission
    },

    
    
    // Reverting the  vehicle count
    revertVehicleCount(state,action){
      const vehicle_count = state.vehicle.vehicle_count
      const  total_emmision = state.total_emission.total_emission 
      const new_total_emission = total_emmision -  vehicle_count
      state.vehicle.total_vehicle_emission = new_total_emission
      state.total_emission.total_emission = new_total_emission
    },

    revertFoodType(state) {
      const food = state.vehicle.fuel_value
      const total_emmision = state.total_emission.total_emission 
      const new_total_emission = (total_emmision) - food
      state.food.total_food_emission = new_total_emission
      state.total_emission.total_emission = new_total_emission

      // state.food.food_id = initialState.food.food_id;
      // state.food.food_value = initialState.food.food_value;
      // state.food.total_food_emission = calculateFoodEmission(state.food);
      // state.total_emission.total_emission = calculateTotalEmission(state);
    },
    
    // Reset vehicle details if needed
    resetVehicleDetails(state) {
      state.vehicle = initialState.vehicle;
      state.food = initialState.food;
      state.appliances = initialState.appliances;
      state.electricity = initialState.electricity;
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
  selectFoodType, //Handles food selection and value
  selectApplianceType, // Handles appliance selection and value
  addElectricityValue, // Handles electricity value
  resetVehicleDetails, // Resets the state
  revertTravelDistance, //reverse travel distance
  revertFuelUse, //reverse fuel use
  revertVehicleCount, // reverse the  vehicle count
  revertFoodType, // reverse the selected food type

} = CalculateCarbonEmission.actions;

// Reducer
export const CalcEmissionReducer = CalculateCarbonEmission.reducer;
