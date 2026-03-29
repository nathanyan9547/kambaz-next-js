import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type Module = {
  _id: string;
  name: string;
  description: string;
  course: string;
  editing?: boolean;
  lessons?: Lesson[];
};

type Lesson = {
  _id: string;
  name: string;
  description: string;
  module: string;
};

const initialState = {
  modules: [] as Module[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state, { payload: module }) => {
      const newModule = {
        _id: uuidv4(),
        lessons: [],
        name: module.name,
        course: module.course,
        description: module.description ?? "",
      };
      state.modules = [...state.modules, newModule];
    },
    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter(
        (m) => m._id !== moduleId);
    },
    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m) =>
        m._id === module._id ? module : m
      );
    },
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m) =>
        m._id === moduleId ? { ...m, editing: true } : m
      );
    },
  },
});
export const { addModule, deleteModule, updateModule, editModule, setModules } =
  modulesSlice.actions;
export default modulesSlice.reducer;