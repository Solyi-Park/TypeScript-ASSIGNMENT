import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import uuid from "react-uuid";
import { CardType } from "../types/global";
import { RootState } from "./store";

const initialState = {
  todos: [
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
  ],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getTodos = createAsyncThunk<CardType[], void>(
  "GET_TODOS",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.get<CardType[]>("http://localhost:4000/todos");
      console.log("res", res);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      if (err instanceof Error) {
        console.log("error", err.message);
        return thunkAPI.rejectWithValue(err.message);
      } else {
        return thunkAPI.rejectWithValue("알 수 없는 에러가 발생하였습니다.");
      }
    }
  }
);

export const __addTodo = createAsyncThunk<CardType, CardType>(
  "ADD_TODO",
  async (card, thunkAPI) => {
    try {
      const res = await axios.post<CardType>(
        "http://localhost:4000/todos",
        card
      );
      console.log("res", res);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      if (err instanceof Error) {
        console.log("error", err.message);
        return thunkAPI.rejectWithValue(err.message);
      } else {
        return thunkAPI.rejectWithValue("알 수 없는 에러가 발생하였습니다.");
      }
    }
  }
);

export const __deleteTodo = createAsyncThunk<CardType, string>(
  "DELETE_TODO",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete<CardType>(
        `http://localhost:4000/todos/${id}`
      );
      console.log("res", res);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      if (err instanceof Error) {
        console.log("error", err.message);
        return thunkAPI.rejectWithValue(err.message);
      } else {
        return thunkAPI.rejectWithValue("알 수 없는 에러가 발생하였습니다.");
      }
    }
  }
);

export const __switchTodo = createAsyncThunk<CardType, string>(
  "SWITCH_TODO",
  async (id, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const todos = state.todos.todos;
    const foundTodo = todos.find((todo) => todo.id === id);
    const isDone = foundTodo && !foundTodo.isDone
    try {
      const res = await axios.patch<CardType>(
        `http://localhost:4000/todos/${id}`,
        {
          isDone,
        }
      );
      console.log("switch res", res);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      if (err instanceof Error) {
        console.log("error", err.message);
        return thunkAPI.rejectWithValue(err.message);
      } else {
        return thunkAPI.rejectWithValue("알 수 없는 에러가 발생하였습니다.");
      }
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(__getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.error = action.payload
      })
      .addCase(__addTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__addTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos.push(action.payload);
      })
      .addCase(__addTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.error = action.payload
      })
      .addCase(__deleteTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
      })
      .addCase(__deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.error = action.payload
      })
      .addCase(__switchTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__switchTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        const id = action.payload.id;
        state.todos = state.todos.map((todo) => {
          return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
        });
      })
      .addCase(__switchTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.error = action.payload
      });
  },
});

export default todosSlice.reducer;
