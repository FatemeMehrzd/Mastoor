import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RokhdadItem {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: string;
}

interface RokhdadState {
  items: RokhdadItem[];
  loading: boolean;
  error: string | null;
}

const initialState: RokhdadState = {
  items: [],
  loading: false,
  error: null,
};

const rokhdadSlice = createSlice({
  name: "rokhdad",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<RokhdadItem[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addItem: (state, action: PayloadAction<RokhdadItem>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<RokhdadItem>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  setItems,
  setLoading,
  setError,
  addItem,
  updateItem,
  deleteItem,
} = rokhdadSlice.actions;

export default rokhdadSlice.reducer;
