import axios from "axios";
import * as api from "./api/config";

import { loadState, saveState } from "./localStorage";
import { throttle } from "lodash";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/es/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { foodListReducer } from "./features/foodList/foodListSlice";
import { themeReducer } from "./features/theme/themeSlice";
import { favorListReducer } from "./features/favorList/favorListSlice";
import { controlsReducer } from "./features/controls/controlsSlice";

const rootReducer = combineReducers({
  foodList: foodListReducer,
  theme: themeReducer,
  favorList: favorListReducer,
  controls: controlsReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      thunk: {
        extraArgument: {
          client: axios,
          api,
        },
      },
    }),
  //.concat(localStorageMiddleware),
});
// store.subscribe(
//   throttle(() => {
//     saveState({
//       theme: store.getState().theme,
//       controls: store.getState().controls,
//       countries: store.getState().countries,
//     });
//   }, 1000)
// );
export const persistor = persistStore(store);
