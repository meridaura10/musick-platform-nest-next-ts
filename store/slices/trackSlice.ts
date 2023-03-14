import { PlayerState } from "@/types/player";
import { ITrack } from "@/types/track";
import { ITrackState } from "@/types/trackState";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { AppState } from "..";
import { HYDRATE } from "next-redux-wrapper";
import { env } from "process";

const initialState: ITrackState = {
  error: "",
  isLoading: false,
  tracks: [],
};
export const fetchTracks = createAsyncThunk<
  ITrack[],
  undefined,
  { state: AppState }
>("track/fetchTracks", async (_, thunkAPI) => {  
  try {
    const response = await axios.get(`https://musick-platform-nest-next-ts.vercel.app/tracks`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkAPI.rejectWithValue(axiosError.message);
  }
});
export const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    setTracks: (state,actions: PayloadAction<ITrack[]>) =>{
      state.tracks = actions.payload
    }
  },
  extraReducers: {
    [HYDRATE]: (state,action) =>{
      state.tracks = action.payload.track.tracks
    }
  }
});

export const trackActions = { fetchTracks, ...trackSlice.actions };
export const {setTracks} = trackSlice.actions
export const trackReducer = trackSlice.reducer;
