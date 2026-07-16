import { Star } from "lucide-react";

const Rating = ({ value, reviews }) => {
  return (
    <div className="flex items-center gap-1">

      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={18}
          fill={star <= value ? "#facc15" : "none"}
          color="#facc15"
        />
      ))}

      <span className="text-sm text-gray-500 ml-2">
        ({reviews} Reviews)
      </span>

    </div>
  );
};

export default Rating;