import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AddPersonIcon,
  ListIcon,
  LoginIcon,
  MenuIcon,
  UserIcon,
} from "../assets/Icons";
import { useUserStore } from "../stores/store";
import { User } from "../@types/schemaType";
import { logout } from "../services/firebase/firebaseFunctions";
import toast from "react-hot-toast";

type Props = {};

const Navbar: React.FC<Props> = () => {
  const user: User | null = useUserStore((state) => state.currentUser);
  const setUserNull = useUserStore((state) => state.logoutUser);

  const [isNavActive, setIsNavActive] = useState<boolean>(false);
  const [isAuthMenuActive, setIsAuthMenuActive] = useState<boolean>(false);

  const handleLogout = async () => {
    const res = await logout();
    if (res.success) {
      toast.success("Logged out successfully");
      setUserNull();
    } else {
      toast.error("Something went wrong !!");
    }
  };

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
          <div className="hidden md:flex relative items-center justify-center gap-6">
            <div>{user ? <span>{user.email}</span> : <span> Guest</span>}</div>
            <div
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-zinc-300 duration-200 hover:shadow-[0_5px_10px_rgba(0,0,0,0.3)] cursor-pointer"
              onClick={() => setIsAuthMenuActive(!isAuthMenuActive)}
            >
              <ListIcon color="#7a7a7a" size={25} strokeWidth={1.4} />
              <UserIcon color="#7a7a7a" size={30} />
            </div>
            {isAuthMenuActive && (
              <div
                className={`absolute w-full top-16 ${
                  user ? "-right-40" : "-right-4"
                }`}
              >
                <div className="flex flex-col rounded-lg overflow-hidden w-32 shadow-[0_5px_10px_rgba(0,0,0,0.3)]">
                  <div className="px-5 py-3 bg-slate-100 duration-300">
                    Guest
                  </div>
                  <hr />
                  {user ? (
                    <button className="py-3" onClick={handleLogout}>
                      Logout
                    </button>
                  ) : (
                    <>
                      <NavLink
                        to={"/auth/login"}
                        className="p-3 bg-white duration-300 hover:bg-slate-100 flex items-center justify-start gap-4"
                      >
                        <LoginIcon size={30} color="#666" />
                        <span className="text-base">Login</span>
                      </NavLink>
                      <hr />
                      <NavLink
                        to={"/auth/signup"}
                        className="py-3 px-4 bg-white duration-300 hover:bg-slate-100 flex items-center justify-start gap-4"
                      >
                        <AddPersonIcon size={24} color="#666" />
                        <span className="text-base">Signup</span>
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            )}
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
