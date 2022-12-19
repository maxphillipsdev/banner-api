import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import puppeteer from 'puppeteer';
import { CreateBannerDto } from 'src/dtos/banner.dto';

@Injectable()
export class BannerService {
  readonly defaultParams: CreateBannerDto = {
    primaryColor: '#E93D82',
    secondaryColor: '#FEECF4',
    bgColor: '#151718',
    primaryText: '~/maxphillipsdev',
    secondaryText: '/banner-api',
  };

  async buildTemplate(): Promise<string> {
    return await readFile(join(__dirname, 'template.hbs'), 'utf-8');
  }

  buildParams(defaultParams: CreateBannerDto, params: CreateBannerDto) {
    return {
      ...defaultParams,
      ...params,
    };
  }

  async getScreenshotFromTemplate(template: string): Promise<string | Buffer> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
      width: 1280,
      height: 640,
    });
    await page.setContent(template);

    await page.evaluateHandle('document.fonts.ready');
    const screenshot = await page.screenshot();
    await browser.close();
    return screenshot;
  }
}
