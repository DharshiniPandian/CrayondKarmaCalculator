import { createSlice } from "@reduxjs/toolkit";

const initialstate = [];

const TransactionData = createSlice({
    name:"TransactionData",
    initialState:initialstate,
    reducers:{
        addTransaction(state,action){
            const data = action.payload
            console.log(data);
            return ;
        }
    }
})

export const {addTransaction} = TransactionData.actions

export const TransactionReducer = TransactionData.reducer