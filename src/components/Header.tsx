import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import logo from '/images/logo.gif';

import { usePetBTIStore } from '../stores/petBTIStore';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { answers } = usePetBTIStore();

  const handleTestClick = () => {
    if (answers.length === 4) {
      navigate('/result'); // 테스트 완료 시 결과로
    } else {
      navigate('/test'); // 그 외에는 테스트 시작
    }
    setIsOpen(false); // 메뉴 닫기
  };

  return (
    <header className='header'>
      <h1 className='logo'>
        <Link to='/' className='logo_link'>
          <img src={logo} alt='' />
          <span className='sr-only'>FurFriend</span>
        </Link>
      </h1>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`hamburger ${isOpen ? 'is_show' : ''}`}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`nav ${isOpen ? 'is_show' : ''}`}>
        <ul>
          <li>
            <Link to='/about'>소개</Link>
          </li>
          <li>
            <button onClick={handleTestClick}>펫BTI 테스트</button>
          </li>
          <li>
            <Link to='/animals'>유기동물 정보</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
