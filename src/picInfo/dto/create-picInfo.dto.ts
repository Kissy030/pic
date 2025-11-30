import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreatePicInfoDto {
  @IsString()
  @IsNotEmpty({ message: '图片名称不能为空' })
  pic_name: string;

  @IsUrl({}, { message: '图片链接必须是有效的 URL' })
  @IsNotEmpty({ message: '图片链接不能为空' })
  pic_url: string;

  // pic_base64: string;
}
