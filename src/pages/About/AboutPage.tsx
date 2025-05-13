import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const AboutPage = () => {
  return (
    <main className='w-full mx-auto text-center'>
      <motion.section
        className='h-screen flex flex-col justify-center items-center'
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className='text-[100px] font-black tracking-[-2px]'>FurFriend</h2>
        <div>
          <img src='./images/logo.gif' alt='' />
        </div>

        <p className='text-[30px] text-[#555]'>
          내 성격에 맞는 반려동물을 찾아보세요
        </p>
      </motion.section>

      <motion.section
        className='my-[80px] px-[40px] py-[80px]'
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ amount: 0.2 }}
      >
        <h3 className='font-bold text-[50px]'>FurFriend란?</h3>
        <p className='mt-[10px] text-[20px]'>
          FurFriend는 <strong>유기동물 입양을 활성화</strong>하기 위해
          <strong>당신의 성격과 가장 잘 맞는 반려동물</strong>을 추천하는
          서비스입니다.
        </p>
        <p className='mt-[10px] text-[20px]'>
          펫BTI 테스트를 통해 <strong>당신의 성향을 분석</strong>하고,
          <strong>
            보호소에서 새 가족을 기다리는 동물들 중 가장 적합한 친구를
            찾아드립니다.
          </strong>
        </p>
      </motion.section>

      <motion.section
        className='my-[80px] px-[40px] py-[80px]'
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ amount: 0.2 }}
      >
        <h3 className='font-bold text-[50px]'>FurFriend의 특징</h3>
        <p className='mt-[10px] text-[20px]'>
          펫BTI 테스트를 통해 <strong>성향에 맞는 반려동물 추천</strong>
        </p>
        <p className='mt-[10px] text-[20px]'>
          <strong>경기도 유기동물 보호소 API</strong>를 통해 입양 가능한
          <strong>동물 정보 제공</strong>
        </p>
      </motion.section>

      <motion.section
        className='my-[80px] px-[40px] py-[80px]'
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ amount: 0.2 }}
      >
        <h3 className='font-bold text-[50px]'>어떻게 시작하나요?</h3>
        <p className='mt-[10px] text-[20px]'>
          아래 버튼을 눌러 <strong>펫BTI 테스트를 진행</strong>하고,
          <br />
          당신과 가장 잘 맞는
          <strong>운명의 반려동물을 만나보세요!</strong>
        </p>
        <Link to='/test' className='btn_black'>
          테스트 시작하기
        </Link>
      </motion.section>
    </main>
  );
};
