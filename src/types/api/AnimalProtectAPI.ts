/**
 * 경기도 보호소 API 응답 타입 정의
 */

/**
 * 경기도 보호소 API 전체 응답
 * @api https://openapi.gg.go.kr/AbdmAnimalProtect?key={apiKey}&type=json
 */
export type AnimalProtectAPIResponse = {
  AbdmAnimalProtect: [{ head: AnimalProtectHead }, { row: AnimalProtect[] }];
};

/**
 * 경기도 보호소 API 헤더
 */
export type AnimalProtectHead = Array<
  | { list_total_count: number } // 행 총 건수
  | { RESULT: { CODE: string; MESSAGE: string } } // 응답 결과 코드/메시지
  | { api_version: string } // API 버전
>;

/**
 * 경기도 보호소 API 데이터
 */
export type AnimalProtect = {
  SIGUN_CD: string; // 시군 코드
  SIGUN_NM: string; // 시군구 이름 (oo시)
  ABDM_IDNTFY_NO: string; // 유기 고유번호
  THUMB_IMAGE_COURS: string; // 이미지 썸네일 주소
  RECEPT_DE: string; // 접수 일자
  DISCVRY_PLC_INFO: string; // 발견 장소 정보
  SPECIES_NM: string; // 품종 코드
  COLOR_NM: string; // 색상 이름
  AGE_INFO: string; // 나이 정보
  BDWGH_INFO: string; // 몸무게 정보
  PBLANC_IDNTFY_NO: string; // 공고 고유번호
  PBLANC_BEGIN_DE: string; // 공고 시작 일자
  PBLANC_END_DE: string; // 공고 종료 일자
  IMAGE_COURS: string; // 이미지 주소
  STATE_NM: string; // 상태 (보호중)
  SEX_NM: string; // 성별 (M, F, Q)
  NEUT_YN: string; // 중성화 여부 (Y, N, U)
  SFETR_INFO: string; // 특징
  SHTER_NM: string; // 보호소 이름
  SHTER_TELNO: string; // 보호소 전화번호
  PROTECT_PLC: string; // 보호 장소
  JURISD_INST_NM: string; // 관할 기관 (경기도 oo시)
  CHRGPSN_NM: string | null; // 담당자
  CHRGPSN_CONTCT_NO: string | null; // 담당자 연락처
  PARTCLR_MATR: string | null; // 특이사항
  REFINE_LOTNO_ADDR: string; // 보호소 지번 주소
  REFINE_ROADNM_ADDR: string; // 보호소 도로명 주소
  REFINE_ZIP_CD: string; // 보호소 우편번호
  REFINE_WGS84_LOGT: string; // WGS84 경도
  REFINE_WGS84_LAT: string; // WGS84 위도
};

/**
 * 컴포넌트에서 사용하는 동물 타입 (필요한 필드만 Pick)
 */
export type AnimalData = Pick<
  AnimalProtect,
  | 'ABDM_IDNTFY_NO'
  | 'STATE_NM'
  | 'SIGUN_NM'
  | 'IMAGE_COURS'
  | 'SPECIES_NM'
  | 'COLOR_NM'
  | 'AGE_INFO'
  | 'BDWGH_INFO'
  | 'SEX_NM'
  | 'NEUT_YN'
  | 'SFETR_INFO'
  | 'SHTER_NM'
  | 'SHTER_TELNO'
  | 'REFINE_ROADNM_ADDR'
  | 'REFINE_WGS84_LAT'
  | 'REFINE_WGS84_LOGT'
>;

/**
 * API 요청 파라미터 타입
 */
export type FetchAnimalsParams = {
  pIndex?: number; // 페이지 위치 (기본값: 1)
  pSize?: number; // 페이지 당 요청 숫자 (기본값: 12)
  SIGUN_CD?: string; // 시군코드 (선택)
  SIGUN_NM?: string; // 시군명 (선택)
  STATE_NM?: string; // 상태 (선택, 기본값: '보호중')
  PBLANC_BEGIN_DE?: string; // 공고시작일자 (선택)
  PBLANC_END_DE?: string; // 공고종료일자 (선택)
  SPECIES_NM?: string; // 품종 (선택)
  SHTER_NM?: string; // 보호소명 (선택)
};

/**
 * API 응답 타입 (페이지네이션 정보 포함)
 */
export type FetchAnimalsResponse = {
  animals: AnimalData[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
};
