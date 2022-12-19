import { Test, TestingModule } from '@nestjs/testing';
import { BannerService } from './banner.service';
import { readFile } from 'fs/promises';
import puppeteer from 'puppeteer';

// Mock fs
jest.mock('fs/promises');
const readFileMocked = readFile as jest.MockedFunction<typeof readFile>;

describe('BannerService', () => {
  let service: BannerService;
  const MOCK_TEMPLATE = '<h1>test</h1>';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BannerService],
    }).compile();

    service = module.get<BannerService>(BannerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('buildTemplate', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should return the correct template', async () => {
      readFileMocked.mockResolvedValueOnce(MOCK_TEMPLATE);

      const template = await service.buildTemplate();

      expect(readFileMocked).toHaveBeenCalled();
      expect(template).toEqual(MOCK_TEMPLATE);
    });
  });

  describe('getScreenshotFromTemplate', () => {
    it('should return an image of the rendered template', async () => {
      // Spy on the puppeteer functions
      jest.spyOn(puppeteer, 'launch').mockResolvedValue(
        Promise.resolve({
          newPage: jest.fn().mockResolvedValue({
            setContent: jest.fn().mockResolvedValue(undefined),
            setViewport: jest.fn().mockResolvedValue(undefined),
            evaluateHandle: jest.fn().mockResolvedValue(undefined),
            screenshot: jest.fn().mockResolvedValue(Buffer.from([1, 2, 3])),
            close: jest.fn().mockResolvedValue(undefined),
          }),
          close: jest.fn().mockResolvedValue(undefined),
        }) as any,
      );

      // Call the getScreenshotFromTemplate method and verify the result
      const result = await service.getScreenshotFromTemplate('<html></html>');
      expect(result).toEqual(Buffer.from([1, 2, 3]));

      // Verify that the puppeteer functions were called as expected
      expect(puppeteer.launch).toHaveBeenCalled();
    });
  });
});
