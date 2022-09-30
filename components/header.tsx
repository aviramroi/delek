import { Fragment } from "react";

import { Title } from "./title";

const labels = {
  welcome: "היי שלום 👋",
  admin: "הנהגה",
  connectedAs: "מחובר בתור:",
};

export const Header = () => {
  return (
    <Fragment>
      <div className=" flex items-center justify-between mt-6">
        <Title>{labels.welcome}</Title>
      </div>
    </Fragment>
  );
};
