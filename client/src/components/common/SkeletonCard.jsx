const SkeletonCard = () => {
  return (
    <div className="animate-pulse border rounded-xl p-4">
      <div className="bg-gray-300 h-48 rounded"></div>

      <div className="bg-gray-300 h-5 mt-4 rounded"></div>

      <div className="bg-gray-300 h-4 mt-2 rounded w-2/3"></div>

      <div className="bg-gray-300 h-10 mt-5 rounded"></div>
    </div>
  );
};

export default SkeletonCard;