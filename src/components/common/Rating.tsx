import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  score: number;
}

const Rating = ({ score }: RatingProps) => {
  const fullStars = Math.floor(score) >= 5 ? 5 : Math.floor(score);
  const halfStar = score - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="flex items-end gap-x-0.5">
      {Array.from({ length: fullStars }, (_, i) => (
        <Star
          key={`full-${i}`}
          className="inline"
          fill="var(--power-blue)"
          size={16}
        />
      ))}
      {halfStar && (
        <div className="w-fit relative">
          <StarHalf className="" fill="var(--power-blue)" size={16} />
          <StarHalf className="absolute left-0 top-0 scale-x-[-1]" size={16} />
        </div>
      )}
      {Array.from({ length: emptyStars }, (_, i) => (
        <Star key={`empty-${i}`} className="inline" fill="none" size={16} />
      ))}
    </div>
  );
};

export default Rating;
