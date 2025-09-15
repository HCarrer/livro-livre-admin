import { ChevronDown } from "lucide-react"
import { useState } from "react"

export interface AccordionProps {
	title: string
	content: React.ReactNode | string
}

const Accordion = ({ title, content }: AccordionProps) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="w-full flex flex-col p-5 bg-soft-white rounded-[20px] drop-shadow-[0px_0px_10px_#00000020]">
			<button type="button" className="flex justify-between items-end text-navy-blue" onClick={() => setIsOpen(!isOpen)}>
				<p className="text-f3 font-bold">{title}</p>
				<ChevronDown className={`transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`} size={20} strokeWidth={3}/>
			</button>
			<div className={`transition-all duration-200 ease-in-out overflow-hidden font-medium ${isOpen ? "max-h-96 mt-5" : "max-h-0"}`}>
				{typeof content === "string" ? (
					<p className="text-f7 text-default-grey">
						{content}
					</p>
				) : content}
			</div>
		</div>
	)
}

export default Accordion