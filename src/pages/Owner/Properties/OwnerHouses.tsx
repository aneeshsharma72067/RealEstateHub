import React, { useEffect, useState } from "react";
import { House } from "../../../@types/schemaType";
import { fetchHousesByOwnerId } from "../../../services/firebase/firebaseFunctions";
import { useOwnerStore } from "../../../stores/store";
import toast from "react-hot-toast";
import { AddIcon } from "../../../assets/Icons";
import { NavLink } from "react-router-dom";
import { HouseStock1 } from "../../../assets/Images";

type Props = {};

const OwnerHouses: React.FC<Props> = () => {
  const owner = useOwnerStore((state) => state.currentOwner);
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const gethousedata = async () => {
      setLoading(true);
      const res = await fetchHousesByOwnerId(owner?.ownerid || "");
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
    gethousedata();
    return () => {};
  }, []);

  return (
    <main className="w-full">
      <div className="w-full flex flex-col gap-5">
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
            <div className="grid grid-cols-4">
              <NavLink
                to={"/owner-dashboard/properties/houses/add"}
                className="h-full max-w-60 rounded-lg flex items-center justify-center gap-2 bg-orange-400"
              >
                <AddIcon color="white" />
                <span className="text-white">Add</span>
              </NavLink>
              {houses.map((house, key) => {
                console.log(house);
                return (
                  <div
                    key={key}
                    className="max-w-60 rounded-lg flex flex-col bg-white px-3 py-2 justify-center gap-2 "
                  >
                    <div className="w-full flex items-center justify-center">
                      <img
                        src={
                          house.imageUrl ? house.imageUrl : HouseStock1
                        }
                        alt=""
                        className="w-full rounded-lg"
                      />
                    </div>
                    <div className="text-left">{house.title}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3 text-slate-600 font-medium text-xl">
              <p>No Houses Added</p>
              <NavLink
                to="/owner-dashboard/properties/houses/add"
                className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-orange-400"
              >
                <AddIcon color="white" />
                <span className="text-white">Add</span>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default OwnerHouses;
