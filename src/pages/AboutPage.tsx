import { Link } from 'react-router-dom';

export const AboutPage = () => {
  return (
    <main className='container about_container'>
      <section className='section about_kv'>
        <h2 className='title'>FurFriend</h2>
        <div className='img_box'>
          <img src='./images/logo.gif' alt='' />
        </div>

        <p className='sub_title'>내 성격에 맞는 반려동물을 찾아보세요</p>
      </section>

      <section
        className='section section_content'
        data-aos='fade-up'
        data-aos-duration='1000'
      >
        <div className='section_inner'>
          <h3 className='content_title'>FurFriend란?</h3>
          <p className='content_desc'>
            FurFriend는 <strong>유기동물 입양을 활성화</strong>하기 위해
            <strong>당신의 성격과 가장 잘 맞는 반려동물</strong>을 추천하는
            서비스입니다.
          </p>
          <p className='content_desc'>
            펫BTI 테스트를 통해 <strong>당신의 성향을 분석</strong>하고,
            <strong>
              보호소에서 새 가족을 기다리는 동물들 중 가장 적합한 친구를
              찾아드립니다.
            </strong>
          </p>
        </div>
      </section>

      <section className='section section_content'>
        <div className='section_inner'>
          <h3 className='content_title'>FurFriend의 특징</h3>
          <p className='content_desc'>
            펫BTI 테스트를 통해 <strong>성향에 맞는 반려동물 추천</strong>
          </p>
          <p className='content_desc'>
            <strong>경기도 유기동물 보호소 API</strong>를 통해 입양 가능한
            <strong>동물 정보 제공</strong>
          </p>
        </div>
      </section>

      <section className='section section_content'>
        <div className='section_inner'>
          <h3 className='content_title'>어떻게 시작하나요?</h3>
          <p className='content_desc'>
            아래 버튼을 눌러 <strong>펫BTI 테스트를 진행</strong>하고,
            <br />
            당신과 가장 잘 맞는
            <strong>운명의 반려동물을 만나보세요!</strong>
          </p>
          <Link to='/test' className='btn_black'>
            테스트 시작하기
          </Link>
        </div>
      </section>
    </main>
  );
};
