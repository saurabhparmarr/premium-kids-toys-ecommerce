const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search toys..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-orange-100 md:w-96"
    />
  );
};

export default SearchBar;