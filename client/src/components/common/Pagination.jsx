import React from "react";

const Pagination = ({
  page,
  pages,
  onPageChange,
}) => {
  if (pages <= 1) return null;

  return (
    <div className="flex justify-center gap-4 mt-10">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="font-semibold">
        {page} / {pages}
      </span>

      <button
        disabled={page === pages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;