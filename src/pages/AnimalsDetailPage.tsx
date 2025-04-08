import Lightbox from 'yet-another-react-lightbox';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'yet-another-react-lightbox/styles.css';

import { Link, useLocation } from 'react-router-dom';
import { fetchAllShelterAnimals, ShelterAnimal } from '../services/shelterAPI';
import { useEffect, useRef, useState } from 'react';
import { loadKakaoMapScript } from '../utils/kakaoMapUtils';

import markerIMG from '/images/marker.png';

export const AnimalsDetailPage = () => {
  const location = useLocation();
  const animal = location.state as ShelterAnimal;

  const mapRef = useRef<HTMLDivElement>(null);
  const [similarAnimals, setSimilarAnimals] = useState<ShelterAnimal[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
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

        const marker = new window.kakao.maps.Marker({
          position: shelterPosition,
          image: markerImage,
          map,
        });

        const content = `
        <div style="
          padding: 8px 12px;
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          font-size: 14px;
          color: #333;
          white-space: nowrap;
          text-align: center;
        ">
          ${animal.SHTER_NM}<br/>
          <a href="https://map.kakao.com/link/map/${animal.SHTER_NM},${animal.REFINE_WGS84_LAT},${animal.REFINE_WGS84_LOGT}"
            target="_blank"
            style="color: #ff6699; text-decoration: underline;">
            자세히 보기
          </a>
        </div>
      `;

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
  }, [animal]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  useEffect(() => {
    const loadSimilarAnimals = async () => {
      try {
        const all = await fetchAllShelterAnimals();

        const category = animal.SPECIES_NM.match(/\[(.*?)\]/)?.[0];

        const sameSpecies = all.filter(
          (item) =>
            item.SPECIES_NM === animal.SPECIES_NM &&
            item.ABDM_IDNTFY_NO !== animal.ABDM_IDNTFY_NO
        );

        if (sameSpecies.length >= 10) {
          setSimilarAnimals(sameSpecies.slice(0, 10));
          return;
        }

        const sameCategory = all.filter(
          (item) =>
            item.SPECIES_NM.startsWith(category ?? '') &&
            item.SPECIES_NM !== animal.SPECIES_NM &&
            item.ABDM_IDNTFY_NO !== animal.ABDM_IDNTFY_NO
        );
        setSimilarAnimals([...sameSpecies, ...sameCategory].slice(0, 10));
      } catch (err) {
        console.error('비슷한 동물 불러오기 실패:', err);
      }
    };

    loadSimilarAnimals();
  }, [animal.SPECIES_NM, animal.ABDM_IDNTFY_NO]);

  return (
    <main className='container py-[30px] lg:py-[60px]'>
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
              {animal.SPECIES_NM} |{' '}
              {animal.SEX_NM === 'F'
                ? '여아'
                : animal.SEX_NM === 'M'
                ? '남아'
                : '성별 정보 없음'}{' '}
            </h2>
            <div className='mt-[30px] space-y-[5px]'>
              <ul className='space-y-2'>
                <li className='flex'>
                  <span className='flex-[0_0_100px] text-lg text-gray-400'>
                    상태{' '}
                  </span>
                  <span className='text-lg'>{animal.STATE_NM}</span>
                </li>
                <li className='flex'>
                  <span className='flex-[0_0_100px] text-lg text-gray-400'>
                    특징{' '}
                  </span>
                  <span className='text-lg'>{animal.SFETR_INFO}</span>
                </li>
                <li className='flex'>
                  <span className='flex-[0_0_100px] text-lg text-gray-400'>
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
                  <span className='flex-[0_0_100px] text-lg text-gray-400'>
                    나이{' '}
                  </span>
                  <span className='text-lg'>{animal.AGE_INFO}</span>
                </li>
                <li className='flex'>
                  <span className='flex-[0_0_100px] text-lg text-gray-400'>
                    보호소{' '}
                  </span>
                  <span className='text-lg'>{animal.SHTER_NM}</span>
                </li>
                <li className='flex'>
                  <span className='flex-[0_0_100px] text-lg text-gray-400'>
                    주소{' '}
                  </span>
                  <span className='text-lg'>{animal.REFINE_ROADNM_ADDR}</span>
                </li>
                <li className='flex'>
                  <span className='flex-[0_0_100px] text-lg text-gray-400'>
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
            <div className='mt-[30px] py-[40px] px-[20px] shadow-md rounded-2xl'>
              <p className='text-xl text-center font-bold'>
                💭 함께할 친구를 기다리고 있어요 💭
              </p>
              <Swiper
                className='mt-[30px]'
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
                      className='block'
                    >
                      <img
                        src={item.IMAGE_COURS}
                        alt={item.SPECIES_NM}
                        className='rounded-md h-[150px] lg:h-[100px] w-full object-cover'
                      />
                      <div className='mt-2 text-sm font-semibold text-center'>
                        <span>{item.SPECIES_NM}</span>∙
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
