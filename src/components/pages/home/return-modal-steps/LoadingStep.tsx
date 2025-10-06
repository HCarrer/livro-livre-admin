import { LoaderCircle } from "lucide-react";

const LoadingStep = () => {
  return (
    <div className="flex flex-col items-center gap-y-8 py-24">
      <LoaderCircle className="animate-spin" size={72} />
      <p className="text-f4 text-navy-blue">Pesquisando o livro...</p>
    </div>
  );
};

export default LoadingStep;
