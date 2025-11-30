import { PartialType } from '@nestjs/mapped-types';
import { CreatePicInfoDto } from './create-picInfo.dto';

export class UpdatePicInfoDto extends PartialType(CreatePicInfoDto) {}
