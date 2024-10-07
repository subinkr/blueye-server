import { Test, TestingModule } from '@nestjs/testing';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { providers } from 'src/_mock/providers';
import { emptyFile } from 'src/_mock/emptyFile';
import { mockResUploadImage } from 'src/_mock/dtos/data/res.upload-image.dto';

describe('DataController', () => {
  let controller: DataController;
  let service: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataController],
      providers: providers,
    }).compile();

    controller = module.get<DataController>(DataController);
    service = module.get<DataService>(DataService);
  });

  describe('Upload image', () => {
    it('USE | service uploadImage', async () => {
      service.uploadImage = jest.fn().mockReturnValue(mockResUploadImage);
      await controller.uploadImage(emptyFile);
      expect(service.uploadImage).toHaveBeenCalled();
    });
  });
});
