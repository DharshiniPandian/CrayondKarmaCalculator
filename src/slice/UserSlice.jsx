import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentStep: 1,
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        goToNextStep: (state) => {
            state.currentStep+=1;
        },
        goToPreviousStep: (state) => {
            state.currentStep-=1;
        }, 
        resetProgress: (state) => {
            state.currentStep=1;
        },
    },
})

export const {goToNextStep, goToPreviousStep, resetProgress} = UserSlice.actions;
export default UserSlice.reducer;