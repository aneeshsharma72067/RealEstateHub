import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchAllPlots } from "../services/firebase/firebaseFunctions";
import { Plot } from "../@types/schemaType";

type Props = {};

const Plots: React.FC<Props> = () => {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getplotsdata = async () => {
      setLoading(true);
      const res = await fetchAllPlots();
      if (res.success && res.data) {
        setPlots(res.data);
      } else if (res.error) {
        toast.error(res.error);
      } else {
        toast.error("Something went wrong");
      }
      console.log("loaded");
      setLoading(false);
    };
    getplotsdata();
    return () => {};
  }, []);

  return (
    <main className="w-full">
      <div className="w-4/5 mx-auto flex flex-col gap-5">
        <h1 className="text-3xl font-bold text-slate-700">Plots</h1>
        <div>
          {loading ? (
            <div className="flex w-full gap-4 items-center">
              <div className="flex-1 h-32 rounded-md bg-gradient-to-br from-slate-400 to-slate-300 animate-pulse"></div>
              <div className="flex-1 h-32 rounded-md bg-gradient-to-br from-slate-400 to-slate-300 animate-pulse"></div>
              <div className="flex-1 h-32 rounded-md bg-gradient-to-br from-slate-400 to-slate-300 animate-pulse"></div>
              <div className="flex-1 h-32 rounded-md bg-gradient-to-br from-slate-400 to-slate-300 animate-pulse"></div>
            </div>
          ) : plots.length ? (
            <div>
              {plots.map((plot) => {
                return <div>{plot.ownerid}</div>;
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center text-slate-600 font-medium text-xl">
              <p>No Plots Found</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Plots;
