import cx from "classnames";
import { ReactNode } from "react";

import { useMobile } from "../hooks/useIsMobile";

export const Container = ({ children }: { children: ReactNode }) => {
  const isMobile = useMobile();
  return (
    <div
      className={cx("flex flex-col h-full max-w-5xl mx-auto", {
        "  px-4": isMobile,
        " px-20": !isMobile,
      })}
    >
      {children}
    </div>
  );
};
