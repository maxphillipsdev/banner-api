import { Controller, Get, Res } from '@nestjs/common';
import { compile } from 'handlebars';
import { Response } from 'express';
import { readFile } from 'fs/promises';
import { join } from 'path';

@Controller()
export class AppController {
  @Get('/')
  async renderTemplate(@Res() res: Response) {
    const templateString = await readFile(
      join(__dirname, 'template.hbs'),
      'utf-8',
    );

    const template = compile(templateString);

    const renderedTemplate = template({
      text: 'sheesh',
    });

    res.send(renderedTemplate);
  }
}
