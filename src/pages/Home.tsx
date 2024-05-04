import React from "react";

type Props = {};

const Home: React.FC<Props> = () => {
  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="text-center">
          <h1 className="font-medium capitalize text-lg">
            Get started with Real Estate Options
          </h1>
        </div>
        <div className="w-4/5 mx-auto grid gap-20 grid-cols-3">
          <div className="flex flex-col gap-2">
            <div className="w-full">
              <div className="bg-red-300 w-full h-44 rounded-md"></div>
            </div>
            <div>
              <h2>Buying a Home</h2>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full">
              <div className="bg-red-300 w-full h-44 rounded-md"></div>
            </div>
            <div>
              <h2>Buying a Home</h2>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full">
              <div className="bg-red-300 w-full h-44 rounded-md"></div>
            </div>
            <div>
              <h2>Buying a Home</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="px-14 flex flex-col gap-10">
        <div>
          <h1 className="text-3xl font-bold text-zinc-800">
            Check the Latest Price Trends
          </h1>
        </div>
        <div className="w-full flex gap-6 h-48">
          <div className="flex-[0.3] bg-green-400 rounded-md">
            <div></div>
          </div>
          <div className="flex-[0.7] bg-blue-400 rounded-md"></div>
        </div>
      </section>
    </>
  );
};

export default Home;
