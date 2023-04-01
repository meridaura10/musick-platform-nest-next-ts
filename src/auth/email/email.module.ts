import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'localhost',
          service: 'smtp.gmail.com',
          port: 587,
          secure: true,
          auth: {
            user: 'musicplatformnestnext@gmail.com',
            pass: 'zaq2@2edc',
          },
        },
        defaults: {
          from: 'musicplatformnestnext@gmail.com',
        },
      }),
    }),
  ],
  providers: [EmailService],
})
export class EmailModule {}
