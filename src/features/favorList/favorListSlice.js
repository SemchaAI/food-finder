import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "false", // true
  list: [],
};

const favorListSlice = createSlice({
  name: "@@favor",
  initialState: initialState,
  reducers: {
    addFavorList: (state, action) => {
      state.status = "true";
      if (action.payload !== null) {
        state.list.push(action.payload);
      } else state.list = [];
    },
    removeFromFavorList: (state, action) => {
      const currList = state.list.filter((el) => el.id != action.payload);
      let currStatus = state.status;
      // console.log(state.list.filter((el) => el.id !== action.payload));
      if (currList.length === 0) {
        currStatus = "false";
      } else currStatus = "true";
      return {
        status: currStatus,
        list: currList,
      };
    },
  },
});

export const { addFavorList, removeFromFavorList } = favorListSlice.actions;
export const favorListReducer = favorListSlice.reducer;
export const selectFavorList = (state) => state.favorList;

//SELECTORS
// export const selectCountriesInfo = (state) => ({
//   status: state.countries.status,
//   error: state.countries.error,
//   qty: state.countries.list.length,
// });

// export const selectAllCountries = (state) => {
//   //console.log("selectAllCountries");
//   return state.countries.list;
// };

// export const selectSearchCountries = (state, { search = "", region = "" }) => {
//   return state.countries.list.filter((pos) => {
//     // console.log(search.toLowerCase());
//     return (
//       pos.name.toLowerCase().includes(search.toLowerCase()) &&
//       pos.region.toLowerCase().includes(region.toLowerCase())
//     );
//   });
// };
