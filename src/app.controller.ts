import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { BannerService } from './banner/banner.service';
import { CreateBannerDto } from './dtos/banner.dto';

@Controller()
export class AppController {
  constructor(private bannerService: BannerService) {}

  @Get('/')
  async renderBanner(@Res() res: Response, @Query() queries: CreateBannerDto) {
    const renderedTemplate = await this.bannerService.render(queries);
    res.send(renderedTemplate);
  }
}
