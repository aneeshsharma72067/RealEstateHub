import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { House } from "../@types/schemaType";
import { fetchAllHouses } from "../services/firebase/firebaseFunctions";
import { HouseStock1 } from "../assets/Images";
import { NavLink } from "react-router-dom";

type Props = {};

const Properties: React.FC<Props> = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getrentalsdata = async () => {
      setLoading(true);
      const res = await fetchAllHouses();
      if (res.success && res.data) {
        setHouses(res.data);
      } else if (res.error) {
        toast.error(res.error);
      } else {
        toast.error("Something went wrong");
      }
      console.log("loaded");
      setLoading(false);
    };
    getrentalsdata();
    return () => {};
  }, []);

  return (
    <main className="w-full">
      <div className="w-4/5 mx-auto flex flex-col gap-5">
        <h1 className="text-3xl font-bold text-slate-700">Houses</h1>
        <div>
          {loading ? (
            <div className="flex w-full gap-4 items-center">
              <div className="flex-1 h-32 rounded-md bg-gradient-to-br from-slate-400 to-slate-300 animate-pulse"></div>
              <div className="flex-1 h-32 rounded-md bg-gradient-to-br from-slate-400 to-slate-300 animate-pulse"></div>
              <div className="flex-1 h-32 rounded-md bg-gradient-to-br from-slate-400 to-slate-300 animate-pulse"></div>
              <div className="flex-1 h-32 rounded-md bg-gradient-to-br from-slate-400 to-slate-300 animate-pulse"></div>
            </div>
          ) : houses.length ? (
            <div className="grid grid-cols-4 gap-4">
              {houses.map((house, key) => {
                console.log(house);
                return (
                  <NavLink
                    to={`/property-and-houses/${house.house_id}`}
                    key={key}
                    className="max-w-60 justify-start gap-4 rounded-lg flex flex-col bg-white px-3 py-2 "
                  >
                    <div className="w-full flex items-center justify-center">
                      <img
                        src={house.imageUrl ? house.imageUrl : HouseStock1}
                        alt=""
                        className="w-full rounded-lg"
                      />
                    </div>
                    <div className="text-left">{house.title}</div>
                  </NavLink>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center text-slate-600 font-medium text-xl">
              <p>No Houses to Show</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Properties;
