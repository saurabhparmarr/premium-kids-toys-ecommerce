const Pagination = ({
  page,
  pages,
  onPageChange,
}) => {
  if (pages <= 1) return null;

  return (
    <div className="mt-12 flex flex-wrap justify-center gap-2">
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)} className="rounded-2xl border border-orange-100 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-[#f97316] hover:text-[#f97316] disabled:cursor-not-allowed disabled:opacity-50">
        Prev
      </button>

      {Array.from({ length: pages }).map((_, index) => (
        <button key={index} onClick={() => onPageChange(index + 1)} className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${page === index + 1 ? "bg-[#f97316] text-white shadow-[0_10px_25px_rgba(249,115,22,0.16)]" : "border border-orange-100 bg-white text-zinc-700 hover:border-[#f97316] hover:text-[#f97316]"}`}>
          {index + 1}
        </button>
      ))}

      <button disabled={page === pages} onClick={() => onPageChange(page + 1)} className="rounded-2xl border border-orange-100 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-[#f97316] hover:text-[#f97316] disabled:cursor-not-allowed disabled:opacity-50">
        Next
      </button>
    </div>
  );
};

export default Pagination;