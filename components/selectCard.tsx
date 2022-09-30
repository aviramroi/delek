import cx from "classnames";
import { ReactNode } from "react";

export const SelectCard = ({
  isSelected = false,
  children,
  onClick,
}: {
  isSelected?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cx(
        " p-10 rounded-md shadow cursor-pointer text-center flex items-center justify-center hover:bg-gray-50",
        {
          " bg-slate-200": isSelected,
        }
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
