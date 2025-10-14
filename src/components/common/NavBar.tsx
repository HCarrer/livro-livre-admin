import { HISTORY, HOME, PROFILE, SEARCH } from "@/constants/routes";
import { BookPlus, CircleUserRound, History, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

type Section = "history" | "home" | "search" | "profile";

interface SectionItem {
  id: Section;
  icon: React.ElementType;
  route: string;
}

const SECTIONS: SectionItem[] = [
  { id: "history", icon: History, route: HISTORY },
  { id: "home", icon: BookPlus, route: HOME },
  { id: "search", icon: Search, route: SEARCH },
  { id: "profile", icon: CircleUserRound, route: PROFILE },
];

const PADDING_PX = 4;
const SECTION_COUNT = SECTIONS.length;

const NavBar = () => {
  const [selected, setSelected] = useState<Section>("home");
  const [activeIndex, setActiveIndex] = useState<number>(1);

  const router = useRouter();

  useEffect(() => {
    const path = router.pathname;
    const section = SECTIONS.find((s) => s.route === path);
    const idx = section
      ? SECTIONS.findIndex((s) => s.id === section.id)
      : SECTIONS.findIndex((s) => s.id === "home");
    setSelected(section ? section.id : "home");
    setActiveIndex(idx >= 0 ? idx : 1);
  }, [router.pathname]);

  const offsetLeft = useMemo(() => {
    // corrige o offset para o primeiro e último itens
    if (activeIndex === 0) return PADDING_PX;
    if (activeIndex === SECTION_COUNT - 1) return -PADDING_PX / 2;
    return 0;
  }, [activeIndex]);

  return (
    <div className="fixed bottom-6 px-6 z-10 w-full">
      <div className="relative p-1 border border-white bg-gradient-to-b from-navy-blue/40 to-navy-blue/60 backdrop-blur-[5px] rounded-full flex items-center drop-shadow-[0px_0px_20px_#00000040]">
        <div
          aria-hidden
          className="absolute bg-white rounded-full transition-all duration-200 ease-in-out"
          style={{
            left: `calc((100% / ${SECTION_COUNT}) * ${activeIndex} + ${offsetLeft}px)`,
            width: `calc((100% / ${SECTION_COUNT}) - ${PADDING_PX / 2}px)`,
            height: `calc(100% - ${PADDING_PX * 2}px)`,
          }}
        />

        {SECTIONS.map((section) => (
          <Link
            key={section.id}
            href={section.route}
            id={`nav-${section.id}`}
            className="relative z-10 flex-1 rounded-full flex justify-center items-center h-13"
          >
            <section.icon
              size={28}
              strokeWidth={2}
              className={`transition-colors duration-200 ease-in-out ${
                selected === section.id ? "text-navy-blue" : "text-white"
              }`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
``;
