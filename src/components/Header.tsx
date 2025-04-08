import { useState } from 'react';
import { Link } from 'react-router';
import logo from '/images/logo.gif';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link to='/test'>펫BTI 테스트</Link>
          </li>
          <li>
            <Link to='/animals'>유기동물 정보</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
