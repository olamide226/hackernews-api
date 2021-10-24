import { Controller, Get } from '@nestjs/common';
import { NewsModuleService } from './news-module.service';

@Controller('news')
export class NewsModuleController {
  constructor(private readonly newsModuleService: NewsModuleService) {}

  @Get('from-last-25-stories')
  getTop10WordsLast25() {
    return this.newsModuleService.getTopWordsInLast25();
  }

  @Get('from-last-600-stories')
  getTop10WordsLast600() {
    return this.newsModuleService.getTopWordsFromUsers();
  }

  @Get('from-last-week')
  getTop10WordsLastWeek() {
    return this.newsModuleService.getTopWordsFromLastWeek();
  }
}
