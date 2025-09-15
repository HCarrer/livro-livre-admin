import { HISTORY, HOME, PROFILE, SEARCH } from "@/constants/routes"
import { BookPlus, CircleUserRound, History, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

type Section = 'history' | 'home' | 'search' | 'profile'

interface SectionItem {
	id: Section
	icon: React.ElementType
	route: string
}

const SECTIONS: SectionItem[] = [
	{ id: 'history', icon: History, route: HISTORY },
	{ id: 'home', icon: BookPlus, route: HOME },
	{ id: 'search', icon: Search, route: SEARCH },
	{ id: 'profile', icon: CircleUserRound, route: PROFILE },
]

const NavBar = () => {
	const [selected, setSelected] = useState<Section>('home')

	const router = useRouter()

	useEffect(() => {
		const path = router.pathname
		const section = SECTIONS.find(section => section.route === path)
		if (section) {
			setSelected(section.id)
		} else {
			setSelected('home')
		}
	}, [router.pathname])

	return (
		<div className="fixed bottom-6 left-6 z-10 w-[328px] p-1 border border-white bg-linear-to-b from-navy-blue/40 to-navy-blue/60 backdrop-blur-[5px] rounded-full flex justify-between items-center drop-shadow-[0px_0px_20px_#00000040]">
			{SECTIONS.map((section, index) => (
				<Link key={index} href={section.route} className={`w-11 aspect-square rounded-full flex justify-center items-center ${selected === section.id ? "bg-white" : ""}`}>
					<section.icon size={28} strokeWidth={2} className={selected === section.id ? "text-navy-blue" : "text-white"} />
				</Link>
			))}
		</div>
	)
}

export default NavBar