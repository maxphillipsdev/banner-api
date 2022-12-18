import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BannerService } from './banner/banner.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, BannerService],
})
export class AppModule {}
