import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from './data.service';
import { S3Service } from '../s3/s3.service';

describe('DataService', () => {
  let service: DataService;
  let s3Service: S3Service;

  const emptyFile = {
    fieldname: '',
    originalname: 'test.jpg',
    encoding: '',
    mimetype: 'image/jpeg',
    buffer: Buffer.from(''),
    size: 0,
  } as Express.Multer.File;

  const mockS3Url = 'https://test-bucket.s3.amazonaws.com/images/test-uuid.jpg';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataService,
        {
          provide: S3Service,
          useValue: {
            uploadFile: jest.fn().mockResolvedValue(mockS3Url),
          },
        },
      ],
    }).compile();

    service = module.get<DataService>(DataService);
    s3Service = module.get<S3Service>(S3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadImage', () => {
    let result: { url: string };

    beforeEach(async () => {
      result = await service.uploadImage(emptyFile);
    });

    it('should call S3Service.uploadFile', () => {
      expect(s3Service.uploadFile).toHaveBeenCalled();
    });

    it('should return url', () => {
      expect(result).toEqual({ url: mockS3Url });
    });
  });
});
