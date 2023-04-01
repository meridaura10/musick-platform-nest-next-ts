import { AppState } from "@/store";
import { ITrack } from "@/types/track";
import { AddBoxSharp } from "@mui/icons-material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const fetchTracks = createAsyncThunk<
  {
    total: number;
    tracks: ITrack[];
    limit: number
  },
  {
    limit: number;
    offset: number;
  },
  { state: AppState }
>("track/fetchTracks", async ({ offset, limit }, thunkAPI) => {
  const tracksState = thunkAPI.getState().track;
  const total = tracksState.total;
  const tracksCount = tracksState.tracks.length;
  if (total === tracksCount) {
    return {
      total,
      tracks: [],
    };
  }
  try {
    const response = await axios.get(`${process.env.BACKEND_URL}tracks`, {
      params: {
        limit,
        offset,
      },
    });

    return {
      ...response.data,
      limit
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkAPI.rejectWithValue(axiosError.message);
  }
});

export const fetchSearchTracks = createAsyncThunk<
  ITrack[],
  {
    limit: number;
    offset: number;
    query: string;
  }
>("track/fetchSearchTracks", async ({ limit, offset, query }, thunkAPI) => {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}tracks/search`,
      {
        params: {
          query,
        },
      }
    );
    const data: ITrack[] = response.data as ITrack[];
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkAPI.rejectWithValue(axiosError.message);
  }
});
