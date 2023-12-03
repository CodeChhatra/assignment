import React from 'react';

const Pagination = ({ setCurrentPage, numbers, currentPage, npages }) => {
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < npages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className='flex items-center justify-center mt-8'>
      <div className='flex rounded-md'>
        <button
          onClick={() => setCurrentPage(1)}
          className={`${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          } px-3 py-1 rounded-l-md border border-gray-300 bg-white hover:bg-gray-100`}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        <button
          onClick={handlePrev}
          className={`${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          } px-3 py-1 border-t border-b border-gray-300 bg-white hover:bg-gray-100`}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {numbers.map((n, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(n)}
            className={`${
              currentPage === n
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700'
            } px-3 py-1 border-t border-b border-gray-300 hover:bg-gray-100`}
          >
            {n}
          </button>
        ))}
        <button
          onClick={handleNext}
          className={`${
            currentPage === npages ? 'opacity-50 cursor-not-allowed' : ''
          } px-3 py-1 border-t border-b border-gray-300 bg-white hover:bg-gray-100`}
          disabled={currentPage === npages}
        >
          {">"}
        </button>
        <button
          onClick={() => setCurrentPage(npages)}
          className={`${
            currentPage === npages ? 'opacity-50 cursor-not-allowed' : ''
          } px-3 py-1 rounded-r-md border border-gray-300 bg-white hover:bg-gray-100`}
          disabled={currentPage === npages}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
