import cx from "classnames";
import { ReactNode } from "react";

import { useMobile } from "../hooks/useIsMobile";

export const Title = ({ children }: { children: ReactNode }) => {
  const isMobile = useMobile();

  return (
    <h1
      className={cx(" my-2 ", {
        "text-3xl": !isMobile,
        "text-l": isMobile,
      })}
    >
      {children}
    </h1>
  );
};
