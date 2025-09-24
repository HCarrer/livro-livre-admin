import Accordion from "@/components/common/Accordion";
import NavBar from "@/components/common/NavBar";
import Skeleton from "@/components/common/Skeleton";
import UserScore from "@/components/common/UserScore";
import WelcomeBanner from "@/components/common/WelcomeBanner";
import RentComponent from "@/components/pages/home/RentComponent";
import { ACCORDIONS } from "@/constants/accordions";
import { RETURN_BUTTON_LABEL } from "@/constants/common";
import Button from "@/design-system/button";
import { Bell } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(false);
  return (
    <Skeleton position="top">
      <div className="w-full flex flex-col gap-y-6">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col text-navy-blue">
            {/* TODO: pegar nome real */}
            <p className="text-f2 font-bold">Oi, Jhon</p>
            <p className="text-f6 font-medium">Bem vindo de volta</p>
          </div>
          <div className="flex items-center gap-x-2 w-fit rounded-full bg-soft-white p-1 drop-shadow-[0px_0px_10px_#00000020]">
            {/* TODO: so mostrar se tiver notificacoes */}
            <div className="relative flex justify-center items-center w-11 aspect-square rounded-full">
              <div className="absolute top-1.5 right-1.5 w-2 aspect-square rounded-full bg-power-blue animate-ping" />
              <div className="absolute top-1.5 right-1.5 w-2 aspect-square rounded-full bg-power-blue" />
              <Bell size={28} strokeWidth={2} className="text-navy-blue" />
            </div>
            <div className="flex justify-center items-center w-11 aspect-square rounded-full bg-navy-blue">
              {/* TODO: imagem aqui */}
              <p className="text-white font-semibold text-f4 !leading-[20px]">
                J
              </p>
            </div>
          </div>
        </div>
        {/* TODO: so mostrar no primeiro acesso do usuário */}
        {showWelcomeBanner ? <WelcomeBanner /> : null}
        <UserScore booksRead={10} booksToReturn={5} />
        <div className="w-full flex flex-col gap-y-4 p-5 bg-soft-white rounded-[20px] drop-shadow-[0px_0px_10px_#00000020]">
          {/* TODO: deixar botoes funcionais */}
          <RentComponent />
          <Button
            variant="secondary"
            className="w-full"
            label={RETURN_BUTTON_LABEL}
            type="button"
          />
        </div>
        <div className="flex flex-col gap-6">
          {ACCORDIONS.map((item, index) => (
            <Accordion key={index} title={item.title} content={item.content} />
          ))}
        </div>
      </div>
      <NavBar />
    </Skeleton>
  );
};

export default Home;
