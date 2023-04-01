import { IsNotEmpty } from "class-validator";
import {ObjectId} from "mongoose";

export class CreateCommentDto {
    @IsNotEmpty()
     username: string;
     @IsNotEmpty()
     text: string;
     @IsNotEmpty()
     trackId: ObjectId;
}