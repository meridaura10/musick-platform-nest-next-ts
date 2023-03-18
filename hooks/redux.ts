import { bindActionCreators } from "@reduxjs/toolkit";
import { playerActions } from "@/store/slices/playerSlice";
import { AppState } from "@/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { fetchSearchTracks, fetchTracks } from "@/store/slices/tracks/tracksAsyncThunk";
import { trackActions } from "@/store/slices/tracks/trackSlice";
const actions = {
  ...playerActions,
  ...trackActions,
  fetchTracks,
  fetchSearchTracks,
};
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
