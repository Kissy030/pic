import { createTransport, Transporter } from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secure: true,
      auth: {
        user: this.configService.get('email_user'),
        pass: this.configService.get('email_password'),
      },
    });
  }

  async sendEmail(mailInfo: MailInfo) {
    const info = await this.transporter.sendMail({
      from: {
        name: '系统邮件',
        address: '807322562@qq.com',
      },
      ...mailInfo,
    });
    console.log(info, 'info');
    return info;
  }
}
