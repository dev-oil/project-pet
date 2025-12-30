import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import Lightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';
import { ErrorFallback } from '../../components/ErrorFallback';
import { Skeleton } from '../../components/Skeleton';
import { fetchAllShelterAnimals } from '../../api/shelterAPI';
import type { AnimalData } from '../../types/api/AnimalProtectAPI';
import { loadKakaoMapScript } from '../../utils/kakaoMapUtils';
import { getSpeciesName } from '../../utils/speciesUtils';

import markerIMG from '/images/marker.png';

const getSameSpecies = (animals: AnimalData[], animal: AnimalData) => {
  return animals.filter(
    (item) =>
      item.SPECIES_NM === animal.SPECIES_NM &&
      item.ABDM_IDNTFY_NO !== animal.ABDM_IDNTFY_NO
  );
};

const AnimalsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);

  const { data: response } = useSuspenseQuery({
    queryKey: ['shelterAnimals', 'all'],
    queryFn: () => fetchAllShelterAnimals(),
  });

  const animals = Array.isArray(response.animals) ? response.animals : [];

  // 먼저 state로 확인
  const animalFromState = location.state as AnimalData | undefined;

  // 이후 params (ABDM_IDNTFY_NO는 string이므로 직접 비교)
  const animal =
    animalFromState ?? animals.find((item) => item.ABDM_IDNTFY_NO === id);

  // 팝업
  const [open, setOpen] = useState(false);

  const similarAnimals = useMemo(() => {
    if (!animal) return [];

    // 같은 품종만 보여주기
    return getSameSpecies(animals, animal).slice(0, 10);
  }, [animals, animal]);

  useEffect(() => {
    if (!animal) {
      navigate('/animals');
      return;
    }

    const initMap = async () => {
      try {
        await loadKakaoMapScript();
        if (!mapRef.current) return;

        const shelterPosition = new window.kakao.maps.LatLng(
          parseFloat(animal.REFINE_WGS84_LAT),
          parseFloat(animal.REFINE_WGS84_LOGT)
        );
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: shelterPosition,
          level: 3,
        });

        const markerImage = new window.kakao.maps.MarkerImage(
          markerIMG,
          new window.kakao.maps.Size(50, 50),
          { offset: new window.kakao.maps.Point(25, 45) }
        );

        new window.kakao.maps.Marker({
          position: shelterPosition,
          image: markerImage,
          map,
        });

        const content = `
          <div style="padding:8px 12px; background:white; border-radius:12px; box-shadow:0 2px 6px rgba(0,0,0,0.15); font-size:14px; text-align:center;">
            ${animal.SHTER_NM}<br/>
            <a href="https://map.kakao.com/link/map/${animal.SHTER_NM},${animal.REFINE_WGS84_LAT},${animal.REFINE_WGS84_LOGT}"
               target="_blank"
               style="color: #ff6699; text-decoration: underline;">
               자세히 보기
            </a>
          </div>`;
        const overlay = new window.kakao.maps.CustomOverlay({
          content,
          position: shelterPosition,
          yAnchor: 1.8,
        });

        overlay.setMap(map);
      } catch (error) {
        console.error('카카오맵 로딩 실패:', error);
      }
    };

    initMap();
  }, [animal, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  if (!animal) return null;

  return (
    <main className='py-[30px] lg:py-[60px]'>
      <section>
        <div className='flex flex-col lg:flex-row gap-10 px-[20px] lg:px-[40px]'>
          <div className='flex justify-center items-center w-full lg:w-1/2'>
            <div
              onClick={() => setOpen(true)}
              className='rounded-xl shadow-md lg:w-[400px] lg:h-[400px] transition-all duration-300 lg:hover:scale-105 overflow-hidden cursor-pointer'
            >
              <img
                src={animal.IMAGE_COURS}
                alt='유기동물 이미지'
                className='block w-full h-full object-cover'
              />
            </div>
          </div>

          <div className='flex flex-col justify-center w-full lg:w-1/2'>
            <h2 className='text-3xl font-bold'>
              {getSpeciesName(animal.SPECIES_NM)} |{' '}
              {animal.SEX_NM === 'F'
                ? '여아'
                : animal.SEX_NM === 'M'
                ? '남아'
                : '성별 정보 없음'}{' '}
            </h2>
            <div className='mt-[30px] space-y-[5px]'>
              <ul className='space-y-2'>
                <li className='flex'>
                  <span className='flex-[0_0_110px] text-lg text-gray-400'>
                    상태{' '}
                  </span>
                  <span className='text-lg'>{animal.STATE_NM}</span>
                </li>
                <li className='flex'>
                  <span className='flex-[0_0_110px] text-lg text-gray-400'>
                    특징{' '}
                  </span>
                  <span className='text-lg'>{animal.SFETR_INFO}</span>
                </li>
                <li className='flex'>
                  <span className='flex-[0_0_110px] text-lg text-gray-400'>
                    중성화 여부{' '}
                  </span>
                  <span className='text-lg'>
                    {animal.NEUT_YN === 'Y'
                      ? '완료'
                      : animal.NEUT_YN === 'N'
                      ? '안되어있음'
                      : '알 수 없음'}
                  </span>
                </li>
                <li className='flex'>
                  <span className='flex-[0_0_110px] text-lg text-gray-400'>
                    나이{' '}
                  </span>
                  <span className='text-lg'>{animal.AGE_INFO}</span>
                </li>
                <li className='flex'>
                  <span className='flex-[0_0_110px] text-lg text-gray-400'>
                    몸무게{' '}
                  </span>
                  <span className='text-lg'>{animal.BDWGH_INFO}</span>
                </li>
                <li className='flex'>
                  <span className='flex-[0_0_110px] text-lg text-gray-400'>
                    보호소{' '}
                  </span>
                  <span className='text-lg'>{animal.SHTER_NM}</span>
                </li>
                <li className='flex'>
                  <span className='flex-[0_0_110px] text-lg text-gray-400'>
                    주소{' '}
                  </span>
                  <span className='text-lg'>{animal.REFINE_ROADNM_ADDR}</span>
                </li>
                <li className='flex'>
                  <span className='flex-[0_0_110px] text-lg text-gray-400'>
                    연락처{' '}
                  </span>
                  <a
                    href={`tel:${animal.SHTER_TELNO}`}
                    className='text-lg hover:scale-105 font-bold transition-all'
                  >
                    {animal.SHTER_TELNO}
                  </a>
                </li>
              </ul>
            </div>
            <div className='mt-[30px] py-[40px] px-[20px] rounded-2xl border-1'>
              <p className='text-xl text-center font-bold'>
                💭 함께할 친구를 기다리고 있어요 💭
              </p>
              <div className='mt-[30px]'>
                {similarAnimals.length === 0 ? (
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <div
                        key={idx}
                        className='h-[100px] bg-gray-200 animate-pulse rounded-md'
                      />
                    ))}
                  </div>
                ) : (
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={2}
                    breakpoints={{
                      768: { slidesPerView: 2.5 },
                      1024: { slidesPerView: 3.5 },
                    }}
                  >
                    {similarAnimals.map((item) => (
                      <SwiperSlide key={item.ABDM_IDNTFY_NO}>
                        <Link
                          to={`/animals/${item.ABDM_IDNTFY_NO}`}
                          state={item}
                          className='group'
                        >
                          <img
                            src={item.IMAGE_COURS}
                            alt={item.SPECIES_NM}
                            className='rounded-md h-[150px] lg:h-[100px] w-full object-cover border border-transparent group-hover:border-black transition'
                          />
                          <div className='mt-2 text-sm font-semibold text-center'>
                            <span>{getSpeciesName(item.SPECIES_NM)}</span>∙
                            <span>
                              {item.SEX_NM === 'F'
                                ? '여아'
                                : item.SEX_NM === 'M'
                                ? '남아'
                                : '성별 정보 없음'}
                            </span>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='mt-[30px] lg:mt-[100px]'>
          <div
            ref={mapRef}
            style={{ width: '100%', height: '400px', margin: '0 auto' }}
          />
        </div>
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[{ src: animal.IMAGE_COURS }]}
          carousel={{ finite: true }}
        />
      </section>
    </main>
  );
};

const AnimalsDetailPageWrapper = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Skeleton />}>
        <AnimalsDetailPage />
      </Suspense>
    </ErrorBoundary>
  );
};

export default AnimalsDetailPageWrapper;
