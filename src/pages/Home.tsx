import React from "react";
import { BuyHouses, PGHouses, PlotImage, RentHouses } from "../assets/Images";
import { NavLink } from "react-router-dom";
import { BarChartIcon } from "../assets/Icons";

type Props = {};

const Home: React.FC<Props> = () => {
  return (
    <>
      <section className="flex flex-col gap-10">
        <div className="text-center">
          <h1 className="font-medium capitalize text-2xl text-slate-800">
            Get started with Real Estate Options
          </h1>
        </div>
        <div className="w-4/5 mx-auto grid gap-10 grid-rows-1 md:grid-cols-4">
          <NavLink to={"/property-and-land"} className="flex flex-col gap-2">
            <div className="w-full rounded-lg overflow-hidden">
              <img
                src={BuyHouses}
                alt="Rent Houses"
                className="max-w-full max-h-full duration-500 hover:scale-125"
              />
            </div>
            <div className="text-lg font-medium text-slate-900">
              <h2>Buying a Home</h2>
            </div>
          </NavLink>
          <NavLink to={"/houses-for-rent"} className="flex flex-col gap-2">
            <div className="w-full  rounded-lg overflow-hidden">
              <img
                src={RentHouses}
                alt="Rent Houses"
                className="max-w-full max-h-full duration-500 hover:scale-125"
              />
            </div>
            <div className="text-lg font-medium text-slate-900">
              <h2>Rent a house</h2>
            </div>
          </NavLink>
          <NavLink to={"/pg-houses"} className="flex flex-col gap-2">
            <div className="w-full rounded-lg overflow-hidden">
              <img
                src={PGHouses}
                alt="PG Houses"
                className="max-w-full max-h-full duration-500 hover:scale-125"
              />
            </div>
            <div className="text-lg font-medium text-slate-900">
              <h2>PG and co-living</h2>
            </div>
          </NavLink>
          <NavLink to={"/buy-plot"} className="flex flex-col gap-2">
            <div className="w-full rounded-lg overflow-hidden">
              <img
                src={PlotImage}
                alt="Plots"
                className="max-w-full max-h-full duration-500 hover:scale-125"
              />
            </div>
            <div className="text-lg font-medium text-slate-900">
              <h2>Plots and Lands</h2>
            </div>
          </NavLink>
        </div>
      </section>
      <section className="px-14 py-10">
        <div className="flex flex-col gap-10">
          <div className="flex gap-3 items-center justify-start">
            <span className="w-4 h-12 bg-green-500 rounded-md"></span>
            <h1 className="text-4xl font-bold text-blue-950">
              Check the Latest Price Trends
            </h1>
          </div>
          <div className="w-full flex gap-6 h-48">
            <NavLink
              to={"/price-trends"}
              className="flex-[0.3] flex flex-col items-center justify-center gap-3 bg-white hover:bg-green-100 rounded-md border-2  border-transparent hover:border-green-500 duration-300 cursor-pointer"
            >
              <div className="bg-green-500 rounded-full flex items-center justify-center p-5">
                <BarChartIcon size={50} color="white" />
              </div>
              <div>
                <p className="font-medium text-zinc-700 text-base">
                  Check Property Rates and Prices
                </p>
              </div>
            </NavLink>
            <div className="flex-[0.7] bg-blue-400 rounded-md"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
