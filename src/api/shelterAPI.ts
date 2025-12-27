import type {
  AnimalProtectAPIResponse,
  AnimalProtect,
  AnimalData,
} from '../types/api/AnimalProtectAPI';
import { getSpeciesCode } from '../utils/speciesUtils';
import { toAnimalData } from '../utils/animalUtils';

// 타입 re-export (기존 import 경로 유지)
export type { AnimalData };

/**
 * 품종 이름으로 보호소 동물 조회
 * @param speciesName - 품종 이름 (예: "골든 리트리버")
 * @returns 해당 품종의 보호소 동물 리스트
 */
export const fetchShelterAnimals = async (
  speciesName: string
): Promise<AnimalData[]> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `https://openapi.gg.go.kr/AbdmAnimalProtect?Key=${apiKey}&Type=json&pIndex=1&pSize=1000`;

  const res = await fetch(apiUrl);
  const data: AnimalProtectAPIResponse = await res.json();

  const animals = (data.AbdmAnimalProtect[1]?.row ?? []) as AnimalProtect[];

  // 품종 이름을 코드로 변환
  const speciesCode = getSpeciesCode(speciesName);

  // 코드로 필터링
  const filtered = animals.filter(
    (animal) => animal.SPECIES_NM === speciesCode
  );

  // 필요한 필드만 Pick하여 반환
  return filtered.slice(0, 3).map(toAnimalData);
};

/**
 * 모든 보호소 동물 조회
 * @returns 보호중인 모든 동물 리스트
 */
export const fetchAllShelterAnimals = async (): Promise<AnimalData[]> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `https://openapi.gg.go.kr/AbdmAnimalProtect?Key=${apiKey}&Type=json&pIndex=1&pSize=1000`;

  const res = await fetch(apiUrl);
  const data: AnimalProtectAPIResponse = await res.json();

  const animals = (data.AbdmAnimalProtect?.[1]?.row ?? []) as AnimalProtect[];

  // 보호중인 동물만 필터링하고 필요한 필드만 Pick하여 반환
  return animals
    .filter((animal) => animal.STATE_NM === '보호중')
    .map(toAnimalData);
};
