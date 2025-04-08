import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const imageList = [
  '/images/bordercollie.jpg',
  '/images/jindo.jpg',
  '/images/korean_cat.jpg',
  '/images/rabbit.jpg',
  '/images/hamster.jpg',
];

export const HomePage = () => {
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
    <main className='main_container'>
      <section className='section'>
        <div className='img_area'>
          <div className='img_box' ref={imgBoxRef}>
            <img src={currentImage} alt='랜덤 동물 이미지' />
          </div>
        </div>
        <div className='info_area'>
          <h2 className='title'>FurFriend</h2>
          <span className='sub_title'>내 성격에 맞는 털복숭이 친구 찾기</span>
          <p className='desc'>
            FurFriend는 내 성격에 딱 맞는
            <br />
            반려동물을 찾아주는 사이트 입니다
          </p>
          <Link to='/test' className='btn_black'>
            테스트 시작하기
          </Link>
        </div>
      </section>
    </main>
  );
};
