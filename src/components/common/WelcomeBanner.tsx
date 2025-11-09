import { auth, db } from "+/authentication/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { X } from "lucide-react";
import { useState } from "react";

const WelcomeBanner = () => {
  const [isOpen, setIsOpen] = useState(true);

  const close = async () => {
    if (!auth.currentUser) return;
    const userDocRef = doc(db, "users", auth.currentUser.uid);

    updateDoc(userDocRef, {
      hasClosedWelcomeBanner: true,
      updatedAt: new Date(),
    }).then(() => {
      setIsOpen(false);
    });
  };

  return (
    <div
      className={`w-full overflow-hidden transition-all duration-200 ease-in-out drop-shadow-[0px_0px_10px_#00000020] ${isOpen ? "max-h-96" : "max-h-0"}`}
    >
      <div className="w-full flex flex-col p-5 bg-soft-blue rounded-[20px]">
        <div className="flex justify-between items-start">
          <p className="text-f3 font-bold">Bem vindo!</p>
          <button type="button" onClick={close}>
            <X size={16} strokeWidth={2} className="text-navy-blue" />
          </button>
        </div>
        <p className="text-f7 text-navy-blue mt-5">
          No Livro Livre você alugará livros grátis e sem burocracias. Pegue um
          livro em uma estante, devolva em qualquer outra.{" "}
          <span className="font-bold text-power-blue">
            Simples. Rápido. Gratuito!
          </span>
        </p>
      </div>
    </div>
  );
};

export default WelcomeBanner;
