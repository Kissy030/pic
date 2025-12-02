import { Module } from '@nestjs/common';
import { StsService } from './sts.service';
import { StsController } from './sts.controller';

@Module({
  providers: [StsService],
  controllers: [StsController],
  exports: [StsService],
})
export class StsModule {}
