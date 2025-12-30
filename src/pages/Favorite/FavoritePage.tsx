import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { IoMdHeart } from 'react-icons/io';
import { Link } from 'react-router-dom';

import { ErrorFallback } from '../../components/ErrorFallback';
import { Skeleton } from '../../components/Skeleton';
import { useFavorite } from '../../contexts/FavoriteContext';
import { fetchAllShelterAnimals } from '../../api/shelterAPI';

const FavoritePage = () => {
  const { favorites, toggleFavorite } = useFavorite();

  const { data: response } = useSuspenseQuery({
    queryKey: ['shelterAnimals'],
    queryFn: () => fetchAllShelterAnimals(),
  });

  const allAnimals = Array.isArray(response.animals) ? response.animals : [];

  const filteredAnimals = allAnimals.filter((animal) =>
    favorites.includes(String(animal.ABDM_IDNTFY_NO))
  );

  return (
    <main className='max-w-[1400px] mx-auto px-[20px] py-[40px]'>
      <h2 className='text-[40px] font-[700] text-center'>찜한 친구들</h2>
      <span className='block mt-[20px] text-[25px] text-center'>
        함께하고 싶은 친구를 확인해보세요
      </span>

      {filteredAnimals.length === 0 ? (
        <p className='text-center mt-[40px] text-xl'>
          아직 찜한 털북숭이 칭구가 없어요! 🥲
        </p>
      ) : (
        <ul className='grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-x-[25px] gap-y-[35px] justify-center my-[40px]'>
          {filteredAnimals.map((animal) => (
            <li key={animal.ABDM_IDNTFY_NO} className='group relative w-full'>
              <Link
                to={`/animals/${animal.ABDM_IDNTFY_NO}`}
                state={animal}
                className='block bg-white p-[20px] rounded-[10px] text-center shadow-[5px_5px_20px_rgba(0,0,0,0.1)]'
              >
                <div className='h-[250px] rounded-[8px] overflow-hidden'>
                  <img
                    src={animal.IMAGE_COURS}
                    alt='유기동물 이미지'
                    className='w-full h-full object-cover transition-all'
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
                <IoMdHeart className='text-pink-400' size={30} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

const FavoritePageWrapper = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Skeleton />}>
        <FavoritePage />
      </Suspense>
    </ErrorBoundary>
  );
};

export default FavoritePageWrapper;
