import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type Assignment = {
  _id: string;
  title: string;
  desc?: string;
  from: string;
  due: string;
  until?: string;
  points: number;
  course: string;
};

const initialState = {
  assignments: [] as Assignment[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment = {
        _id: uuidv4(),
        title: assignment.title,
        desc: assignment.desc,
        from: assignment.from,
        due: assignment.due,
        until: assignment.until,
        points: assignment.points,
        course: assignment.course,
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== assignmentId);
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignment._id ? assignment : a
      );
    },
  },
});
export const { addAssignment, deleteAssignment, updateAssignment, setAssignments } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;