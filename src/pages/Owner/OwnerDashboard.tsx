import React, { useEffect } from "react";
import { getOwnerData } from "../../services/firebase/firebaseFunctions";
import { useOwnerStore, useUserStore } from "../../stores/store";
import toast from "react-hot-toast";

type Props = {
  ownerid: string;
};

const OwnerDashboard: React.FC<Props> = ({ ownerid }) => {
  const user = useUserStore((state) => state.currentUser);
  const owner = useOwnerStore((state) => state.currentOwner);
  const setOwner = useOwnerStore((state) => state.setOwner);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getOwnerData(ownerid);
      if (res.success && res.data) {
        setOwner(res.data);
      } else if (res.error) {
        toast.error(res.error);
      } else {
        toast.error("Something went wrong");
      }
    };
    fetchUser();
    return () => {};
  }, []);

  return (
    <section className="w-full">
      <div className="w-4/5 mx-auto my-6 flex flex-col gap-5">
        <div className="flex w-full gap-6">
          <div className="flex-[0.4] bg-gradient-to-br from-orange-600 to-orange-200 rounded-xl py-10 px-8">
            <h1 className="font-bold flex flex-col gap-2">
              <span className="text-3xl text-white">Welcome</span>
              <span className="text-xl">{user?.username || user?.email}</span>
            </h1>
          </div>
          <div className="flex-[0.6] bg-gradient-to-br from-slate-400 to-slate-200 rounded-xl px-6 py-4">
            <h2 className="text-slate-800 text-2xl font-bold">Your Stats</h2>
            <div className="grid grid-cols-3 grid-rows-2 py-5 text-lg gap-2 text-blue-950 font-medium">
              <div>Houses: 0</div>
              <div>Plots: 0</div>
              <div>Total Properties: 0</div>
              <div>Rentals: 0</div>
              <div>PG: 0</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerDashboard;
