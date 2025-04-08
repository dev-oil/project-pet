export type ShelterAnimal = {
  ABDM_IDNTFY_NO: number;
  STATE_NM: string;
  SIGUN_CD: string;
  IMAGE_COURS: string;
  SPECIES_NM: string;
  COLOR_NM: string;
  AGE_INFO: string;
  BDWGH_INFO: string;
  SEX_NM: string;
  NEUT_YN: string;
  SFETR_INFO: string;
  SHTER_NM: string;
  SHTER_TELNO: string;
  REFINE_ROADNM_ADDR: string;
  REFINE_WGS84_LAT: string;
  REFINE_WGS84_LOGT: string;
};

export const fetchShelterAnimals = async (
  breed: string
): Promise<ShelterAnimal[]> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `https://openapi.gg.go.kr/AbdmAnimalProtect?Key=${apiKey}&Type=json&pIndex=1&pSize=1000`;

  const res = await fetch(apiUrl);
  const data = await res.json();

  const animals = data.AbdmAnimalProtect[1].row as ShelterAnimal[];

  const filtered = animals.filter((animal) => {
    const breedName = animal.SPECIES_NM.replace(/^\[[^\]]+\]\s*/, '');
    return breedName.includes(breed);
  });

  return filtered.slice(0, 3);
};

export const fetchAllShelterAnimals = async (): Promise<ShelterAnimal[]> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `https://openapi.gg.go.kr/AbdmAnimalProtect?Key=${apiKey}&Type=json&pIndex=1&pSize=1000`;

  const res = await fetch(apiUrl);
  const data = await res.json();

  const animals = data.AbdmAnimalProtect?.[1]?.row as
    | ShelterAnimal[]
    | undefined;

  return (animals || []).filter((animal) => animal.STATE_NM === '보호중');
};
