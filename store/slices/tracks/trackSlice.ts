import { ITrack } from "@/types/track";
import { ITrackState } from "@/types/trackState";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSearchTracks, fetchTracks } from "./tracksAsyncThunk";

const initialState: ITrackState = {
  error: "",
  isLoading: false,
  offset: 0,
  limit: 5,
  tracks: [],
  isSearchLoading: false,
  searchError: "",
  total: 1,
};

export const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    removeTrack: (state,actions) =>{
      state.offset = state.offset - 1
      state.total = state.total - 1
      state.tracks = state.tracks.filter(e => e._id !== actions.payload)
    },
    addTrack: (state,actions: PayloadAction<ITrack>) =>{
      state.offset = state.offset + 1
      state.total = state.total + 1
      state.tracks.push(actions.payload)
    }
  },
  extraReducers: (builder) => {
    builder
     .addCase(fetchTracks.pending, (state) =>{
      state.isLoading = true      
     })
     .addCase(fetchTracks.fulfilled,(state,actions) =>{
      state.total = actions.payload.total
      state.tracks = [...state.tracks,...actions.payload.tracks] 
      state.isLoading = false
      state.offset = state.offset + actions.payload.limit
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
export const trackReducer = trackSlice.reducer;
