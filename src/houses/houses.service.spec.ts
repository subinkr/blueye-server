import { Test, TestingModule } from '@nestjs/testing';
import { HousesService } from './houses.service';
import { providers } from 'src/_mock/providers';

describe('HousesService', () => {
  let service: HousesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: providers,
    }).compile();

    service = module.get<HousesService>(HousesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
