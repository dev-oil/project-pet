import type {
  AnimalProtectAPIResponse,
  AnimalProtect,
  AnimalData,
  FetchAnimalsParams,
  FetchAnimalsResponse,
} from '../types/api/AnimalProtectAPI';
import { getSpeciesCode } from '../utils/speciesUtils';
import { toAnimalData } from '../utils/animalUtils';

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
 * 모든 보호소 동물 조회 (서버사이드 페이지네이션 및 필터링 지원)
 * @param params - 검색 및 페이지네이션 파라미터
 * @returns 동물 리스트 및 페이지네이션 정보
 */
export const fetchAllShelterAnimals = async (
  params: FetchAnimalsParams = {}
): Promise<FetchAnimalsResponse> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const {
    pIndex = 1,
    pSize = 12,
    SIGUN_CD,
    SIGUN_NM,
    STATE_NM = '보호중',
    PBLANC_BEGIN_DE,
    PBLANC_END_DE,
    SPECIES_NM,
    SHTER_NM,
  } = params;

  // URL 쿼리 파라미터 구성
  const queryParams = new URLSearchParams({
    Key: apiKey,
    Type: 'json',
    pIndex: String(pIndex),
    pSize: String(pSize),
  });

  // 선택적 파라미터 추가
  if (SIGUN_CD) queryParams.append('SIGUN_CD', SIGUN_CD);
  if (SIGUN_NM) queryParams.append('SIGUN_NM', SIGUN_NM);
  if (STATE_NM) queryParams.append('STATE_NM', STATE_NM);
  if (PBLANC_BEGIN_DE) queryParams.append('PBLANC_BEGIN_DE', PBLANC_BEGIN_DE);
  if (PBLANC_END_DE) queryParams.append('PBLANC_END_DE', PBLANC_END_DE);
  if (SPECIES_NM) queryParams.append('SPECIES_NM', SPECIES_NM);
  if (SHTER_NM) queryParams.append('SHTER_NM', SHTER_NM);

  const apiUrl = `https://openapi.gg.go.kr/AbdmAnimalProtect?${queryParams.toString()}`;

  const res = await fetch(apiUrl);
  const data: AnimalProtectAPIResponse = await res.json();

  // 전체 개수 추출
  const head = data.AbdmAnimalProtect?.[0]?.head;
  const totalCount =
    head?.find(
      (item): item is { list_total_count: number } => 'list_total_count' in item
    )?.list_total_count ?? 0;

  // 동물 데이터 추출
  const animals = (data.AbdmAnimalProtect?.[1]?.row ?? []) as AnimalProtect[];

  // 필요한 필드만 Pick하여 변환
  const animalData = animals.map(toAnimalData);

  // 페이지네이션 정보 계산
  const totalPages = Math.ceil(totalCount / pSize);

  return {
    animals: animalData,
    totalCount,
    currentPage: pIndex,
    totalPages,
  };
};
