export type ShelterAnimal = {
  ABDM_IDNTFY_NO: number;
  SPECIES_NM: string;
  SHTER_NM: string;
  SHTER_TELNO: string;
  IMAGE_COURS: string;
  REFINE_ROADNM_ADDR: string;
  SFETR_INFO: string;
};

export const fetchShelterAnimals = async (
  breed: string
): Promise<ShelterAnimal[]> => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const apiUrl = `https://openapi.gg.go.kr/AbdmAnimalProtect?Key=${apiKey}&Type=json&pIndex=1&pSize=50`;

  const res = await fetch(apiUrl);
  const data = await res.json();

  const animals = data.AbdmAnimalProtect[1].row as ShelterAnimal[];

  const filtered = animals.filter((animal) => {
    const breedName = animal.SPECIES_NM.replace(/^\[[^\]]+\]\s*/, '');
    return breedName === breed;
  });

  return filtered.slice(0, 3);
};
