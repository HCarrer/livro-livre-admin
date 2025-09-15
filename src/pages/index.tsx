import Accordeon from "@/components/common/Accordeon"
import Skeleton from "@/components/common/Skeleton"
import { ACCORDEONS } from "@/constants/accordeons"

const Home = () => {
  return (
    <Skeleton>
      <div className="flex flex-col gap-6">
        {ACCORDEONS.map((item, index) => (
          <Accordeon key={index} title={item.title} content={item.content} />
        ))}
      </div>
    </Skeleton>
  )
}

export default Home