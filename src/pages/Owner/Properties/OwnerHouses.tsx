import React, { useEffect, useState } from "react";
import { House } from "../../../@types/schemaType";
import { fetchHousesByOwnerId } from "../../../services/firebase/firebaseFunctions";
import { useOwnerStore } from "../../../stores/store";
import toast from "react-hot-toast";

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
            <div>
              <div className="h-32 max-w-60 rounded-lg flex items-center justify-center bg-orange-400">Add house</div>
              {houses.map((house) => {
                return <div>{house.description}</div>;
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center text-slate-600 font-medium text-xl">
              <p>No Houses Added</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default OwnerHouses;
