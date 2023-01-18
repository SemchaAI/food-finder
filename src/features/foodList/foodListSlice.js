import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadFoodList = createAsyncThunk(
  "@@foodList/load",
  async (_, { extra: { client, api } }) => {
    return client.get(api.RANDOM_COUNTRIES);
  }
);

const initialState = {
  status: "idle", //loading | received | rejected
  error: null,
  list: [],
};

const foodListSlice = createSlice({
  name: "@@foodList",
  initialState: initialState,
  reducers: {
    setFoodList: (_, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFoodList.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadFoodList.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadFoodList.fulfilled, (state, action) => {
        state.status = "received";
        const { recipes } = action.payload.data;
        const rec = recipes.map((el) => {
          const data = {
            id: el.id,
            title: el.title,
            image: el.image,
            servings: el.servings,
            readyInMinutes: el.readyInMinutes,
          };
          return data;
        });
        //console.log(rec);
        state.list = rec;
        state.error = null;
      });
  },
});

export const { setFoodList } = foodListSlice.actions;
export const foodListReducer = foodListSlice.reducer;
export const selectFoodList = (state) => state.foodList;
