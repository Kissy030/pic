import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/RegisterDto';
import * as crypto from 'crypto';
import { LoginDto } from './dto/LoginDto';
function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}
@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectEntityManager()
  private entityManager: EntityManager;

  async findUserByEmail(email: string) {
    return await this.entityManager.findOneBy(User, {
      email,
    });
  }

  @InjectRepository(User)
  private userRepository: Repository<User>;
  async login(user: LoginDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });
    if (!foundUser) {
      throw new HttpException('登录失败，用户名或密码错误', 401);
    }
    if (foundUser.password !== md5(user.password)) {
      throw new HttpException('登录失败，用户名或密码错误', 401);
    }
    return foundUser;
  }

  async register(user: RegisterDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });
    const foundUserEmail = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (foundUserEmail) {
      // return { statusCode: 409, message: '该邮箱已注册' };
      throw new HttpException('注册失败，该邮箱已注册', 409);
    }

    if (foundUser) {
      throw new HttpException('注册失败，用户名已存在', 409);
    }

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);
    newUser.email = user.email;
    newUser;
    if (newUser.password !== md5(user.confirmPassword)) {
      throw new HttpException('请检查您的密码', 400);
    }
    try {
      await this.userRepository.save(newUser);
      return { statusCode: 201, message: '注册成功' };
    } catch (e) {
      this.logger.error(e, UserService);
      return newUser;
    }
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   this.manager.save(User, {
  //     id: id,
  //     ...updateUserDto,
  //   });
  // }

  // remove(id: number) {
  //   this.manager.delete(User, id);
  // }
}
