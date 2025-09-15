import Accordion from "@/components/common/Accordion"
import Skeleton from "@/components/common/Skeleton"
import { ACCORDIONS } from "@/constants/accordions"

const Home = () => {
  return (
    <Skeleton>
      <div className="flex flex-col gap-6">
        {ACCORDIONS.map((item, index) => (
          <Accordion key={index} title={item.title} content={item.content} />
        ))}
      </div>
    </Skeleton>
  )
}

export default Home