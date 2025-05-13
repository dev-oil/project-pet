import { FallbackProps } from 'react-error-boundary';

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div className='text-center py-20'>
    <h2 className='text-2xl font-bold mb-4'>문제가 발생했습니다 🐾</h2>
    <p>{error.message}</p>
    <button className='btn_black mt-4' onClick={resetErrorBoundary}>
      다시 시도하기
    </button>
  </div>
);
