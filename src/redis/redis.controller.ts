import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RedisService } from './redis.service';
import { CreateRediDto } from './dto/create-redis.dto';
import { UpdateRediDto } from './dto/update-redis.dto';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Post()
  create(@Body() createRediDto: CreateRediDto) {}

  @Get()
  findAll() {}

  @Get(':id')
  findOne(@Param('id') id: string) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRediDto: UpdateRediDto) {}

  @Delete(':id')
  remove(@Param('id') id: string) {}
}
