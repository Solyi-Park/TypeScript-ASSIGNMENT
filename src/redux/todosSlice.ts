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
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
    switchTodo: (state, action) => {
      const id = action.payload.id;
      return state.map((todo) => {
        return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
      });
    },
  },
});

export default todosSlice.reducer;
export const { addTodo, deleteTodo, switchTodo } = todosSlice.actions;
