import { Test, TestingModule } from '@nestjs/testing';
import { StadiumsService } from './stadiums.service';

describe('StadiumsService', () => {
  let service: StadiumsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StadiumsService],
    }).compile();

    service = module.get<StadiumsService>(StadiumsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
