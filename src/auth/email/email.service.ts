import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendActivationMail(email, link) {
  await this.mailerService.sendMail({
    to: email,
    subject: 'Welcome to Music Platform',
    template: 'welcome',
    context: {
      // any data to be used in the email template
    },
    })
      .then(() => { console.log("Mailer sended to", email) })
      .catch((err) => { console.log("Mailer send Error1:", err) });
    return true;
  }
}
