import speciesCodes from '../data/speciesCodes.json';

/** 코드가 키 값인 맵 */
const speciesCodeToNameMap = new Map<string, string>(
  Object.entries(speciesCodes)
);

/** 이름이 키 값인 맵 */
const speciesNameToCodeMap = new Map<string, string>(
  Object.entries(speciesCodes).map(([code, name]) => [name, code])
);

/**
 * 코드에 따른 동물 이름 조회
 * @param speciesCode - 코드
 * @returns 코드에 따른 동물 이름
 */
export const getSpeciesName = (speciesCode: string): string => {
  return speciesCodeToNameMap.get(speciesCode) ?? speciesCode;
};

/**
 * 이름에 따른 동물 코드 조회
 * @param speciesName - 이름
 * @returns 이름에 따른 동물 코드
 */
export const getSpeciesCode = (speciesName: string): string => {
  return speciesNameToCodeMap.get(speciesName) ?? speciesName;
};

/**
 * 품종 코드로 카테고리 추출
 * @param speciesCode - 품종 코드
 * @returns 카테고리 ([개], [고양이], [기타축종])
 */
export const getSpeciesCategory = (speciesCode: string): string => {
  const num = parseInt(speciesCode, 10);
  if (num >= 1 && num <= 170) return '[개]';
  if (num >= 171 && num <= 200) return '[고양이]';
  return '[기타축종]';
};
