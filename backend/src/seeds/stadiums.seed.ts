import { Inject, Injectable } from '@nestjs/common';
import { StadiumsService } from 'src/modules/stadiums/stadiums.service';

@Injectable()
export class StadiumSeedsService {
  constructor(
    @Inject(StadiumsService)
    private readonly stadiumsService: StadiumsService,
  ) {}
  stadiumNames = [
    'Cairo International Stadium',
    'Borg El Arab Stadium',
    'Al-Salam Stadium',
    'Alexandria Stadium',
    'Petro Sport Stadium',
    'Suez Stadium',
    'Ismailia Stadium',
    'Military Academy Stadium',
    '30 June Stadium',
    'Benha Stadium',
    'New Damietta Stadium',
    'Al-Masry Club Stadium',
    'Al-Mokawloon Al-Arab Stadium',
    'El Mahalla Stadium',
    'Aswan Stadium',
    'Cairo Military Academy Stadium',
    'El Gouna Stadium',
    'Fayoum Stadium',
    'Port Said Stadium',
    'Alexandria Military Stadium',
    'Al-Ahly Stadium',
    'Mansoura Stadium',
    'Helwan Stadium',
    'Zagazig Stadium',
    'Tanta Stadium',
    'Sohag Stadium',
    'Kafr El Sheikh Stadium',
    'Assiut Stadium',
    'Minya Stadium',
    'Matruh Stadium',
  ];

  async seedsStadiums() {
    const stadiums = await this.stadiumsService.findAll();
    if (stadiums.length === 0) {
      console.log('Seeding staduims ddata...');

      this.stadiumNames.forEach(async (stadiumName) => {
        const rows = Math.floor(Math.random() * 8) + 7; // Random number between 7 and 14
        const seatsPerRow = Math.floor(Math.random() * 7) + 9; // Random number between 9 and 16
        await this.stadiumsService.create({
          name: stadiumName,
          rows,
          seatsPerRow,
        });
      });
    }
  }
}
