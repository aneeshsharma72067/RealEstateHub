import React, { useEffect, useState } from "react";
import { Rental } from "../../../@types/schemaType";
import { fetchRentalsByOwnerId } from "../../../services/firebase/firebaseFunctions";
import { useOwnerStore } from "../../../stores/store";
import toast from "react-hot-toast";
import { AddIcon } from "../../../assets/Icons";
import { NavLink } from "react-router-dom";

type Props = {};

const OwnerRentals: React.FC<Props> = () => {
  const owner = useOwnerStore((state) => state.currentOwner);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getrentalsdata = async () => {
      setLoading(true);
      const res = await fetchRentalsByOwnerId(owner?.ownerid || "");
      if (res.success && res.data) {
        setRentals(res.data);
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
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-3xl font-bold text-slate-700">Rentals</h1>
        <div>
          {loading ? (
            <div className="flex w-full gap-4 items-center">
              <div className="flex-1 h-32 rounded-md bg-gradient-to-br from-slate-400 to-slate-300 animate-pulse"></div>
              <div className="flex-1 h-32 rounded-md bg-gradient-to-br from-slate-400 to-slate-300 animate-pulse"></div>
              <div className="flex-1 h-32 rounded-md bg-gradient-to-br from-slate-400 to-slate-300 animate-pulse"></div>
              <div className="flex-1 h-32 rounded-md bg-gradient-to-br from-slate-400 to-slate-300 animate-pulse"></div>
            </div>
          ) : rentals.length ? (
            <div>
              <div className="h-32 max-w-60 rounded-lg flex items-center justify-center bg-orange-400">
                Add Rental
              </div>
              {rentals.map((rental) => {
                return <div>{rental.ownerid}</div>;
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3 text-slate-600 font-medium text-xl">
              <p>No Rentals Added</p>
              <NavLink
                to="/owner-dashboard/properties/rentals/add"
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

export default OwnerRentals;
