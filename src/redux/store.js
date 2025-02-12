import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../features/student/studentSlice";

export const store = configureStore({
  reducer: { students: studentReducer }
});
