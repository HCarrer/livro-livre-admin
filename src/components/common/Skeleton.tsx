import Image from "next/image"
import Background from "../../../public/icons/background.svg";

const Skeleton = ({
  children,
	position = "center"
}: {
  children: React.ReactNode
	position?: "center" | "top"
}) => {
	return (
		<div className={`relative w-screen h-screen px-6 py-8 flex justify-center ${position === "center" ? "items-center" : "items-start"}`}>
			<div className="z-10 w-full flex flex-col justify-center items-center gap-y-4">
				{children}
			</div>
			<Image src={Background} width={496} height={744} alt="Marca D'agua - Livro Livre" className="absolute z-0" />
		</div>
	)
}

export default Skeleton