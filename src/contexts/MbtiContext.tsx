import React, { createContext, useContext } from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { MBTIType } from '../types/mbti';

type MbtiContextType = {
  mbti: MBTIType | null;
  setMbti: (value: MBTIType) => void;
};

const MbtiContext = createContext<MbtiContextType | undefined>(undefined);

export const MbtiProvider = ({ children }: { children: React.ReactNode }) => {
  const [mbti, setMbti] = useLocalStorage<MBTIType | null>('resultMBTI', null);

  return (
    <MbtiContext.Provider value={{ mbti, setMbti }}>
      {children}
    </MbtiContext.Provider>
  );
};

export const useMbti = () => {
  const context = useContext(MbtiContext);
  if (!context) {
    throw new Error('useMbti가 provider 안에서 사용되어야 함');
  }
  return context;
};
