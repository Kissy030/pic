import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { OssService } from './oss.service';

@Controller('oss')
export class OssController {
  constructor(private readonly ossService: OssService) {}

  @Get('upload-url')
  getUploadUrl(
    @Query('fileName') fileName: string,
    @Query('contentType') contentType: string,
  ) {
    console.log('接收到上传请求:');
    console.log('   fileName:', fileName);
    console.log('   contentType:', contentType);
    if (!fileName || !contentType) {
      throw new BadRequestException('fileName and contentType are required');
    }

    // 安全校验
    if (fileName.includes('..') || fileName.startsWith('/')) {
      throw new BadRequestException('Invalid file name');
    }
    return this.ossService.getUploadUrl(fileName, contentType);
  }
}
