import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments } from "../database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enrollCourse: (state, { payload }: PayloadAction<{ userId: string; courseId: string }>) => {
      const already = state.enrollments.find(
        (e) => e.user === payload.userId && e.course === payload.courseId
      );
      if (!already) {
        state.enrollments.push({
          _id: uuidv4(),
          user: payload.userId,
          course: payload.courseId,
        });
      }
    },
    unenrollCourse: (state, { payload }: PayloadAction<{ userId: string; courseId: string }>) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.userId && e.course === payload.courseId)
      );
    },
  },
});

export const { enrollCourse, unenrollCourse, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;