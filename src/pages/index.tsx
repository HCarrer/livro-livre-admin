import Button from "@/design-system/button"
import Input from "@/design-system/input"

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

const FONTS = [
  "text-f1",
  "text-f2",
  "text-f3",
  "text-f4",
  "text-f5",
  "text-f6",
  "text-f7",
]

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen py-10 gap-8">
      <p className="text-f1 font-extrabold mb-8">Design System Livro Livre</p>
      <div className="grid grid-cols-3 gap-4">
        {COLORS.map((color) => (
          <div key={color} className={`p-4 font-medium border ${color}`}>
            {color.replace("bg", "").replaceAll("-", " ")}
          </div>
        ))}
      </div>
      <div>
        <div className="flex flex-col gap-2">
          {FONTS.map((font, i) => (
            <div key={i} className={font}>
              {font}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="grid grid-cols-5 gap-4">
          <Button variant="main" label="main" onClick={() => alert('main')}/>
          <Button variant="secondary" label="secondary" onClick={() => alert('secondary')}/>
          <Button variant="tertiary" label="tertiary" onClick={() => alert('tertiary')}/>
          <Button variant="outline" label="outline" onClick={() => alert('outline')}/>
          <Button variant="primaryOutline" label="primaryOutline" onClick={() => alert('primaryOutline')}/>
          <Button disabled variant="main" label="main" onClick={() => alert('main')}/>
          <Button disabled variant="secondary" label="secondary" onClick={() => alert('secondary')}/>
          <Button disabled variant="tertiary" label="tertiary" onClick={() => alert('tertiary')}/>
          <Button disabled variant="outline" label="outline" onClick={() => alert('outline')}/>
          <Button disabled variant="primaryOutline" label="primaryOutline" onClick={() => alert('primaryOutline')}/>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4">
          <Input label="Label" placeholder="Placeholder" />
          <Input label="With Value" placeholder="Placeholder" value="Jhon Doe"/>
          <Input label="With Error" placeholder="Placeholder" errorMessage="Mensagem de erro" value="Valor do campo" />
          <Input label="Disabled" placeholder="Placeholder" disabled />
          <Input label="With search icon" placeholder="Placeholder" icon="search" />
          <Input label="With avatar icon" placeholder="Placeholder" icon="avatar" />
          <Input label="With closedEye icon" placeholder="Placeholder" icon="closedEye" />
          <Input label="With openEye icon" placeholder="Placeholder" icon="openEye" />
        </div>
      </div>
    </div>
  )
}

export default Home