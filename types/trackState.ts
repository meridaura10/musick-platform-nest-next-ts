import { ITrack } from "./track";

export interface ITrackState {
  tracks: ITrack[];
  isLoading: boolean;
  isSearchLoading: boolean,
  error: string;
  searchError: string,
}
