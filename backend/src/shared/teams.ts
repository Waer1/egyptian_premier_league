export enum Team {
  AL_AHLY = 'Al Ahly',
  ZAMALEK = 'Zamalek',
  PYRAMIDS = 'Pyramids',
  FUTURE = 'Future',
  AL_MASRY = 'Al Masry',
  ISMAILY = 'Ismaily',
  AL_ITTIHAD = 'Al Ittihad',
  AL_MOKAWLOON = 'Al Mokawloon',
  ZED = 'Zed',
  AL_GONA = 'Al Gona',
  BALADEYA = 'Baladeya',
  SMOHA = 'Smoha',
  CYRAMECAL_CLEOPATRA = 'Cyramecal Cleopatra',
  ENPY = 'Enpy',
  TALA3_EL_GAISH = 'Tala3 El Gaish',
  FARCO = 'Farco',
  ELDAKHLEYA = 'Eldakhleya',
  ELBANK_EL_AHLY = 'Elbank El Ahly',
}

export function getTeamImageLocation(teamName: Team): string {
  const teamImages: { [key in Team]?: string } = {
    [Team.AL_AHLY]: 'public/teamsLogo/Al Ahlypng.png',
    [Team.ZAMALEK]: 'public/teamsLogo/Zamalek.png',
    [Team.PYRAMIDS]: 'public/teamsLogo/PYRAMIDS.png',
    [Team.FUTURE]: 'public/teamsLogo/Future.png',
    [Team.AL_MASRY]: 'public/teamsLogo/Al Masry.png',
    [Team.ISMAILY]: 'public/teamsLogo/Ismaily.png',
    [Team.AL_ITTIHAD]: 'public/teamsLogo/Al Ittihad.png',
    [Team.AL_MOKAWLOON]: 'public/teamsLogo/Al Mokawloon.png',
    [Team.ZED]: 'public/teamsLogo/Zed.png',
    [Team.AL_GONA]: 'public/teamsLogo/Al Gona.png',
    [Team.BALADEYA]: 'public/teamsLogo/Baladeya.png',
    [Team.SMOHA]: 'public/teamsLogo/Smoha.png',
    [Team.CYRAMECAL_CLEOPATRA]: 'public/teamsLogo/Cyramecal Cleopatra.png',
    [Team.ENPY]: 'public/teamsLogo/Enpy.png',
    [Team.TALA3_EL_GAISH]: 'public/teamsLogo/Tala3 El Gaish.png',
    [Team.FARCO]: 'public/teamsLogo/Farco.png',
    [Team.ELDAKHLEYA]: 'public/teamsLogo/Eldakhleya.png',
    [Team.ELBANK_EL_AHLY]: 'public/teamsLogo/Elbank El Ahly.jpg',
  };

  return teamImages[teamName] || 'public/teamsLogo/default.png';
}
