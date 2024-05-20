import React from "react";
import { NavLink } from "react-router-dom";
import {
  HouseStock1,
  HouseStock2,
  PlotStock1,
  PlotStock2,
} from "../../assets/Images";
import { useUserStore } from "../../stores/store";
import OwnerDashboard from "./OwnerDashboard";

type Props = {};

const Owner: React.FC<Props> = () => {
  const user = useUserStore((state) => state.currentUser);

  if (user?.ownerid) {
    return <OwnerDashboard ownerid={user.ownerid}  />;
  }
  return (
    <section className="">
      <div className="w-full flex flex-col gap-10 items-center justify-center py-4">
        <div>
          <div>
            <h1 className="font-bold text-slate-700 text-5xl leading-snug w-4/5 text-center mx-auto">
              Turn Your Property into{" "}
              <span className="text-green-400">Equity</span>:{" "}
              <span className="text-orange-500">Sell</span> with Us
            </h1>
          </div>
        </div>
        <div className="flex w-4/5 mx-auto items-center justify-between gap-20">
          <div className="flex-1 h-max">
            <img
              src={HouseStock1}
              alt="house stock"
              width={300}
              className="rounded-3xl  top-0 left-0"
            />
            <img
              src={HouseStock2}
              alt="house stock"
              width={300}
              className="rounded-3xl -mt-20 ml-20 top-24 left-20"
            />
          </div>
          <div className="flex-1 flex items-center justify-center -mt-32">
            <NavLink
              to={"/auth/signup?signupType=owner"}
              className="bg-orange-500 px-10 py-4 cursor-pointer rounded-full text-white text-xl"
            >
              Become a seller
            </NavLink>
          </div>
          <div className="flex-1 h-max">
            <img
              src={PlotStock1}
              alt="house stock"
              width={300}
              className="rounded-3xl  top-0 left-0"
            />
            <img
              src={PlotStock2}
              alt="house stock"
              width={300}
              className="rounded-3xl -mt-20 -ml-20 top-24 left-20"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Owner;
