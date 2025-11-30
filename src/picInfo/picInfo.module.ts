import { Module } from '@nestjs/common';
import { PicInfoService } from './picInfo.service';
import { PicInfoController } from './picInfo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PicInfo } from './entities/picInfo.entity';

@Module({
  controllers: [PicInfoController],
  providers: [PicInfoService],
  imports: [TypeOrmModule.forFeature([PicInfo])],
  exports: [PicInfoService],
})
export class PicInfoModule {}
