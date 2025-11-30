import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Res,
  ValidationPipe,
  HttpStatus,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/RegisterDto';
import { LoginDto } from './dto/LoginDto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthCodeDto } from './dto/AuthCode.dto';
import { RedisService } from '../redis/redis.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Inject(JwtService)
  private jwtService: JwtService;

  // @Post('authCode')
  // async authCode(@Body() authCodeDto: AuthCodeDto) {
  //   const { email } = authCodeDto;
  //   const info = await this.userService.findUserByEmail(email);
  //   return info;
  // }4

  @Inject()
  private redisService: RedisService;
  @Post('authcode')
  async authcode(@Body() authCodeDto: AuthCodeDto) {
    const { email, code } = authCodeDto;
    const codeInRedis = await this.redisService.get(`captcha_${email}`);
    if (!codeInRedis) {
      // return { status: 401, message: '验证失败，验证码已过期' }; //401验证码已过期
      throw new HttpException('验证失败，验证码错误或已失效', 401);
    }
    if (code !== codeInRedis) {
      // return { status: 400, message: '验证失败，验证码错误' }; //400验证码错误
      throw new HttpException('验证失败，验证码错误或已失效', 400);
    }
    return { statusCode: 200, message: '验证通过' };
  }

  @Post('login')
  async login(
    @Body(ValidationPipe) user: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const foundUser = await this.userService.login(user);
    if (foundUser) {
      const token = await this.jwtService.signAsync({
        user: {
          id: foundUser.id,
          username: foundUser.username,
        },
      });
      res.setHeader('token', token);
      const backUser = { id: foundUser.id, username: foundUser.username };
      return res.status(HttpStatus.OK).json({ token, backUser });
    } else {
      // return res.json({ code: 0, message: '用户信息不存在' });
      throw new HttpException('注册失败，用户名已存在', 409);
    }
  }

  @Post('register')
  async register(@Body(ValidationPipe) user: RegisterDto) {
    return await this.userService.register(user);
  }
}
