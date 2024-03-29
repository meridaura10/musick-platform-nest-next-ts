import {
  Body,
  Param,
  Delete,
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFiles,
  Query,
  Res,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/auth/schemas/user-schema';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Post()
  create(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }
  @Get()
  async getAll(@Query('limit') limit: number, @Query('offset') offset: number) {
    return await this.trackService.getAll(limit, offset);
  }
  @Get('/search')
  search(@Query('query') query: string) {
    return this.trackService.search(query);
  }
  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }
  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto);
  }
  @Post('/listen/:id')
  listrens(@Param('id') id: ObjectId) {
    return this.trackService.listen(id);
  }
}
