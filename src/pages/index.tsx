const COLORS = [
"bg-soft-white",
"bg-soft-lilac",
"bg-soft-sand",
"bg-power-blue",
"bg-navy-blue",
"bg-soft-blue",
"bg-disabled-grey",
"bg-error-red",
"bg-disabled-blue",
"bg-disabled-navy",
"bg-softest-blue",
"bg-softest-lilac",
"bg-power-blue-disabled",
]

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <p className="text-4xl font-extrabold mb-8">Design System Livro Livre</p>
      <div className="grid grid-cols-3 gap-4">
        {COLORS.map((color) => (
          <div key={color} className={`p-4 border ${color}`}>
            {color.replace("bg", "").replaceAll("-", " ")}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home