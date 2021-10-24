import { Module } from '@nestjs/common';
import { NewsModuleService } from './news-module.service';
import { NewsModuleController } from './news-module.controller';

@Module({
  controllers: [NewsModuleController],
  providers: [NewsModuleService],
})
export class NewsModuleModule {}
