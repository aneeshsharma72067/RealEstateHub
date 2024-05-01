import React, { useState } from "react";
import { LocateIcon, SearchIcon } from "../assets/Icons";
import { Button } from "../components/Button";

type Props = {};
type CurrentTab = "buy" | "rent" | "pg";

const Home: React.FC<Props> = (props) => {
  const [current, setCurrent] = useState<CurrentTab>("buy");

  const onTabChange = (newTab: CurrentTab) => {
    setCurrent(newTab);
  };
  return (
    <div className="w-full">
      <main className="w-full flex flex-col gap-10 text-zinc-600">
        <section className="relative w-full flex items-center justify-center py-14">
          <div className="absolute top-0 w-full h-1/2 bg-red-400 -z-10"></div>
          <div className="flex flex-col w-1/2 rounded-full overflow-hidden px-10 py-4 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-white">
            <div className="w-full ">
              <div className="flex items-center justify-between px-5 text-[1.1rem]">
                <div
                  className={`font-bold cursor-pointer ${
                    current === "buy" && "border-b-4 border-b-orange-500"
                  } py-3 px-2`}
                  onClick={() => onTabChange("buy")}
                >
                  Buy
                </div>
                <div
                  className={`font-bold cursor-pointer ${
                    current === "rent" && "border-b-4 border-b-orange-500"
                  } py-3 px-2`}
                  onClick={() => onTabChange("rent")}
                >
                  Rent
                </div>
                <div
                  className={`font-bold cursor-pointer ${
                    current === "pg" && "border-b-4 border-b-orange-500"
                  } py-3 px-2`}
                  onClick={() => onTabChange("pg")}
                >
                  PG
                </div>
              </div>
            </div>
            <hr className="border border-zinc-200" />
            <div className="w-full py-3">
              <div className="w-full">
                <div className="w-full flex items-center justify-center gap-4 px-4">
                  <SearchIcon size={30} />
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="border-none outline-none px04 py-2 w-full"
                    placeholder="Search..."
                  />
                  <div>
                    <button>
                      <LocateIcon size={25} />
                    </button>
                  </div>
                  <div>
                    <Button title="Search" onclick={() => {}} className="px-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
