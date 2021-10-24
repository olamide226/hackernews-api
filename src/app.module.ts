import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { NewsModuleModule } from './news-module/news-module.module';

@Module({
  imports: [NewsModuleModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
