import { Module } from "@nestjs/common";
import { TrackController } from "./track/track.controller";
import { TrackService } from "./track/track.service";
import { TrackModule } from "./track/trach.module";
import { MongooseModule } from "@nestjs/mongoose";
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import path, { join } from "path";


@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'static'),
          }),
        MongooseModule.forRoot('mongodb+srv://meridaura:123@cluster0.qmirbuh.mongodb.net/music?retryWrites=true&w=majority'),
        TrackModule,
        FileModule,
    ]
})
export  class AppModule {

}