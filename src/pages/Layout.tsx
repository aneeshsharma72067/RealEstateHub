import React from "react";
import PropertyTypeAndSearch from "../components/PropertyTypeAndSearch";
import { Outlet } from "react-router-dom";

type Props = {};

const Layout: React.FC<Props> = () => {
  return (
    <div className="w-full">
      <main className="w-full flex flex-col gap-14 text-zinc-600">
        <section className="relative w-full flex items-center justify-center pt-14">
          <PropertyTypeAndSearch />
        </section>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
