import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { compile } from 'handlebars';
import { BannerService } from './banner/banner.service';
import { CreateBannerDto } from './dtos/banner.dto';

@Controller()
export class AppController {
  constructor(private bannerService: BannerService) {}

  @Get('/')
  async renderBanner(@Res() res: Response, @Query() queries: CreateBannerDto) {
    const template = compile(await this.bannerService.buildTemplate());

    const params = this.bannerService.buildParams(
      this.bannerService.defaultParams,
      queries,
    );

    const renderedTemplate = template(params);
    const screenshot = await this.bannerService.getScreenshotFromTemplate(
      renderedTemplate,
    );

    res.setHeader('Content-Type', 'image/png');
    res.send(screenshot);
  }
}
