import cx from "classnames";
import { ReactNode } from "react";

import { useMobile } from "../hooks/useIsMobile";

export const Grid = ({
  bottomPadding = false,
  children,
}: {
  bottomPadding?: boolean;
  children: ReactNode;
}) => {
  const isMobile = useMobile();
  return (
    <div
      className={cx(" grid gap-3", {
        "grid-cols-2": isMobile,
        "grid-cols-4": !isMobile,
        "pb-20": bottomPadding,
      })}
    >
      {children}
    </div>
  );
};
