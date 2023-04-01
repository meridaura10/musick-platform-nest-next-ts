import { IsNotEmpty, IsString, IsUrl, IsInt } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly artist: string;

  @IsString()
  readonly creator: string;

  @IsString()
  readonly text: string;
  @IsNotEmpty()
  readonly audio: {
    readonly id: number;

    readonly url: string;
  };
  @IsNotEmpty()
  readonly picture: {
    readonly id: string;
    readonly url: string;
  };
}
