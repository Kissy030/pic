import { Test, TestingModule } from '@nestjs/testing';
import { PicInfoController } from './picInfo.controller';
import { PicInfoService } from './picInfo.service';

describe('PicInfoController', () => {
  let controller: PicInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PicInfoController],
      providers: [PicInfoService],
    }).compile();

    controller = module.get<PicInfoController>(PicInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
