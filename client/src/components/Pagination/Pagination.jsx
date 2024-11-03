import React from 'react';
import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  const pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className='mb-3'>
      <div className="flex items-center justify-center w-full">
        <div className="join w-full flex items-center justify-center">
          <button
            className="join-item btn bg-primary"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <GrPrevious />
          </button>
          {pagesToShow.map((page) => (
            <button
              key={page}
              className={`join-item btn ${currentPage === page ? 'btn-primary' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="join-item btn bg-primary"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <GrNext />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
