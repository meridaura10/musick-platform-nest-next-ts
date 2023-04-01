import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from 'src/track/schemas/track.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({required : true})
  password: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
  tracks: Track[];

  @Prop({required : true})
  isActivated: boolean

  @Prop()
  activationLink: string
}

export const UserSchema = SchemaFactory.createForClass(User);