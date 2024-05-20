import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchAllPG } from "../services/firebase/firebaseFunctions";
import { PG } from "../@types/schemaType";

type Props = {};

const PGs: React.FC<Props> = () => {
  const [pg, setPg] = useState<PG[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getpgdata = async () => {
      setLoading(true);
      const res = await fetchAllPG();
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
      <div className="w-4/5 mx-auto flex flex-col gap-5">
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
              {pg.map((item) => {
                return <div>{item.ownerid}</div>;
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center text-slate-600 font-medium text-xl">
              <p>No PG's found</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default PGs;
