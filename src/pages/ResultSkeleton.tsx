export const ResultSkeleton = () => (
  <main className='max-w-[1200px] m-auto'>
    <div className='flex flex-col justify-center items-center min-h-screen px-5 py-[50px] text-center animate-pulse'>
      <div className='h-[30px] w-[240px] bg-gray-300 rounded mb-4'></div>
      <div className='h-[20px] w-[180px] bg-gray-200 rounded mb-2'></div>
      <div className='w-[200px] h-[200px] bg-gray-300 rounded-xl'></div>
      <div className='w-[120px] h-[40px] mt-6 bg-gray-400 rounded'></div>
    </div>

    <div className='flex flex-col justify-center items-center min-h-screen px-5 py-[50px] text-center border-t border-black animate-pulse'>
      <div className='h-[30px] w-[300px] bg-gray-300 rounded mb-6'></div>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className='w-[200px] h-[220px] bg-gray-200 rounded-xl'
            ></div>
          ))}
      </div>
      <div className='mt-[30px] w-[200px] h-[40px] bg-gray-400 rounded'></div>
    </div>
  </main>
);
