import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PicInfoService } from './picInfo.service';
import { CreatePicInfoDto } from './dto/create-picInfo.dto';
import { UpdatePicInfoDto } from './dto/update-picInfo.dto';
import { AuthGuard } from 'src/auth.guard';
import { DeletePicInfoDto } from './dto/delete-picInfo.dto';

@Controller('picInfo')
export class PicInfoController {
  constructor(private readonly picInfoService: PicInfoService) {}
  @UseGuards(AuthGuard)
  @Post('/upload')
  async create(@Body() createPicInfoDto: CreatePicInfoDto, @Req() request) {
    const { user } = request;
    const { id } = user || {};
    const params = { ...createPicInfoDto, userId: id };
    const res = await this.picInfoService.create(params);
    return {
      res,
      code: !!res ? 200 : 400,
    };
  }

  @UseGuards(AuthGuard)
  @Post('/delete')
  async delete(@Body() deletePicInfoDto: DeletePicInfoDto, @Req() request) {
    const { pic_id } = deletePicInfoDto;
    // const params = { ...deletePicInfoDto, userId: id, pic_url: pic_url };

    if (pic_id) await this.picInfoService.remove(pic_id);
    console.log(pic_id, 100);

    return { message: '删除成功', statusCode: 200 };
  }

  @UseGuards(AuthGuard)
  @Get('/list')
  async findAll(@Req() request) {
    const { user } = request;
    const { id } = user;
    return await this.picInfoService.findFromUserId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.picInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePicInfoDto: UpdatePicInfoDto) {
    return this.picInfoService.update(+id, updatePicInfoDto);
  }
}
