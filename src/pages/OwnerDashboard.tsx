import React from "react";
import { NavLink } from "react-router-dom";

type Props = {};

const OwnerDashboard: React.FC<Props> = () => {
  return (
    <div>
      <NavLink
        to={"/auth/signup?signupType=owner"}
        className="bg-blue-900 px-5 py-3 rounded-md text-white"
      >
        Become a seller
      </NavLink>
    </div>
  );
};

export default OwnerDashboard;
