import { PlayerState } from "@/types/player";
import { ITrack } from "@/types/track";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: PlayerState = {
  active: null,
  currentTime: 0,
  duration: 0,
  volume: 50,
  pause: true,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    toggleTrack: (state, action: PayloadAction<boolean>) => {
      state.pause = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuraction: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setActive: (state,action: PayloadAction<ITrack>) => {
      state.active = action.payload
    }
  },
});

export const playerActions = playerSlice.actions;

export const playerReducer = playerSlice.reducer;
