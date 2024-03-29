import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileService, FileType } from 'src/file/file.serveci';
import { User, UserDocument } from 'src/auth/schemas/user-schema';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async create(dto: CreateTrackDto): Promise<Track> {
    const user = await this.userModel.findById(dto.creator)
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
    });
    user.tracks.push(track._id)
    user.save()
    return track;
  }
  async getAll(
    limit = 5,
    offset = 0,
  ): Promise<{
    total: number;
    tracks: Track[];
  }> {
    const tracks = await this.trackModel
      .find()
      .skip(Number(offset))
      .limit(Number(limit));
    const total = await this.trackModel.countDocuments();
    return {
      tracks,
      total,
    };
  }
  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track;
  }
  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return tracks;
  }
  async delete(id: ObjectId): Promise<string> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track._id.toString();
  }
  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });
    const commentId = comment._id;
    track.comments.push(commentId);
    await track.save();
    return comment;
  }
  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
  }
}
