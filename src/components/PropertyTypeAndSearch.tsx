import React, { useState } from "react";
import { LocateIcon, SearchIcon } from "../assets/Icons";
import { Button } from "../components/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Props = {};
type CurrentTab = "buy" | "rent" | "pg" | "plot" | "";

const PropertyTypeAndSearch: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState<CurrentTab>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const onTabChange = (newTab: CurrentTab) => {
    setCurrent(newTab);
  };

  const handleSearch = () => {
    if (!searchQuery) {
      toast.error("Please enter something to search");
    } else {
      navigate(`/search?q=${searchQuery}`);
    }
  };
  return (
    <div className="flex flex-col w-1/2 rounded-full overflow-hidden px-10 py-4 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-white">
      <div className="w-full ">
        <div className="flex items-center justify-between px-5 text-[1.1rem]">
          <div
            className={`font-bold cursor-pointer ${
              current === "buy" && "border-b-4 border-b-orange-500"
            } py-4 px-2`}
            onClick={() => onTabChange("buy")}
          >
            Buy
          </div>
          <div
            className={`font-bold cursor-pointer ${
              current === "rent" && "border-b-4 border-b-orange-500"
            } py-4 px-2`}
            onClick={() => onTabChange("rent")}
          >
            Rent
          </div>
          <div
            className={`font-bold cursor-pointer ${
              current === "pg" && "border-b-4 border-b-orange-500"
            } py-4 px-2`}
            onClick={() => onTabChange("pg")}
          >
            PG
          </div>
          <div
            className={`font-bold cursor-pointer ${
              current === "plot" && "border-b-4 border-b-orange-500"
            } py-4 px-2`}
            onClick={() => onTabChange("plot")}
          >
            Plots
          </div>
        </div>
      </div>
      <hr className="border border-zinc-200" />
      <div className="w-full py-2">
        <div className="w-full">
          <div className="w-full flex items-center justify-center gap-4 px-4">
            <SearchIcon size={30} />
            <input
              type="text"
              name="search"
              id="search"
              className="border-none outline-none px04 py-2 w-full"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <div>
              <button>
                <LocateIcon size={25} />
              </button>
            </div>
            <div>
              <Button
                title="Search"
                onclick={() => handleSearch()}
                className="px-5 py-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyTypeAndSearch;
