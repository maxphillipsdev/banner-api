import { Test, TestingModule } from '@nestjs/testing';
import { BannerService } from './banner.service';
import { readFile } from 'fs/promises';

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
});
