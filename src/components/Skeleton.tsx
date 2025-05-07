export const Skeleton = () => {
  return (
    <main className='max-w-[1400px] mx-auto px-[20px] py-[40px] animate-pulse'>
      <h2 className='h-[40px] bg-gray-300 rounded w-[300px] mx-auto mb-6'></h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10'>
        {Array(8)
          .fill(null)
          .map((_, i) => (
            <div key={i} className='h-[250px] bg-gray-200 rounded-xl'></div>
          ))}
      </div>
    </main>
  );
};
