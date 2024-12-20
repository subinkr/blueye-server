import { Test, TestingModule } from '@nestjs/testing';
import { DataController } from './data.controller';
import { DataService } from './data.service';

describe('DataController', () => {
  let controller: DataController;
  let service: DataService;

  const emptyFile = {
    fieldname: '',
    originalname: '',
    encoding: '',
    mimetype: '',
    buffer: Buffer.from(''),
    size: 0,
  } as Express.Multer.File;

  const mockResUploadImage = {
    url: 'test-url',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataController],
      providers: [{ provide: DataService, useValue: { uploadImage: jest.fn() } }],
    }).compile();

    controller = module.get<DataController>(DataController);
    service = module.get<DataService>(DataService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadImage', () => {
    it('USE | service uploadImage', async () => {
      service.uploadImage = jest.fn().mockReturnValue(mockResUploadImage);
      await controller.uploadImage(emptyFile);
      expect(service.uploadImage).toHaveBeenCalled();
    });
  });
});
