import React, { useEffect, useState } from "react";
import { PG } from "../../../@types/schemaType";
import {
  fetchHousesByOwnerId,
  fetchPGByOwnerId,
} from "../../../services/firebase/firebaseFunctions";
import { useOwnerStore } from "../../../stores/store";
import toast from "react-hot-toast";

type Props = {};

const OwnerPG: React.FC<Props> = () => {
  const owner = useOwnerStore((state) => state.currentOwner);
  const [pg, setPg] = useState<PG[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getpgdata = async () => {
      setLoading(true);
      const res = await fetchPGByOwnerId(owner?.ownerid || "");
      if (res.success && res.data) {
        setPg(res.data);
      } else if (res.error) {
        toast.error(res.error);
      } else {
        toast.error("Something went wrong");
      }
      console.log("loaded");
      setLoading(false);
    };
    getpgdata();
    return () => {};
  }, []);

  return (
    <main className="w-full">
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-3xl font-bold text-slate-700">PG's</h1>
        <div>
          {loading ? (
            <div className="flex w-full gap-4 items-center">
              <div className="flex-1 h-32 rounded-md bg-gradient-to-br from-slate-400 to-slate-300 animate-pulse"></div>
              <div className="flex-1 h-32 rounded-md bg-gradient-to-br from-slate-400 to-slate-300 animate-pulse"></div>
              <div className="flex-1 h-32 rounded-md bg-gradient-to-br from-slate-400 to-slate-300 animate-pulse"></div>
              <div className="flex-1 h-32 rounded-md bg-gradient-to-br from-slate-400 to-slate-300 animate-pulse"></div>
            </div>
          ) : pg.length ? (
            <div>
              <div className="h-32 max-w-60 rounded-lg flex items-center justify-center bg-orange-400">
                Add PG
              </div>
              {pg.map((item) => {
                return <div>{item.ownerid}</div>;
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center text-slate-600 font-medium text-xl">
              <p>No PG's Added</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default OwnerPG;
