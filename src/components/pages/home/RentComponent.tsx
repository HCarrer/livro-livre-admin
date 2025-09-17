import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { RENT_BUTTON_LABEL } from "@/constants/common";
import Button from "@/design-system/button";

const RentComponent = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="main"
          className="w-full"
          label={RENT_BUTTON_LABEL}
          type="button"
        />
      </DrawerTrigger>
      <DrawerContent>
        <p>Conteúdo do Drawer</p>
      </DrawerContent>
    </Drawer>
  );
};

export default RentComponent;
