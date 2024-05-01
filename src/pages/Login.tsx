import React, { useState } from "react";
import { EmailIcon, EyeClosedIcon, EyeIcon, KeyIcon } from "../assets/Icons";
import { Button } from "../components/Button";
import toast from "react-hot-toast";
import GoogleAuth from "../components/GoogleAuth";
import { NavLink } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log(loginFormData);
    toast.success("Form Sumbitted");
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full h-20">
      <div className="w-full h-full my-6 mx-auto md:w-2/5">
        <div className="w-full flex flex-col gap-6">
          <header className="text-slate-700 text-center flex flex-col gap-3">
            <h1 className="font-bold text-4xl ">Login</h1>
            <h3 className="text-zinc-800">Welcome to my Soul Society</h3>
          </header>
          <main className="w-full flex flex-col gap-5">
            <GoogleAuth />
            <div className="text-center flex gap-4 items-center w-full">
              <hr className="border w-full border-zinc-300" />
              <span>OR</span>
              <hr className="border w-full border-zinc-300" />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <div className="w-full flex gap-1 items-center bg-white rounded-md px-4">
                  <div className="flex items-center justify-center">
                    <EmailIcon size={20} color="#333" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    className="w-full rounded-md py-3 px-5 outline-none autofill:bg-white bg-white border-none"
                    placeholder="Enter your email..."
                    value={loginFormData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Password</label>
                <div className="bg-white flex items-center px-4 gap-1 rounded-md">
                  <div className="flex items-center justify-center">
                    <KeyIcon size={20} color="#333" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="text-lg rounded-md py-3 px-5 outline-none border-none w-full"
                    placeholder="Enter a password..."
                    value={loginFormData.password}
                    onChange={handleChange}
                  />
                  <button onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeIcon size={20} color="#333" />
                    ) : (
                      <EyeClosedIcon size={20} color="#333" />
                    )}
                  </button>
                </div>
              </div>
              <Button onclick={handleSubmit} title="Submit" />
              <p className="text-center">
                Don't have an account ?{" "}
                <NavLink
                  to={"/auth/signup"}
                  className="text-orange-500 font-medium"
                >
                  Signup
                </NavLink>{" "}
                to get started
              </p>
            </div>
          </main>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
