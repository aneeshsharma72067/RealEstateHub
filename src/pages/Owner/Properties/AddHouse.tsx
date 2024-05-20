import React from "react";

type Props = {};

const AddHouse: React.FC<Props> = () => {
  return (
    <>
      <section className="w-full">
        <div className="w-3/5  mx-auto my-4 flex flex-col gap-5">
          <div>
            <h1 className="font-bold text-slate-700 text-3xl">Add a House </h1>
          </div>
          <div className="flex gap-4 w-full">
            <div className="flex-[0.3]">Image</div>
            <div className="flex-[0.7] flex flex-col gap-4">
              <div className=" w-full flex gap-2 ">
                <input
                  type="number"
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  placeholder="Rooms..."
                />
                <input
                  type="number"
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  placeholder="Halls..."
                />
                <input
                  type="number"
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  placeholder="Bathrooms..."
                />
                <input
                  type="number"
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  placeholder="Kitchens..."
                />
              </div>
              <div className="w-full flex gap-2">
                <input
                  type="number"
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  placeholder="Floors..."
                />
                <input
                  type="number"
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  placeholder="Parking Spaces..."
                />
                <input
                  type="number"
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  placeholder="Square Footage..."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddHouse;
