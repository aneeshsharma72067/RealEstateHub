import React, { useState } from "react";
import { useOwnerStore, useUserStore } from "../../stores/store";
import { Navigate, useNavigate } from "react-router-dom";
import {
  CallIcon,
  EditIcon,
  GlobeIcon,
  UserCircleIcon,
} from "../../assets/Icons";
import { OwnerFormData } from "../../@types/formTypes";
import { Button } from "../../components/Button";
import { createOwner } from "../../services/firebase/firebaseFunctions";
import toast from "react-hot-toast";

type Props = {};

const OwnerOnboarding: React.FC<Props> = () => {
  const user = useUserStore((state) => state.currentUser);

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [tempURL, setTempURL] = useState<string | null>(null);
  const [ownerFormData, setOwnerFormData] = useState<OwnerFormData>({
    phone: "",
    avatar: null,
    company: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];
    setOwnerFormData({
      ...ownerFormData,
      avatar: selectedImage,
    });
    const tempUrl = URL.createObjectURL(selectedImage as Blob);
    setTempURL(tempUrl);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOwnerFormData({
      ...ownerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (ownerFormData.phone === "" || ownerFormData.phone.length != 10) {
      toast.error("Please enter a valid phone number !!");
      return;
    }
    if (user) {
      setLoading(true);
      const response = await createOwner(user.uid, ownerFormData);
      if (response.success) {
        toast.success("You are now an owner ✨");
        navigate("/owner-dashboard");
      } else if (response.error) {
        toast.error(response.error);
      } else {
        toast.error("Something went wrong !!");
      }
      setLoading(false);
    }
  };

  if (user?.ownerid || !user) {
    return <Navigate to={"/owner-dashboard"} />;
  }
  return (
    <>
      <section className="w-full">
        <div className="w-1/2 mx-auto py-5">
          <div className="w-full mx-auto">
            <h1 className="font-bold text-5xl text-slate-600 text-center">
              Become a <span className="text-orange-500">Seller</span>
            </h1>
            <div className="flex flex-col w-3/5 mx-auto my-12 gap-4">
              <div className="w-full flex items-center justify-center">
                <label htmlFor="avatar" className="relative w-max h-max">
                  {tempURL ? (
                    <img
                      src={tempURL}
                      alt=""
                      className="w-28 h-28 rounded-full"
                    />
                  ) : (
                    <UserCircleIcon size={100} color="#333" />
                  )}
                  <span className="absolute bg-green-400 rounded-full p-[6px] border-2 border-white right-0 bottom-0">
                    <EditIcon size={18} color="white" />
                  </span>
                </label>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept=".jpg, .png, .jpeg"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <div className="w-full flex gap-1 items-center bg-white rounded-md px-4">
                <div className="flex items-center justify-center">
                  <CallIcon size={20} color="#333" />
                </div>
                <input
                  type="number"
                  name="phone"
                  className="w-full rounded-md py-3 px-5 outline-none autofill:bg-white bg-white border-none"
                  placeholder="Enter your phone number..."
                  value={ownerFormData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full flex gap-1 items-center bg-white rounded-md px-4">
                <div className="flex items-center justify-center">
                  <GlobeIcon size={20} color="#222" />
                </div>
                <input
                  type="text"
                  name="company"
                  className="w-full rounded-md py-3 px-5 outline-none autofill:bg-white bg-white border-none"
                  placeholder="Enter your company name (Optional)"
                  value={ownerFormData.company}
                  onChange={handleChange}
                />
              </div>
              <Button onclick={handleSubmit} title="Submit" loading={loading} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OwnerOnboarding;
