import React from "react";

type Props = {};

const Home: React.FC<Props> = (props) => {
  return (
    <div className="w-full">
      <main className="w-full flex flex-col gap-10">
        <section className="relative w-full flex items-center justify-center py-14">
          <div className="absolute top-0 w-full h-1/2 bg-red-400 -z-10"></div>
          <div className="flex flex-col w-2/5 rounded-full gap-3 overflow-hidden px-10 py-4 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-white">
            <div className="w-full ">
              <div className="flex items-center justify-between px-5">
                <div>Buy</div>
                <div>Rent</div>
                <div>PG</div>
              </div>
            </div>
            <hr className="border border-zinc-200" />
            <div className="w-full">search</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
