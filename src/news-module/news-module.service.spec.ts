import { Test, TestingModule } from '@nestjs/testing';
import { NewsModuleService } from './news-module.service';

describe('NewsModuleService', () => {
  let service: NewsModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsModuleService],
    }).compile();

    service = module.get<NewsModuleService>(NewsModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
