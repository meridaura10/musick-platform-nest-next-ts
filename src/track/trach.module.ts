import { Module } from "@nestjs/common";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Track, TrackSchema } from "./schemas/track.schema";
import { Comment, CommentSchema } from "./schemas/comment.schema";
import { FileService } from "src/file/file.serveci";
import { User, UserSchema } from "src/auth/schemas/user-schema";
@Module({
    imports: [ 
        MongooseModule.forFeature([{name: Track.name,schema: TrackSchema}]),
        MongooseModule.forFeature([{name: Comment.name,schema: CommentSchema}]),
        MongooseModule.forFeature([{name: User.name,schema: UserSchema}]),
    ],
    controllers: [TrackController],
    providers: [TrackService,FileService]
})
export class TrackModule {
     
}