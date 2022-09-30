import { ReactNode } from "react";
import { useContext } from "react";

import { EUserType, MainContext } from "../context";

export const AuthWrapper = ({
  permission,
  children,
}: {
  permission: EUserType[];
  children: ReactNode;
}) => {
  const { userType } = useContext(MainContext);

  return <>{permission.includes(userType) ? children : null}</>;
};
