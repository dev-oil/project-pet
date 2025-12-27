import type { AnimalProtect, AnimalData } from '../types/api/AnimalProtectAPI';

/**
 * AnimalProtect를 AnimalData로 변환하는 유틸리티 함수
 * API 응답의 전체 필드에서 컴포넌트에서 필요한 필드만 추출
 * @param animal - API 응답 원본 데이터
 * @returns 컴포넌트에서 사용할 동물 데이터
 */
export const toAnimalData = (animal: AnimalProtect): AnimalData => {
  const {
    ABDM_IDNTFY_NO,
    STATE_NM,
    SIGUN_NM,
    IMAGE_COURS,
    SPECIES_NM,
    COLOR_NM,
    AGE_INFO,
    BDWGH_INFO,
    SEX_NM,
    NEUT_YN,
    SFETR_INFO,
    SHTER_NM,
    SHTER_TELNO,
    REFINE_ROADNM_ADDR,
    REFINE_WGS84_LAT,
    REFINE_WGS84_LOGT,
  } = animal;

  return {
    ABDM_IDNTFY_NO,
    STATE_NM,
    SIGUN_NM,
    IMAGE_COURS,
    SPECIES_NM,
    COLOR_NM,
    AGE_INFO,
    BDWGH_INFO,
    SEX_NM,
    NEUT_YN,
    SFETR_INFO,
    SHTER_NM,
    SHTER_TELNO,
    REFINE_ROADNM_ADDR,
    REFINE_WGS84_LAT,
    REFINE_WGS84_LOGT,
  };
};
