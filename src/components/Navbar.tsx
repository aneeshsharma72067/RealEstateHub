import React from "react";
import { NavLink } from "react-router-dom";
import { ListIcon, UserIcon } from "../assets/Icons";

type Props = {};

const Navbar: React.FC<Props> = (props) => {
  return (
    <section className="">
      <div className="flex flex-col md:flex-row items-center justify-between text-[0.9rem]">
        <div>
          <div>Logo</div>
        </div>
        <nav>
          <ul className="flex items-center justify-center gap-10">
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
        <div>
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-zinc-300 duration-200 hover:shadow-[0_5px_10px_rgba(0,0,0,0.3)] cursor-pointer">
            <ListIcon color="#7a7a7a" size={25} strokeWidth={1.4} />
            <UserIcon color="#7a7a7a" size={30} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
