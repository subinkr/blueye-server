import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from './data.service';
import { providers } from 'src/_mock/providers';
import { emptyFile } from 'src/_mock/emptyFile';

describe('DataService', () => {
  let service: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: providers,
    }).compile();

    service = module.get<DataService>(DataService);
  });

  describe('Upload image', () => {
    it('RUN | uploadImage', async () => {
      await service.uploadImage(emptyFile);
    });
  });
});
