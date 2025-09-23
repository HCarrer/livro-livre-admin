import { HelpCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface UserScoreProps {
  booksRead?: number;
  booksToReturn?: number;
}

const UserScore = ({ booksRead = 0, booksToReturn = 0 }: UserScoreProps) => {
  const [componentLoaded, setComponentLoaded] = useState(false);

  useEffect(() => {
    setComponentLoaded(true);
  }, []);

  // TODO: rever calculo
  const userRating = useMemo(
    () => 5 * (1 - booksToReturn / (booksToReturn + booksRead)),
    [booksRead, booksToReturn],
  );

  const ratingBarColor = useMemo(() => {
    if (userRating <= 2) return "#C00000"; // error-red
    if (userRating <= 4) return "#DBD826";
    return "#2F88E0"; // power-blue
  }, [userRating]);

  // TODO: fix de document is not defined
  const ratingBarWidth = useMemo(() => {
    if (!componentLoaded) return;
    const barElement = document.querySelector(
      "#user_rating_bar",
    ) as HTMLElement;
    if (!barElement) return "0px";
    const rating = Math.floor(userRating) >= 5 ? 5 : Math.floor(userRating);
    const fillPctg = rating / 5;
    return `${fillPctg * barElement.clientWidth}px`;
  }, [componentLoaded, document, userRating]);

  if (!componentLoaded) return null;

  return (
    <div className="w-full drop-shadow-[0px_0px_10px_#00000020] flex flex-col gap-y-2 p-5 bg-navy-blue rounded-[20px] text-white">
      <p className="text-f4 font-light">
        Livros lidos: <span className="font-semibold">{booksRead}</span>
      </p>
      <p className="text-f4 font-light">
        Devoluções pendentes:{" "}
        <span className="font-semibold">{booksToReturn}</span>
      </p>
      <div className="flex flex-col gap-y-1">
        <p className="flex items-end text-f4 font-light">
          <span className="mr-1">Minha nota: </span>
          {/* TODO: tooltip */}
          <HelpCircle size={16} />
        </p>
        <div className="relative w-full h-3" id="user_rating_bar">
          <div className="absolute z-20 top-0 left-0 w-full h-full rounded-full border border-white" />
          <div
            className="absolute z-10 top-0 left-0 h-full rounded-full"
            style={{ backgroundColor: ratingBarColor, width: ratingBarWidth }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserScore;
