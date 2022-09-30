import cx from "classnames";
import { Button } from "flowbite-react";
import { HiOutlineArrowLeft } from "react-icons/hi";

import { useMobile } from "../hooks/useIsMobile";

export const Footer = ({
  handleSubmit,
  handleBack,
  backEnabled = false,
  submitEnabled = false,
}: {
  handleSubmit: () => void;
  handleBack?: () => void;
  backEnabled?: boolean;
  submitEnabled?: boolean;
}) => {
  const isMobile = useMobile();

  return (
    <footer
      className={cx(" mt-8 flex justify-between", {
        "fixed p-3 bottom-0 left-0 right-0 bg-white": isMobile,
      })}
    >
      <Button
        outline={true}
        color="gray"
        onClick={handleBack}
        disabled={!backEnabled}
      >
        חזרה
      </Button>
      <Button color="success" disabled={!submitEnabled} onClick={handleSubmit}>
        קדימה
        <HiOutlineArrowLeft className="mr-2 h-5 w-5" />
      </Button>
    </footer>
  );
};
