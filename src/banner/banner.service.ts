import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { compile } from 'handlebars';
import { join } from 'path';
import { CreateBannerDto } from 'src/dtos/banner.dto';

@Injectable()
export class BannerService {
  private readonly defaultParams: CreateBannerDto = {
    primaryColor: '#E93D82',
    secondaryColor: '#FEECF4',
    bgColor: '#151718',
    primaryText: '~/maxphillipsdev',
    secondaryText: '/banner-api',
  };

  async render(params: CreateBannerDto): Promise<string> {
    const templateString = await readFile(
      join(__dirname, 'template.hbs'),
      'utf-8',
    );

    const template = compile(templateString);
    return template({
      ...this.defaultParams,
      ...params,
    });
  }
}
