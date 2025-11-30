import { Test, TestingModule } from '@nestjs/testing';
import { PicInfoService } from './picInfo.service';

describe('PicInfoService', () => {
  let service: PicInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PicInfoService],
    }).compile();

    service = module.get<PicInfoService>(PicInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
