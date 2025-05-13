import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import logo from '/images/logo.gif';

import { useMbti } from '../contexts/MbtiContext';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { mbti } = useMbti();

  const handleTestClick = () => {
    if (mbti) {
      navigate('/result'); // 상태 넘기지 않아도 항상 Context에서 최신 값 사용 가능
    } else {
      navigate('/test');
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
          <li>
            <Link to='/favorites'>찜한 친구들</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
