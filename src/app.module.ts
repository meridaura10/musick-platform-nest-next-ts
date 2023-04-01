import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TrackController } from './track/track.controller';
import { TrackService } from './track/track.service';
import { TrackModule } from './track/trach.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import path, { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './auth/email/email.module';
import { TokenModule } from './auth/token/token.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://meridaura:123@cluster0.qmirbuh.mongodb.net/music?retryWrites=true&w=majority',
    ),
    TrackModule,
    FileModule,
    AuthModule,
    EmailModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
