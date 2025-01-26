import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    allDetails: [],
  },
  reducers: {
    // Set all details
    setAllDetails: (state, action) => {
      state.allDetails = action.payload;
    },
    // Delete an item by id
    deleteDetail: (state, action) => {
      state.allDetails = state.allDetails.filter(
        (detail) => detail.id !== action.payload
      );
    },
    // Update an item by id
    updateDetail: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.allDetails.findIndex((detail) => detail.id === id);
      if (index !== -1) {
        state.allDetails[index] = { ...state.allDetails[index], ...updatedData };
      }
    },
  },
});

export const { setAllDetails, deleteDetail, updateDetail } = adminSlice.actions;

export default adminSlice.reducer;