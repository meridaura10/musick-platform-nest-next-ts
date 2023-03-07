import { Module } from "@nestjs/common";
import { FileService } from "./file.serveci";

@Module({
    providers: [FileService]
})
export class FileModule {

}