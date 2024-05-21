import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHouseData } from "../services/firebase/firebaseFunctions";
import { House } from "../@types/schemaType";
import toast from "react-hot-toast";
import { HouseStock1 } from "../assets/Images";

type Props = {};

const HouseDetails: React.FC<Props> = () => {
  const params = useParams();
  
  const [house, setHouse] = useState<House | null>(null);
  
  useEffect(() => {
    const fetchhousedata = async () => {
      const res = await getHouseData(params.houseid || "");
      if (res.success && res.data) {
        console.log(res.data);

        setHouse(res.data as House);
      } else if (res.error) {
        toast.error(res.error);
      } else {
        toast.error("Can't fetch property data !!");
      }
    };
    fetchhousedata();
  }, []);
  return (
    <section className="w-full">
      <div className="w-4/5 mx-auto flex gap-10">
        <div className="flex-1">
          <div>
            <img src={house?.imageUrl || HouseStock1} alt="" className="rounded-lg" />
          </div>
        </div>
        <div className="flex-1 flex flex-col text-lg text-slate-800">
          <div>{house?.title}</div>
          <div>
            <span>{house?.address.city}, {house?.address.state}, {house?.address.landmark}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HouseDetails;
