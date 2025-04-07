import { ReactNode } from 'react';
import { Header } from './Header';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='font-sans text-black bg-white'>
      <Header />
      {children}
    </div>
  );
};
