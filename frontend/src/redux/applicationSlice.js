import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name:'application',
    initialState:{
        applicants:[],
    },
    reducers:{
        setAllApplicants:(state,action)=>{
            state.applicants = action.payload;
        },
        updateApplicationStatus: (state, action) => {
            const { applicationId, status } = action.payload;
            state.applicants.applications = state.applicants.applications.map(app => 
              app._id === applicationId ? { ...app, status } : app
            );
          }
    }
})

export const {setAllApplicants,updateApplicationStatus} = applicationSlice.actions;
export default applicationSlice.reducer;