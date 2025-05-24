import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { Link } from 'react-router-dom';

import { ErrorFallback } from '../../components/ErrorFallback';
import { Skeleton } from '../../components/Skeleton';
import { useFavorite } from '../../contexts/FavoriteContext';
import { fetchAllShelterAnimals } from '../../services/shelterAPI';

const itemsPerPage = 12;

const AnimalsPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [gender, setGender] = useState('');
  const [neutered, setNeutered] = useState('');
  const [region, setRegion] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { favorites, toggleFavorite } = useFavorite();

  const { data: animals } = useSuspenseQuery({
    queryKey: ['shelterAnimals', 'all'],
    queryFn: fetchAllShelterAnimals,
  });

  // 필터링된 동물 리스트
  const filteredAnimals = useMemo(() => {
    if (!animals.length) return [];

    const keyword = searchKeyword.toLowerCase();

    return animals.filter((animal) => {
      const matchKeyword =
        animal.SPECIES_NM.toLowerCase().includes(keyword) ||
        animal.SHTER_NM.toLowerCase().includes(keyword);
      const matchAnimalType = animalType
        ? animal.SPECIES_NM.includes(animalType)
        : true;
      const matchGender = gender ? animal.SEX_NM === gender : true;
      const matchNeutered = neutered ? animal.NEUT_YN === neutered : true;
      const matchRegion = region
        ? animal.REFINE_ROADNM_ADDR?.includes(region)
        : true;

      return (
        matchKeyword &&
        matchAnimalType &&
        matchGender &&
        matchNeutered &&
        matchRegion
      );
    });
  }, [animals, searchKeyword, animalType, gender, neutered, region]);

  // 현재 페이지 동물 리스트
  const currentAnimals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAnimals.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAnimals, currentPage]);

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
        <input
          type='text'
          placeholder='품종 또는 보호소명을 검색하세요'
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className='w-full px-[15px] py-[10px] text-[16px] border border-[#ccc] rounded-[8px] focus:outline-black'
        />
        <div className='flex flex-wrap justify-center gap-[15px] mt-[20px]'>
          <select
            value={animalType}
            onChange={(e) => setAnimalType(e.target.value)}
            className='py-[5px] px-[10px] border border-[#ccc] rounded-[8px] focus:outline-black'
          >
            <option value=''>품종</option>
            <option value='개'>개</option>
            <option value='고양이'>고양이</option>
            <option value='기타축종'>기타축종</option>
          </select>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className='py-[5px] px-[10px] border border-[#ccc] rounded-[8px] focus:outline-black'
          >
            <option value=''>성별</option>
            <option value='M'>남아</option>
            <option value='F'>여아</option>
            <option value='Q'>미상</option>
          </select>
          <select
            value={neutered}
            onChange={(e) => setNeutered(e.target.value)}
            className='py-[5px] px-[10px] border border-[#ccc] rounded-[8px] focus:outline-black'
          >
            <option value=''>중성화 여부</option>
            <option value='Y'>중성화 O</option>
            <option value='N'>중성화 X</option>
          </select>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
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
            onClick={() => {
              setSearchKeyword('');
              setAnimalType('');
              setGender('');
              setNeutered('');
              setRegion('');
            }}
            className='py-[6px] px-[10px] bg-black text-white rounded-[8px] cursor-pointer'
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
                {animal.SPECIES_NM} ∙{' '}
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
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className='px-[12px] py-[6px] text-[14px] border border-[#ccc] rounded-[6px] cursor-pointer hover:border-black'
        >
          ⬅ 이전
        </button>

        <span>
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
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
