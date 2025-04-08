export type ShelterAnimal = {
  ABDM_IDNTFY_NO: number; // 등록 Number
  STATE_NM: string; // 상태
  SIGUN_CD: string; // 시, 군 이름
  IMAGE_COURS: string; // 이미지
  SPECIES_NM: string; // 품종
  COLOR_NM: string; // 색상
  AGE_INFO: string; // 나이
  BDWGH_INFO: string; // 몸무게
  SEX_NM: string; // 성별
  NEUT_YN: string; // 중성화 여부
  SFETR_INFO: string; // 특징
  SHTER_NM: string; // 보호소 이름
  SHTER_TELNO: string; // 보호소 전화번호
  REFINE_ROADNM_ADDR: string; // 보호소 주소
  REFINE_WGS84_LAT: string; // 위도
  REFINE_WGS84_LOGT: string; // 경도
};

export const fetchShelterAnimals = async (
  breed: string
): Promise<ShelterAnimal[]> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `https://openapi.gg.go.kr/AbdmAnimalProtect?Key=${apiKey}&Type=json&pIndex=1`;

  const res = await fetch(apiUrl);
  const data = await res.json();

  const animals = data.AbdmAnimalProtect[1].row as ShelterAnimal[];

  const filtered = animals.filter((animal) => {
    const breedName = animal.SPECIES_NM.replace(/^\[[^\]]+\]\s*/, '');
    return breedName === breed;
  });

  return filtered.slice(0, 3);
};

export const fetchAllShelterAnimals = async (): Promise<ShelterAnimal[]> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `https://openapi.gg.go.kr/AbdmAnimalProtect?Key=${apiKey}&Type=json&pIndex=1`;

  const res = await fetch(apiUrl);
  const data = await res.json();

  return data.AbdmAnimalProtect[1].row as ShelterAnimal[];
};
