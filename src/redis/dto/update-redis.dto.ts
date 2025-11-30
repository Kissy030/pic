import { PartialType } from '@nestjs/mapped-types';
import { CreateRediDto } from './create-redis.dto';

export class UpdateRediDto extends PartialType(CreateRediDto) {}
