import cx from "classnames";
import React, { ReactNode } from "react";

export const Line = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      className=" p-4 border cursor-pointer hover:bg-gray-100 rounded-md"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const Box = ({
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
        " p-10 rounded-md shadow cursor-pointer text-center flex items-center justify-center hover:bg-gray-100",
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
