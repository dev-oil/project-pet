import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // 1. 컴포넌트 처음 렌더링 시 localStorage 읽기
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error('로컬 스토리지 읽기 에러:', error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    // 2. React 상태 변경 + localStorage 동기화
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('로컬 스토리지 세팅 에러:', error);
    }
  };

  useEffect(() => {
    // 3. 다른 탭에서 localStorage 변경될 때 감지
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(
          event.newValue ? JSON.parse(event.newValue) : initialValue
        );
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue] as const;
};
