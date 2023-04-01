import { bindActionCreators } from "@reduxjs/toolkit";
import { playerActions } from "@/store/slices/playerSlice";
import { AppState } from "@/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { fetchSearchTracks, fetchTracks } from "@/store/slices/tracks/tracksAsyncThunk";
import { trackActions } from "@/store/slices/tracks/trackSlice";
import { AuthActions } from "@/store/slices/auth/auth.slice";
import { checkAuth, fetchLogin, fetchRegister } from "@/store/slices/auth/authAsyncThunk";
const actions = {
  ...playerActions,
  ...trackActions,
  ...AuthActions,
  fetchTracks,
  fetchRegister,
  checkAuth,
  fetchLogin,
  fetchSearchTracks,
};
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
