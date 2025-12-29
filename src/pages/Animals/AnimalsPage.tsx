import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, useMemo, useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { Link, useSearchParams } from 'react-router-dom';

import { ErrorFallback } from '../../components/ErrorFallback';
import { Skeleton } from '../../components/Skeleton';
import { useFavorite } from '../../contexts/FavoriteContext';
import { fetchAllShelterAnimals } from '../../api/shelterAPI';
import type { AnimalData } from '../../types/api/AnimalProtectAPI';
import { getSpeciesName, getSpeciesCode } from '../../utils/speciesUtils';

const itemsPerPage = 12;

const AnimalsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL에서 적용 상태 읽어오기
  const appliedSearchType = (searchParams.get('searchType') || 'species') as
    | 'species'
    | 'shelter';
  const appliedSpeciesCode = searchParams.get('speciesCode') || '';
  const appliedShelterName = searchParams.get('shelterName') || '';
  const appliedGender = searchParams.get('gender') || '';
  const appliedNeutered = searchParams.get('neutered') || '';
  const appliedRegion = searchParams.get('region') || '';
  const appliedPage = Number(searchParams.get('page')) || 1;

  // 입력 상태 (사용자가 입력 중인 필터 값)
  const [inputSearchType, setInputSearchType] = useState<'species' | 'shelter'>(
    appliedSearchType
  );
  const [inputSearchKeyword, setInputSearchKeyword] = useState('');
  const [inputGender, setInputGender] = useState(appliedGender);
  const [inputNeutered, setInputNeutered] = useState(appliedNeutered);
  const [inputRegion, setInputRegion] = useState(appliedRegion);

  // URL 변경 시 입력 상태 동기화
  useEffect(() => {
    setInputSearchType(appliedSearchType);
    setInputGender(appliedGender);
    setInputNeutered(appliedNeutered);
    setInputRegion(appliedRegion);
  }, [appliedSearchType, appliedGender, appliedNeutered, appliedRegion]);

  const { favorites, toggleFavorite } = useFavorite();

  // 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('searchType', inputSearchType);
    params.set('page', '1'); // 검색 시 페이지를 1로 리셋

    if (inputSearchType === 'species') {
      // 품종 검색: 이름을 코드로 변환
      const speciesCode = getSpeciesCode(inputSearchKeyword);
      if (speciesCode) params.set('speciesCode', speciesCode);
    } else {
      // 보호소명 검색
      if (inputSearchKeyword) params.set('shelterName', inputSearchKeyword);
    }

    if (inputGender) params.set('gender', inputGender);
    if (inputNeutered) params.set('neutered', inputNeutered);
    if (inputRegion) params.set('region', inputRegion);

    setSearchParams(params);
  };

  const { data: response } = useSuspenseQuery({
    queryKey: ['shelterAnimals', 'all'],
    queryFn: () => fetchAllShelterAnimals(),
  });

  // 임시: 기존 코드와의 호환을 위해 animals 추출
  const animals: AnimalData[] =
    'animals' in response
      ? response.animals
      : (response as unknown as AnimalData[]);

  // 필터링된 동물 리스트 (적용된 필터 기준)
  const filteredAnimals = useMemo(() => {
    if (!animals.length) return [];

    return animals.filter((animal) => {
      // 검색어 매칭
      let matchKeyword = true;
      if (appliedSearchType === 'species' && appliedSpeciesCode) {
        matchKeyword = animal.SPECIES_NM === appliedSpeciesCode;
      } else if (appliedSearchType === 'shelter' && appliedShelterName) {
        matchKeyword = animal.SHTER_NM.toLowerCase().includes(
          appliedShelterName.toLowerCase()
        );
      }

      const matchGender = appliedGender
        ? animal.SEX_NM === appliedGender
        : true;
      const matchNeutered = appliedNeutered
        ? animal.NEUT_YN === appliedNeutered
        : true;
      const matchRegion = appliedRegion
        ? animal.REFINE_ROADNM_ADDR?.includes(appliedRegion)
        : true;

      return matchKeyword && matchGender && matchNeutered && matchRegion;
    });
  }, [
    animals,
    appliedSearchType,
    appliedSpeciesCode,
    appliedShelterName,
    appliedGender,
    appliedNeutered,
    appliedRegion,
  ]);

  // 현재 페이지 동물 리스트
  const currentAnimals = useMemo(() => {
    const startIndex = (appliedPage - 1) * itemsPerPage;
    return filteredAnimals.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAnimals, appliedPage]);

  // 전체 페이지 수
  const totalPages = useMemo(() => {
    return Math.ceil(filteredAnimals.length / itemsPerPage);
  }, [filteredAnimals]);

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

      <div className='mt-[40px] mb-[20px]'>
        <div className='flex gap-[10px] mb-[10px]'>
          <select
            value={inputSearchType}
            onChange={(e) =>
              setInputSearchType(e.target.value as 'species' | 'shelter')
            }
            className='py-[5px] px-[10px] border border-[#ccc] rounded-[8px] focus:outline-black'
          >
            <option value='species'>품종 검색</option>
            <option value='shelter'>보호소명 검색</option>
          </select>
          <input
            type='text'
            placeholder={
              inputSearchType === 'species'
                ? '품종 이름을 입력하세요'
                : '보호소명을 입력하세요'
            }
            value={inputSearchKeyword}
            onChange={(e) => setInputSearchKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            className='flex-1 px-[15px] py-[10px] text-[16px] border border-[#ccc] rounded-[8px] focus:outline-black'
          />
        </div>
        <div className='flex flex-wrap justify-center gap-[15px] mt-[20px]'>
          <select
            value={inputGender}
            onChange={(e) => setInputGender(e.target.value)}
            className='py-[5px] px-[10px] border border-[#ccc] rounded-[8px] focus:outline-black'
          >
            <option value=''>성별</option>
            <option value='M'>남아</option>
            <option value='F'>여아</option>
            <option value='Q'>미상</option>
          </select>
          <select
            value={inputNeutered}
            onChange={(e) => setInputNeutered(e.target.value)}
            className='py-[5px] px-[10px] border border-[#ccc] rounded-[8px] focus:outline-black'
          >
            <option value=''>중성화 여부</option>
            <option value='Y'>중성화 O</option>
            <option value='N'>중성화 X</option>
          </select>
          <select
            value={inputRegion}
            onChange={(e) => setInputRegion(e.target.value)}
            className='py-[5px] px-[10px] border border-[#ccc] rounded-[8px] focus:outline-black'
          >
            <option value=''>지역</option>
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

          <button
            onClick={handleSearch}
            className='py-[6px] px-[10px] bg-black text-white rounded-[8px] cursor-pointer hover:bg-gray-800 transition-colors'
          >
            검색
          </button>
          <button
            onClick={() => {
              setInputSearchType('species');
              setInputSearchKeyword('');
              setInputGender('');
              setInputNeutered('');
              setInputRegion('');
              setSearchParams({}); // URL 초기화
            }}
            className='py-[6px] px-[10px] bg-black text-white rounded-[8px] cursor-pointer hover:bg-gray-800 transition-colors'
          >
            필터 초기화
          </button>
        </div>
      </div>

      <span className='text-center my-[20px] mb-[10px] text-[18px] font-[500]'>
        <span className='font-bold'>{filteredAnimals.length}</span>마리의
        친구들이 있어요
      </span>
      <ul className='grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-x-[25px] gap-y-[35px] justify-center my-[20px]'>
        {currentAnimals.map((animal) => (
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
              <span className='block text-lg mt-[10px]'>{animal.SHTER_NM}</span>
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

      <div className='flex justify-center items-center gap-[10px] my-[50px] mb-[20px]'>
        <button
          onClick={() => {
            const newPage = Math.max(appliedPage - 1, 1);
            const params = new URLSearchParams(searchParams);
            params.set('page', String(newPage));
            setSearchParams(params);
          }}
          disabled={appliedPage === 1}
          className='px-[12px] py-[6px] text-[14px] border border-[#ccc] rounded-[6px] cursor-pointer hover:border-black'
        >
          ⬅ 이전
        </button>

        <span>
          {appliedPage} / {totalPages}
        </span>

        <button
          onClick={() => {
            const newPage = Math.min(appliedPage + 1, totalPages);
            const params = new URLSearchParams(searchParams);
            params.set('page', String(newPage));
            setSearchParams(params);
          }}
          disabled={appliedPage === totalPages}
          className='px-[12px] py-[6px] text-[14px] border border-[#ccc] rounded-[6px] cursor-pointer hover:border-black'
        >
          다음 ➡
        </button>
      </div>
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
