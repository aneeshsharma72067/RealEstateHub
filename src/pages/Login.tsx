import { MouseEventHandler, useState } from "react";
import { EmailIcon, EyeClosedIcon, EyeIcon, KeyIcon } from "../assets/Icons";
import { Button } from "../components/Button";
import toast from "react-hot-toast";

interface LoginFormData {
  username: string;
  password: string;
}

const Login = () => {
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = () => {
    toast.success("Form Sumbitted")
  };

  return (
    <div className="w-full h-20">
      <div className="w-4/5 h-full my-10 mx-auto">
        <div className="flex flex-col gap-6">
          <header className="text-slate-700 text-center flex flex-col gap-3">
            <h1 className="font-bold text-4xl ">Login</h1>
            <h3 className="text-zinc-800">Welcome to my Soul Society</h3>
          </header>
          <main className="w-full flex flex-col gap-10">
            <div>
              <div className="bg-white w-full px-5 py-2 rounded-md text-slate-700 mx-auto flex justify-between">
                <span>Sign In with Google</span>
                <span>G</span>
              </div>
            </div>
            <div className="text-center flex gap-4 items-center w-">
              <hr className="border w-full border-zinc-300" />
              <span>OR</span>
              <hr className="border w-full border-zinc-300" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <div className="w-full flex gap-2 items-center bg-white rounded-md px-3">
                  <div className="flex items-center justify-center">
                    <EmailIcon size={20} color="#333" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    className="w-full rounded-md py-3 px-5 outline-none autofill:bg-white bg-white border-none"
                    placeholder="Enter your email..."
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Password</label>
                <div className="bg-white flex items-center px-3 gap-2 rounded-md">
                  <div className="flex items-center justify-center">
                    <KeyIcon size={20} color="#333" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="text-lg rounded-md py-3 px-5 outline-none border-none w-full"
                    placeholder="Enter a password..."
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
                <Button onclick={handleSubmit} />
            </div>
          </main>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
