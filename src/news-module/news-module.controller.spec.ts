import { Test, TestingModule } from '@nestjs/testing';
import { NewsModuleController } from './news-module.controller';
import { NewsModuleService } from './news-module.service';

describe('NewsModuleController', () => {
  let controller: NewsModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsModuleController],
      providers: [NewsModuleService],
    }).compile();

    controller = module.get<NewsModuleController>(NewsModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
