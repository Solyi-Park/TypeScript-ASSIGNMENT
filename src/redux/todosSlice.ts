import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const initialState = [
  {
    id: uuid(),
    title: "Sample Title1",
    content: "Sample Content1",
    isDone: false,
  },
  {
    id: uuid(),
    title: "Sample Title2",
    content: "Sample Content2",
    isDone: true,
  },
];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
      console.log(action.payload);
    },
    deleteTodo: (state, action) => {},
    switchTodo: (state, action) => {},
  },
});

export default todosSlice.reducer;
export const { addTodo, deleteTodo, switchTodo } = todosSlice.actions;
