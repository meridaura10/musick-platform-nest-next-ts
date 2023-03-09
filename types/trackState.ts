import { ITrack } from "./track";

export interface ITrackState {
  tracks: ITrack[];
  isLoading: boolean;
  error: string;
}
