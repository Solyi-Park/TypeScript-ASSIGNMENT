import { configureStore } from "@reduxjs/toolkit";
import todos from "./todosSlice";


export const store = configureStore({
    reducer: {
        todos,
        
    }
})