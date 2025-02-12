import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      const newStudent = { id: state.length + 1, ...action.payload };
      state.push(newStudent);
    },
    updateStudent: (state, action) => {
      const index = state.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    }
  }
});

export const { addStudent, updateStudent } = studentSlice.actions;
export default studentSlice.reducer;
