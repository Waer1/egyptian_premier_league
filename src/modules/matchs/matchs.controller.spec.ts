import { Test, TestingModule } from '@nestjs/testing';
import { MatchsController } from './matchs.controller';
import { MatchsService } from './matchs.service';

describe('MatchsController', () => {
  let controller: MatchsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchsController],
      providers: [MatchsService],
    }).compile();

    controller = module.get<MatchsController>(MatchsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
