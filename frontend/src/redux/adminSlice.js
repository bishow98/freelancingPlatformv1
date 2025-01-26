import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name:"admin",
    initialState:{
        allDetails:[],
    },

    reducers:{
        //actions 
        setAllDetails:(state,action)=>{
            state.allDetails = action.payload;
        }
    }
})

export const {setAllDetails} = adminSlice.actions;

export default adminSlice.reducer;