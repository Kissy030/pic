import { Controller, Get, Inject, Query } from '@nestjs/common';
import { MailService } from '../services/mail.service';
import { RedisService } from '../../redis/redis.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  // @Post('send')
  // async sendEmail(@Body() sendEmailDto: SendEmailDto) {
  //   return this.mailService.sendEmail(sendEmailDto);
  //   // return {
  //   //   success: true,
  //   //   code: 200,
  //   // };
  // }
  @Inject()
  private redisService: RedisService;

  @Get('code')
  async sendmailCode(@Query('address') address) {
    const code = Math.random().toString().slice(2, 8);
    await this.redisService.set(`captcha_${address}`, code, 5 * 60);
    await this.mailService.sendEmail({
      to: address,
      subject: '验证码',
      html: `<p>你的验证码是 ${code} </p>`,
    });
    return {
      success: true,
      message: '发送成功',
      statusCode: 200,
    };
  }
}
