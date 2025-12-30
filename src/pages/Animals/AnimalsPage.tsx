import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { Link, useSearchParams } from 'react-router-dom';

import { ErrorFallback } from '../../components/ErrorFallback';
import { Skeleton } from '../../components/Skeleton';
import { useFavorite } from '../../contexts/FavoriteContext';
import { fetchAllShelterAnimals } from '../../api/shelterAPI';
import { getSpeciesName, getSpeciesCode } from '../../utils/speciesUtils';

const itemsPerPage = 12;

const AnimalsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 입력 상태 (사용자가 입력 중인 필터 값)
  const [inputSearchType, setInputSearchType] = useState<'species' | 'shelter'>(
    (searchParams.get('searchType') || 'species') as 'species' | 'shelter'
  );
  const [inputSearchKeyword, setInputSearchKeyword] = useState('');
  const [inputSigunNm, setInputSigunNm] = useState(
    searchParams.get('SIGUN_NM') || ''
  );

  const { favorites, toggleFavorite } = useFavorite();

  // 브라우저 뒤로가기 대응: URL 변경 시 입력 상태 동기화
  useEffect(() => {
    const searchType = searchParams.get('searchType') as 'species' | 'shelter';
    const sigunNm = searchParams.get('SIGUN_NM');
    const speciesNm = searchParams.get('SPECIES_NM');
    const shterNm = searchParams.get('SHTER_NM');

    setInputSearchType(searchType || 'species');
    setInputSigunNm(sigunNm || '');

    // 검색어 복원
    if (searchType === 'species' && speciesNm) {
      const speciesName = getSpeciesName(speciesNm);
      setInputSearchKeyword(speciesName);
    } else if (searchType === 'shelter' && shterNm) {
      setInputSearchKeyword(shterNm);
    } else {
      setInputSearchKeyword('');
    }
  }, [searchParams]);

  // 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    const params: Record<string, string> = {
      searchType: inputSearchType,
      page: '1',
    };

    if (inputSearchType === 'species') {
      const speciesCode = getSpeciesCode(inputSearchKeyword);
      if (speciesCode) params.SPECIES_NM = speciesCode;
    } else if (inputSearchKeyword) {
      params.SHTER_NM = inputSearchKeyword;
    }

    if (inputSigunNm) params.SIGUN_NM = inputSigunNm;

    setSearchParams(params);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      page: String(newPage),
    }));
  };

  // URL 파라미터를 API 파라미터로 변환
  const apiParams = useMemo(() => {
    const sigunNm = searchParams.get('SIGUN_NM');
    const speciesNm = searchParams.get('SPECIES_NM');
    const shterNm = searchParams.get('SHTER_NM');
    const page = Number(searchParams.get('page')) || 1;

    const params: {
      pIndex: number;
      pSize: number;
      STATE_NM?: string;
      SIGUN_NM?: string;
      SPECIES_NM?: string;
      SHTER_NM?: string;
    } = {
      pIndex: page,
      pSize: itemsPerPage,
      STATE_NM: '보호중',
    };

    if (sigunNm) params.SIGUN_NM = sigunNm;
    if (speciesNm) params.SPECIES_NM = speciesNm;
    if (shterNm) params.SHTER_NM = shterNm;

    return params;
  }, [searchParams]);

  const { data: response } = useSuspenseQuery({
    queryKey: ['shelterAnimals', apiParams],
    queryFn: () => fetchAllShelterAnimals(apiParams),
  });

  // 서버 응답에서 데이터 추출
  const animals = response.animals;
  const totalCount = response.totalCount;
  const totalPages = response.totalPages;

  return (
    <main className='relative max-w-[1400px] mx-auto px-[20px] py-[40px]'>
      <h2 className='text-[40px] font-[700] text-center'>
        입양 가능한 유기동물
      </h2>
      <span className='block mt-[20px] text-[25px] text-center'>
        사지 말고, 입양하세요!
      </span>
      <p className='mt-[10px] text-center'>
        나의 털북숭이 친구와 보호소 정보를 함께 확인하세요.
      </p>

      <div className='mt-[40px] mb-[60px]'>
        <div className='flex items-center gap-[10px] p-[30px] rounded-[12px] shadow-[5px_5px_20px_rgba(0,0,0,0.1)]'>
          {/* 검색 타입과 검색어를 하나의 통합된 입력창으로 */}
          <div className='flex-1 flex items-center bg-white rounded-[8px] border border-gray-300 hover:border-black focus-within:border-black transition-colors'>
            <select
              value={inputSearchType}
              onChange={(e) =>
                setInputSearchType(e.target.value as 'species' | 'shelter')
              }
              className='px-[15px] py-[12px] bg-transparent border-none outline-none text-[14px] font-medium text-gray-700 cursor-pointer'
            >
              <option value='species'>품종</option>
              <option value='shelter'>보호소</option>
            </select>
            <div className='w-[1px] h-[20px] bg-gray-300'></div>
            <input
              type='text'
              placeholder={
                inputSearchType === 'species'
                  ? '품종 이름 입력'
                  : '보호소명 입력'
              }
              value={inputSearchKeyword}
              onChange={(e) => setInputSearchKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className='flex-1 px-[15px] py-[12px] text-[14px] bg-transparent border-none outline-none'
            />
          </div>

          {/* 지역 선택 */}
          <select
            value={inputSigunNm}
            onChange={(e) => setInputSigunNm(e.target.value)}
            className='px-[15px] py-[12px] text-[14px] bg-white border border-gray-300 rounded-[8px] outline-none cursor-pointer hover:border-black transition-colors min-w-[120px]'
          >
            <option value=''>전체 지역</option>
            <option value='가평군'>가평군</option>
            <option value='고양시'>고양시</option>
            <option value='과천시'>과천시</option>
            <option value='광명시'>광명시</option>
            <option value='광주시'>광주시</option>
            <option value='구리시'>구리시</option>
            <option value='군포시'>군포시</option>
            <option value='김포시'>김포시</option>
            <option value='남양주시'>남양주시</option>
            <option value='동두천시'>동두천시</option>
            <option value='부천시'>부천시</option>
            <option value='성남시'>성남시</option>
            <option value='수원시'>수원시</option>
            <option value='시흥시'>시흥시</option>
            <option value='안산시'>안산시</option>
            <option value='안성시'>안성시</option>
            <option value='안양시'>안양시</option>
            <option value='양주시'>양주시</option>
            <option value='양평군'>양평군</option>
            <option value='여주시'>여주시</option>
            <option value='연천군'>연천군</option>
            <option value='오산시'>오산시</option>
            <option value='용인시'>용인시</option>
            <option value='의왕시'>의왕시</option>
            <option value='의정부시'>의정부시</option>
            <option value='이천시'>이천시</option>
            <option value='파주시'>파주시</option>
            <option value='평택시'>평택시</option>
            <option value='포천시'>포천시</option>
            <option value='하남시'>하남시</option>
            <option value='화성시'>화성시</option>
          </select>

          {/* 검색 버튼 */}
          <button
            onClick={handleSearch}
            className='px-[24px] py-[12px] bg-black text-white text-[14px] font-medium rounded-[8px] hover:bg-gray-800 transition-colors whitespace-nowrap'
          >
            검색
          </button>

          {/* 초기화 버튼 */}
          <button
            onClick={() => {
              setInputSearchType('species');
              setInputSearchKeyword('');
              setInputSigunNm('');
              setSearchParams({}); // URL 초기화
            }}
            className='px-[20px] py-[12px] bg-white text-gray-700 text-[14px] font-medium rounded-[8px] border border-black hover:bg-gray-50 transition-colors whitespace-nowrap'
          >
            초기화
          </button>
        </div>
      </div>

      <span className='text-center my-[20px] mb-[10px] text-[18px] font-[500]'>
        <span className='font-bold'>{totalCount}</span>마리의 친구들이 있어요
      </span>

      {animals.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-[100px]'>
          <p className='text-[24px] mb-[10px]'>검색 결과가 없습니다 😢</p>
          <p className='text-[16px]'>다른 검색 조건으로 다시 시도해보세요</p>
        </div>
      ) : (
        <ul className='grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-x-[25px] gap-y-[35px] justify-center my-[20px]'>
          {animals.map((animal) => (
            <li className='group relative w-full ' key={animal.ABDM_IDNTFY_NO}>
              <Link
                to={`/animals/${animal.ABDM_IDNTFY_NO}`}
                state={animal}
                className='block bg-white p-[20px] rounded-[10px] text-center shadow-[5px_5px_20px_rgba(0,0,0,0.1)]'
              >
                <div className='h-[250px] rounded-[8px] overflow-hidden'>
                  <img
                    src={animal.IMAGE_COURS}
                    alt='유기동물 이미지'
                    className='w-full h-full object-cover group-hover:scale-110 transition-all'
                  />
                </div>
                <h3 className='text-xl font-medium mt-[10px] text-[#444] truncate'>
                  {getSpeciesName(animal.SPECIES_NM)} ∙{' '}
                  {animal.SEX_NM === 'F'
                    ? '여아'
                    : animal.SEX_NM === 'M'
                    ? '남아'
                    : '성별 정보 없음'}{' '}
                  ∙ <span>{animal.BDWGH_INFO}</span>
                </h3>
                <strong className='absolute top-[30px] left-[35px] px-[10px] py-[5px] bg-white rounded-xl border-1 truncate'>
                  {animal.STATE_NM}
                </strong>
                <span className='block text-lg mt-[10px]'>
                  {animal.SHTER_NM}
                </span>
                <span className='block mt-[5px]'>
                  {animal.REFINE_ROADNM_ADDR}
                </span>
              </Link>
              <button
                className='absolute top-[30px] right-[30px] cursor-pointer'
                type='button'
                onClick={() => toggleFavorite(animal.ABDM_IDNTFY_NO)}
              >
                {favorites.includes(String(animal.ABDM_IDNTFY_NO)) ? (
                  <IoMdHeart className='text-pink-400' size={30} />
                ) : (
                  <IoMdHeartEmpty className='text-white' size={30} />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {animals.length > 0 && (
        <div className='flex justify-center items-center gap-[10px] my-[50px] mb-[20px]'>
          <button
            onClick={() => {
              const currentPage = Number(searchParams.get('page')) || 1;
              handlePageChange(Math.max(currentPage - 1, 1));
            }}
            disabled={(Number(searchParams.get('page')) || 1) === 1}
            className='px-[12px] py-[6px] text-[14px] border border-[#ccc] rounded-[6px] cursor-pointer hover:border-black disabled:opacity-50 disabled:cursor-not-allowed disabled:border-[#ccc]'
          >
            ⬅ 이전
          </button>

          <span>
            {Number(searchParams.get('page')) || 1} / {totalPages}
          </span>

          <button
            onClick={() => {
              const currentPage = Number(searchParams.get('page')) || 1;
              handlePageChange(Math.min(currentPage + 1, totalPages));
            }}
            disabled={(Number(searchParams.get('page')) || 1) === totalPages}
            className='px-[12px] py-[6px] text-[14px] border border-[#ccc] rounded-[6px] cursor-pointer hover:border-black disabled:opacity-50 disabled:cursor-not-allowed disabled:border-[#ccc]'
          >
            다음 ➡
          </button>
        </div>
      )}
    </main>
  );
};

const AnimalsPageWrapper = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Skeleton />}>
        <AnimalsPage />
      </Suspense>
    </ErrorBoundary>
  );
};

export default AnimalsPageWrapper;
