export const ErrorFallback = ({ error }: { error: Error }) => (
  <div className='text-center p-10'>
    <h2 className='text-xl font-bold text-red-600'>문제가 발생했어요 😢</h2>
    <p className='mt-2 text-gray-500 text-sm'>{error.message}</p>
    <p className='mt-4'>잠시 후 다시 시도해주세요.</p>
  </div>
);
