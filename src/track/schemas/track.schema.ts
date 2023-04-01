import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop()
  name: string;

  @Prop()
  artist: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: mongoose.Schema.Types.ObjectId;

  @Prop() 
  text: string;

  @Prop()
  listens: number;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  picture: Record<string, string>;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  audio: Record<string, string>;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);