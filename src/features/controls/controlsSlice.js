import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  status: "idle", //loading | received | rejected
  statusID: "idle", //loading | received | rejected
  error: null,
  search: "",
  tag: "",
  list: [],
  info: {
    image: "",
    title: "",
    readyInMinutes: "",
    summary: "",
    analyzedInstructions: [
      {
        name: "",
        steps: [
          {
            step: "",
            ingredients: [
              {
                id: 0,
                name: "",
                localizedName: "",
                image: "",
              },
            ],
          },
        ],
      },
    ],
    vegetarian: "",
    vegan: "",
    glutenFree: "",
    cheap: "",
    veryPopular: "",
  },
};

export const loadSearchList = createAsyncThunk(
  "@@controls/loadSearch",
  async ({ search, tag }, { extra: { client, api } }) => {
    console.log("search,tags", search, tag);
    const data = client.get(api.complexSearch(search, tag));
    console.log(data);
    return data;
  }
);

export const loadByID = createAsyncThunk(
  "@@controls/loadByID",
  async (id, { extra: { client, api } }) => {
    console.log("loadByID", id);
    const data = await client.get(api.SearchById(id));
    return data;
  }
);

const controlsSlice = createSlice({
  name: "@@controls",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setTag: (state, action) => {
      state.tag = action.payload;
    },
    setClear: () => initialState,
    setClearControls: (state, action) => {
      state.search = "";
      state.tag = "";
    },
    setInfo: (state, action) => {
      state.info = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSearchList.fulfilled, (state, action) => {
        state.status = "received";
        const { results } = action.payload.data;
        state.list = results;
        state.error = null;
      })
      .addCase(loadByID.fulfilled, (state, action) => {
        state.statusID = "received";
        const {
          image,
          title,
          readyInMinutes,
          summary,
          analyzedInstructions,
          vegetarian,
          vegan,
          glutenFree,
          cheap,
          veryPopular,
        } = action.payload.data;
        const steps = analyzedInstructions[0].steps;
        const ingridients = steps.map((el) => el.ingredients).flat();
        const instructions = steps.map((el) => el.step);
        const uniqIngridients = Array.from(
          new Set(ingridients.map((a) => a.name))
        );
        state.info = {
          image,
          title,
          readyInMinutes,
          summary,
          vegetarian,
          vegan,
          glutenFree,
          cheap,
          veryPopular,
          ingridients,
          instructions,
          uniqIngridients,
        };
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith("/loading"),
        (state, action) => {
          state.status = "loading";
          state.statusID = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "rejected";
          state.statusID = "rejected";
          state.error = action.payload || action.meta.error;
        }
      );
  },
});

export const { setSearch, setTag, setClear, setClearControls } =
  controlsSlice.actions;
export const controlsReducer = controlsSlice.reducer;
export const selectControls = (state) => state.controls;
export const selectList = (state) => state.controls.list;
export const selectSearch = (state) => state.controls.search;
export const selectTag = (state) => state.controls.tag;
export const selectInfo = (state) => state.controls.info;
