import { createSlice } from "@reduxjs/toolkit";

// Helper function to calculate total emissions based on given vehicle data
const calculateTotalEmission = ({ vehicle_value, vehicle_count, travel_distance, fuel_value, food_value, appliance_value, electricity_value }) => {
  
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
    console.log("Emission of vehicles : ",travel_distance)
    emission = (emission) * (travel_distance / 10).toFixed(2); // Assume a factor based on distance; adjust as needed

    
  }

  if(food_value) {
    emission = emission * food_value;
  }

  if(appliance_value) {
    emission = emission * appliance_value;
  }

  if(electricity_value) {
    emission = (emission) * (electricity_value / 10).toFixed(2);
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
  },
  food: {
    food_id: null,
    food_value: null, // Base emission value per food type
  },
  appliances: {
    appliance_id: null,
    appliance_value: null, // Base emission value per appliance type
  },
  electricity: {
    electricity_value: null, //Electricity consumed for a month
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
      state.total_emission.total_emission = calculateTotalEmission(state.vehicle);
    },

    selectFoodType(state, action) {
      const { foodId, foodValue } = action.payload;
      state.food.food_id = foodId;
      state.food.food_value = foodValue;
    },

    selectApplianceType(state, action) {
      const { applianceId, applianceValue } = action.payload;
      state.appliances.appliance_id = applianceId;
      state.appliances.appliance_value = applianceValue;
    },

    addElectricityValue(state, action) {
      state.electricity.electricity_value = action.payload.electricityValue;

      state.total_emission.total_emission = calculateTotalEmission(state.electricity);
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
} = CalculateCarbonEmission.actions;

// Reducer
export const CalcEmissionReducer = CalculateCarbonEmission.reducer;
