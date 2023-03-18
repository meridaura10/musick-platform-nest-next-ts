import { ITrack } from "@/types/track";
import { ITrackState } from "@/types/trackState";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSearchTracks, fetchTracks } from "./tracksAsyncThunk";

const initialState: ITrackState = {
  error: "",
  isLoading: false,
  tracks: [],
  isSearchLoading: false,
  searchError: "",
};

export const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    setTracks: (state,actions: PayloadAction<ITrack[]>) =>{
      state.tracks = actions.payload
    }
  },
  extraReducers: (builder) => {
    builder
     .addCase(fetchTracks.pending, (state) =>{
      state.isLoading = true      
     })
     .addCase(fetchTracks.fulfilled,(state,actions) =>{
      state.tracks = actions.payload
      state.isLoading = false
      state.error = ''
     })
     .addCase(fetchTracks.rejected, (state,actions) =>{
      state.error = actions.payload as string
     })
     .addCase(fetchSearchTracks.pending, (state) =>{
      state.isSearchLoading = true      
     })
     .addCase(fetchSearchTracks.fulfilled,(state,actions) =>{
      state.tracks = actions.payload
      state.isSearchLoading = false
      state.searchError = ''
     })
     .addCase(fetchSearchTracks.rejected, (state,actions) =>{
      state.searchError = actions.payload as string
     })
  },
});

export const trackActions = { fetchTracks, ...trackSlice.actions };
export const {setTracks} = trackSlice.actions
export const trackReducer = trackSlice.reducer;
