import { Test, TestingModule } from '@nestjs/testing';
import { StadiumsController } from './stadiums.controller';
import { StadiumsService } from './stadiums.service';

describe('StadiumsController', () => {
  let controller: StadiumsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StadiumsController],
      providers: [StadiumsService],
    }).compile();

    controller = module.get<StadiumsController>(StadiumsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
