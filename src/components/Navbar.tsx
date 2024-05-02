import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ListIcon, MenuIcon, UserIcon } from "../assets/Icons";

type Props = {};

const Navbar: React.FC<Props> = () => {
  const [isNavActive, setIsNavActive] = useState<boolean>(false);

  return (
    <>
      <div className="md:hidden flex w-full items-center justify-end z-50">
        <button
          className="flex items-center justify-center"
          onClick={() => setIsNavActive(!isNavActive)}
        >
          <MenuIcon isNavActive={isNavActive} />
        </button>
      </div>
      <section
        className={`fixed flex justify-end md:static w-full md:w-full duration-300 z-40 top-0 ${
          isNavActive ? "right-0" : "-right-full"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center px-16 h-screen md:h-max justify-normal md:justify-between text-lg md:text-[0.9rem] py-8 md:p-0 duration-300 text-slate-700 font-medium bg-orange-100 md:bg-transparent w-4/5 md:w-full gap-10 md:gap-6 shadow-[-3px_5px_17px_0px_#a0aec0] md:shadow-none">
          <div>
            <div>Logo</div>
          </div>
          <nav>
            <ul className="flex flex-col md:flex-row md:items-center justify-center gap-10">
              <li>
                <NavLink to={"/"}>For Buyers</NavLink>
              </li>
              <li>
                <NavLink to={"/owner-dashboard"}>For Owners</NavLink>
              </li>
              <li>
                <NavLink to={"/price-trends"}>Price Trends</NavLink>
              </li>
              <li>
                <NavLink to={"/about"}>About Us</NavLink>
              </li>
            </ul>
          </nav>
          <div className="hidden md:block">
            <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-zinc-300 duration-200 hover:shadow-[0_5px_10px_rgba(0,0,0,0.3)] cursor-pointer">
              <ListIcon color="#7a7a7a" size={25} strokeWidth={1.4} />
              <UserIcon color="#7a7a7a" size={30} />
            </div>
          </div>
          <div className="block md:hidden">
            <div className="flex gap-2">
              <NavLink
                to={"/auth/login"}
                className="bg-orange-400 px-4 py-2 rounded-md text-white"
              >
                Login
              </NavLink>
              <NavLink
                to={"/auth/signup"}
                className="bg-orange-400 px-4 py-2 rounded-md text-white "
              >
                Signup
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
