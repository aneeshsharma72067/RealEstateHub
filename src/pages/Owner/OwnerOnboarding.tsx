import React from "react";
import { useUserStore } from "../../stores/store";
import { Navigate } from "react-router-dom";

type Props = {};

const OwnerOnboarding: React.FC<Props> = () => {
  const user = useUserStore((state) => state.currentUser);
  if (user?.ownerid) {
    return <Navigate to={"/owner-dashboard"} />;
  }
  return <div>OwnerOnboarding</div>;
};

export default OwnerOnboarding;
