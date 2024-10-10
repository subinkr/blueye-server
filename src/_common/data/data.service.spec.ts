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

  describe('Run bucket', () => {
    const then = (callback: Function) => {
      return callback();
    };
    const promise = () => {
      return { then };
    };
    const bucket = {
      putObject() {
        return { promise };
      },
    };
    const params = {};

    it('RUN | runBucket', async () => {
      const result = await service.runBucket(bucket, params, emptyFile);
      expect(typeof result.image).toBe('string');
    });
  });

  describe('Upload Image', () => {
    const resUploadImageToS3 = { image: '' };
    let result = {};

    it('USE | runBucket', async () => {
      service.runBucket = jest.fn().mockReturnValue(resUploadImageToS3);
      result = await service.uploadImage(emptyFile);
    });

    it('RUN | uploadImage', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resUploadImageToS3);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });
});
