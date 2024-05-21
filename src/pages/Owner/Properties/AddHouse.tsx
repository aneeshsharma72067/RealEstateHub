import React, { ChangeEvent, useState } from "react";
import { AddIcon, ImagesIcon } from "../../../assets/Icons";
import { HouseFormData } from "../../../@types/formTypes";
import { useOwnerStore } from "../../../stores/store";
import { Button } from "../../../components/Button";
import { addHouse } from "../../../services/firebase/firebaseFunctions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Props = {};

const AddHouse: React.FC<Props> = () => {
  const owner = useOwnerStore((state) => state.currentOwner);

  const [loading, setLoading] = useState<boolean>(false);
  const [tempURL, setTempURL] = useState<string | null>(null);
  const [houseFormData, setHouseFormData] = useState<HouseFormData>({
    city: "",
    title: "",
    landmark: "",
    bathroom: 0,
    hall: 0,
    bedroom: 0,
    kitchen: 0,
    description: "",
    floors: 0,
    has_garage: false,
    has_pool: false,
    is_furnished: false,
    ownerid: owner ? owner?.ownerid : "",
    parking_spaces: 0,
    price: 0,
    square_footage: 0,
    image: null,
    address1: "",
    state: "",
    zipcode: "",
  });

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setHouseFormData({
      ...houseFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const url = URL.createObjectURL(files?.item(0) as Blob);
    setTempURL(url);
    console.log(files);
    if (files) {
      setHouseFormData({
        ...houseFormData,
        image: files[0],
      });
    }
    console.log(houseFormData);
  };
  const navigate = useNavigate();
  const handleSubmit = async () => {
    console.log(houseFormData);
    
    setLoading(true);
    const response = await addHouse(houseFormData);
    if (response.success) {
      toast.success("House Added successfully");
      navigate("/owner-dashboard/properties/houses");
    } else if (response.error) {
      toast.error(response.error);
    } else {
      toast.error("Something went wrong !!");
    }
    setLoading(false);
  };

  return (
    <>
      <section className="w-full">
        <div className="w-4/5  mx-auto my-4 flex flex-col gap-5">
          <div>
            <h1 className="font-bold text-slate-700 text-3xl">Add a House </h1>
          </div>
          <div className="flex gap-10 w-full">
            <div className="flex-[0.3] flex flex-col gap-4">
              <div className="w-full flex flex-col py-10 px-5 rounded-lg items-center bg-slate-300 gap-3">
                {tempURL && houseFormData.image ? (
                  <>
                    <img src={tempURL} alt="" />
                  </>
                ) : (
                  <>
                    <ImagesIcon color="#333" size={50} />
                    <span className="text-slate-600 font-medium text-base">
                      No Images Added
                    </span>
                  </>
                )}
              </div>
              <input
                type="file"
                name="images"
                id="images"
                multiple={true}
                className="hidden"
                accept=".jpg, .png, .jpeg"
                onChange={handleFileChange}
              />
              <label
                htmlFor="images"
                className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 duration-300 cursor-pointer"
              >
                <AddIcon color="white" />
                <span className="text-white">Add</span>
              </label>
            </div>
            <div className="flex-[0.7] flex flex-col gap-4">
              <div className=" w-full flex gap-2 ">
                <input
                  type="number"
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  onChange={handleValueChange}
                  placeholder="Rooms..."
                  id="bedroom"
                  name="bedroom"
                />
                <input
                  type="number"
                  onChange={handleValueChange}
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  placeholder="Halls..."
                  id="hall"
                  name="hall"
                />
                <input
                  type="number"
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  onChange={handleValueChange}
                  placeholder="Bathrooms..."
                  name="bathroom"
                  id="bathroom"
                />
                <input
                  type="number"
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  onChange={handleValueChange}
                  placeholder="Kitchens..."
                  name="kitchen"
                  id="kitchen"
                />
              </div>
              <div className="w-full flex gap-2">
                <input
                  type="number"
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  placeholder="Floors..."
                  onChange={handleValueChange}
                />
                <input
                  type="number"
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  placeholder="Parking Spaces..."
                  onChange={handleValueChange}
                  id="parking_spaces"
                  name="parking_spaces"
                />
                <input
                  type="number"
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  id="square_footage"
                  name="square_footage"
                  placeholder="Square Footage..."
                  onChange={handleValueChange}
                />
              </div>
              <div className="w-full flex gap-2">
                <input
                  type="text"
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  placeholder="Title..."
                  name="title"
                  id="title"
                  onChange={handleValueChange}
                />
              </div>
              <div className="w-full flex gap-2">
                <textarea
                  name="description"
                  id="description"
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full resize-none"
                  placeholder="Description..."
                  onChange={handleValueChange}
                ></textarea>
              </div>
              <div className="w-full flex gap-2 px-6 justify-around items-center">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    name="is_furnished"
                    id="is_furnished"
                    className="duration-500"
                    onChange={(e) => {
                      setHouseFormData({
                        ...houseFormData,
                        is_furnished: e.target.value === "on",
                      });
                    }}
                  />
                  <label htmlFor="is_furnished" className="text-slate-800">
                    Furnished{" "}
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    name="has_pool"
                    id="has_pool"
                    className="duration-500"
                    onChange={(e) => {
                      setHouseFormData({
                        ...houseFormData,
                        has_pool: e.target.value === "on",
                      });
                    }}
                  />
                  <label htmlFor="is_furnished" className="text-slate-800">
                    Pool{" "}
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    name="has_garage"
                    id="has_garage"
                    className="duration-500"
                    onChange={(e) => {
                      setHouseFormData({
                        ...houseFormData,
                        has_garage: e.target.value === "on",
                      });
                    }}
                  />
                  <label htmlFor="is_furnished" className="text-slate-800">
                    Garage{" "}
                  </label>
                </div>
              </div>
              <h2 className="text-lg font-medium">Address</h2>
              <div className="w-full flex gap-2">
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  onChange={handleValueChange}
                  placeholder="City..."
                />
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  placeholder="State..."
                  onChange={handleValueChange}
                />
                <input
                  type="number"
                  id="zipcode"
                  name="zipcode"
                  onChange={handleValueChange}
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  placeholder="Zipcode..."
                />
              </div>
              <div className="w-full flex gap-2">
                <input
                  type="text"
                  id="landmark"
                  name="landmark"
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  placeholder="Landmark..."
                  onChange={handleValueChange}
                />
              </div>
              <div className="w-full flex gap-2">
                <input
                  type="text"
                  name="address1"
                  id="address1"
                  className="px-5 py-2 rounded-md duration-300 border-2 border-transparent outline-none focus:border-orange-400 w-full"
                  placeholder="Complete Address (Optional)..."
                  onChange={handleValueChange}
                />
              </div>
              <Button onclick={handleSubmit} title="Add" loading={loading} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddHouse;
