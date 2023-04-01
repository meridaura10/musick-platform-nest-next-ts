import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { playerReducer } from "./slices/playerSlice";
import { trackReducer } from "./slices/tracks/trackSlice";
import { AuthReducers } from "./slices/auth/auth.slice";

const makeStore = () =>
  configureStore({
    reducer: {
      player: playerReducer,
      track: trackReducer,
      auth: AuthReducers,
    },
    devTools: true,
  });
const store = makeStore()
export type AppDispath = typeof store.dispatch
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
