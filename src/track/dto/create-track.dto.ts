export class CreateTrackDto {
  readonly name: string;
  readonly artist: string;
  readonly text: string;
  readonly audio: {
    id: string;
    url: string;
  };
  readonly picture: {
    id: string;
    url: string;
  };
}
