import { HelpCircle } from "lucide-react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface UserScoreProps {
  booksRead?: number;
  booksToReturn?: number;
}

const UserScore = ({ booksRead = 0, booksToReturn = 0 }: UserScoreProps) => {
  const ref = useRef(null);
  const [progressBarWidth, setProgressBarWidth] = useState("0%");
  const [showTooltip, setShowTooltip] = useState(false);

  // TODO: rever calculo
  const userRating = useMemo(() => {
    const total = booksToReturn + booksRead;
    if (total === 0) {
      return 0;
    }
    return 5 * (1 - booksToReturn / total);
  }, [booksRead, booksToReturn]);

  useLayoutEffect(() => {
    const rating = Math.floor(userRating) >= 5 ? 5 : Math.floor(userRating);
    const fillPctg = (rating * 100) / 5;
    setProgressBarWidth(`${fillPctg}%`);
  }, [ref.current, userRating]);

  const ratingBarColor = useMemo(() => {
    if (userRating <= 2) return "var(--error-red)";
    if (userRating <= 4) return "var(--warning-yellow)";
    return "var(--power-blue)";
  }, [userRating]);

  return (
    <div className="w-full drop-shadow-[0px_0px_10px_#00000020] flex flex-col gap-y-2 p-5 bg-navy-blue rounded-[20px] text-white">
      <p className="text-f4 font-light">
        Livros lidos: <span className="font-semibold">{booksRead}</span>
      </p>
      <p className="text-f4 font-light">
        Devoluções pendentes:{" "}
        <span className="font-semibold">{booksToReturn}</span>
      </p>
      <div className="relative flex flex-col gap-y-1">
        <p className="flex items-end text-f4 font-light">
          <span className="mr-1">Minha nota: </span>
          <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
            <TooltipTrigger>
              <HelpCircle size={16} />
            </TooltipTrigger>
            <TooltipContent className="text-white font-semibold">
              <p>Taxa entre livros lidos e devoluções pendentes.</p>
            </TooltipContent>
          </Tooltip>
        </p>
        <div className="relative w-full h-3" id="user_rating_bar">
          <div className="absolute z-20 top-0 left-0 w-full h-full rounded-full border border-white" />
          <div
            ref={ref}
            className="absolute z-10 top-0 left-0 h-full rounded-full transition-all duration-200 ease-in-out"
            style={{ backgroundColor: ratingBarColor, width: progressBarWidth }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserScore;
