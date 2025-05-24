import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const imageList = [
  '/images/bordercollie.jpg',
  '/images/jindo.jpg',
  '/images/korean_cat.jpg',
  '/images/rabbit.jpg',
  '/images/hamster.jpg',
];

const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(imageList[0]);
  const imgBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * imageList.length);
      setCurrentImage(imageList[random]);
    }, 3000);

    const handleMouseMove = (e: MouseEvent) => {
      const imgBox = imgBoxRef.current;
      if (!imgBox) return;

      const x = (window.innerWidth / 2 - e.pageX) / 50;
      const y = (window.innerHeight / 2 - e.pageY) / 50;
      imgBox.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <main className='flex items-center h-[calc(100vh-75px)]'>
      <section className='flex flex-col md:flex-row items-center justify-center mx-auto py-[20px] gap-[20px]'>
        <motion.div
          className='flex flex-1 max-w-[50%] justify-center items-center'
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className='transition-transform duration-[500ms] ease-out [transform:perspective(1000px)_rotateY(0deg)]'
            ref={imgBoxRef}
          >
            <img
              src={currentImage}
              alt='랜덤 동물 이미지'
              className='w-full max-w-[450px] grayscale-[30%] transition-[transform,filter] duration-[500ms] ease-in-out rounded-[20px] shadow-[10px_10px_30px_rgba(0,0,0,0.1)]'
            />
          </div>
        </motion.div>
        <motion.div
          className='flex-1 max-w-[450px] text-center'
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='font-[700] text-[60px]'>FurFriend</h2>
          <span className='block mt-[10px] text-[20px]'>
            내 성격에 맞는 털복숭이 친구 찾기
          </span>
          <p className='mt-[10px]'>
            FurFriend는 내 성격에 딱 맞는
            <br />
            반려동물을 찾아주는 사이트 입니다
          </p>
          <Link to='/test' className='btn_black'>
            테스트 시작하기
          </Link>
        </motion.div>
      </section>
    </main>
  );
};

export default HomePage;
