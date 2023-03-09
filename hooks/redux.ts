import { bindActionCreators } from "@reduxjs/toolkit";
import { playerActions } from "@/store/slices/playerSlice";
import { AppState } from "@/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { trackActions } from "@/store/slices/trackSlice";
const actions = {
  ...playerActions,
  ...trackActions,
};
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
