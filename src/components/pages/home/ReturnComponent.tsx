import { RETURN_BUTTON_LABEL } from "@/constants/common";
import Button from "@/design-system/button";
import { DrawerButtonProps } from "@/interfaces/drawers";

const ReturnComponent = ({ facets }: DrawerButtonProps) => {
  return (
    <Button
      variant="secondary"
      className="w-full"
      label={RETURN_BUTTON_LABEL}
      disabled={(facets?.pending || 0) === 0}
      type="button"
    />
  );
};

export default ReturnComponent;
