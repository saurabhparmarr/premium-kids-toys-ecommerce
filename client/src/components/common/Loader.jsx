const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-6 py-10">
      <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-white/80 px-5 py-4 shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-[#f97316]"></div>
      
        <span className="text-sm font-semibold text-zinc-600">{message}</span>
      </div>
    </div>
  );
};

export default Loader;