import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({ required: true })
  refreshToken: string;

  @Prop({ref: 'User',type: mongoose.Schema.Types.ObjectId})
  user:  mongoose.ObjectId
}

export const TokenSchema = SchemaFactory.createForClass(Token)