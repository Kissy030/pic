import { Injectable } from '@nestjs/common';
import { CreatePicInfoDto } from './dto/create-picInfo.dto';
import { UpdatePicInfoDto } from './dto/update-picInfo.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { PicInfo } from './entities/picInfo.entity';
@Injectable()
export class PicInfoService {
  @InjectEntityManager()
  private manager: EntityManager;
  async create(createPicInfoDto: CreatePicInfoDto) {
    const res = await this.manager.save(PicInfo, createPicInfoDto);
    console.log(res, 'resres');
    return res;
  }

  findAll() {
    return this.manager.find(PicInfo);
  }

  findOne(pic_id: number) {
    return this.manager.findOne(PicInfo, {
      where: { pic_id },
    });
  }

  @InjectRepository(PicInfo)
  private picInfoRepository: Repository<PicInfo>;
  // async findOnePicIdbyUserId(userId: number, pic_url: string) {
  //   const record = await this.picInfoRepository.findOneBy({
  //     userId,
  //     pic_url,
  //   });
  //   console.log(pic_url, 'record');

  //   return record;
  // }

  async findFromUserId(userId) {
    return await this.manager.find(PicInfo, {
      where: { userId },
    });
  }

  update(pic_id: number, updatePicInfoDto: UpdatePicInfoDto) {
    this.manager.save(PicInfo, {
      pic_id: pic_id,
      ...updatePicInfoDto,
    });
  }

  async remove(pic_id: number) {
    await this.manager.delete(PicInfo, {
      pic_id,
    });
  }
}
