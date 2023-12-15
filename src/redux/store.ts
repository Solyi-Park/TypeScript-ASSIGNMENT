import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todosSlice";
import { useDispatch } from "react-redux";
const rootReducer = combineReducers({
  todos: todosSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

