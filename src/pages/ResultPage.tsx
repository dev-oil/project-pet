import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import animals from '../data/animals.json';
import { fetchShelterAnimals } from '../services/shelterAPI';
import { MBTIType } from '../types/mbti';

type Animal = {
  category: string;
  name: string;
  description: string;
  image: string;
};

type AnimalsMap = {
  [key in MBTIType]: Animal;
};

export const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const mbti: MBTIType | null =
    location.state?.mbti ||
    (localStorage.getItem('resultMBTI') as MBTIType | null);

  const pet = (animals as AnimalsMap)[mbti as MBTIType];

  // MBTI 없으면 홈으로 리다이렉트
  useEffect(() => {
    if (!mbti) {
      navigate('/test');
    }
  }, [mbti, navigate]);

  // shelterAnimals 불러오기
  const { data: shelterAnimals = [], isLoading } = useQuery({
    queryKey: ['shelterAnimals', pet?.name],
    queryFn: () => fetchShelterAnimals(pet.name),
    enabled: !!pet,
  });

  return (
    <main className='max-w-[1200px] m-auto'>
      <motion.section
        className='flex flex-col justify-center items-center min-h-screen px-5 py-[50px] text-center'
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className='pb-[15px] text-[30px] font-bold border-b border-[#999]'>
          당신의 펫BTI 유형은{' '}
          <span className='text-[40px] font-black'>{mbti}</span>
        </h2>
        <strong className='mt-[15px] text-[20px] text-[#999]'>
          추천 반려동물
        </strong>
        <div className=''>
          <strong className='block mt-[5px] text-[25px]'>{pet.name}</strong>
          <p className='mt-[10px]'>{pet.description}</p>
          <div className='w-[200px] h-[200px] mt-[20px] mx-auto rounded-[12px] overflow-hidden object-cover shadow-[5px_5px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out hover:scale-105'>
            <img
              src={pet.image}
              alt={pet.name}
              className='w-full h-full object-cover'
            />
          </div>
        </div>
        <button
          className='btn_black mt-6'
          onClick={() => {
            navigate('/test');
          }}
        >
          다시 시작하기
        </button>
      </motion.section>

      <motion.section
        className='flex flex-col justify-center items-center min-h-screen px-5 py-[50px] text-center border-t border-black'
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h2 className='pb-[15px] text-[30px] font-bold border-b border-[#999]'>
          입양 가능한 유기동물
        </h2>

        {isLoading ? (
          <p className='mt-10'>유기동물을 불러오는 중입니다...</p>
        ) : shelterAnimals.length > 0 ? (
          <p className='mt-[10px]'>
            당신과 잘 맞는 <strong>{pet.name}</strong> 유기동물을 확인하세요!
          </p>
        ) : (
          <p className='mt-[10px]'>
            <strong>정확히 일치하는 품종은 찾지 못했어요!</strong>
            <br />
            대신, 친구가 되어줄 준비가 된 사랑스러운 아이들을 추천드릴게요 💛
            <br />
            마음이 이끄는 대로, 새로운 친구를 만나보세요 🐾
          </p>
        )}

        <ul className='flex flex-wrap gap-[30px] items-center justify-center mt-6'>
          {shelterAnimals.map((animal) => (
            <li key={animal.ABDM_IDNTFY_NO}>
              <div className='w-[200px] h-[200px] rounded-[12px] overflow-hidden object-cover shadow-md transition-transform hover:scale-105'>
                <img
                  src={animal.IMAGE_COURS}
                  alt={animal.SPECIES_NM}
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='flex flex-col mt-[10px] text-center'>
                <span>{animal.SPECIES_NM}</span>
                <span>{animal.SHTER_NM}</span>
              </div>
            </li>
          ))}
        </ul>

        <Link to='/animals' className='btn_black mt-10'>
          더 많은 유기동물 보러가기
        </Link>
      </motion.section>
    </main>
  );
};
