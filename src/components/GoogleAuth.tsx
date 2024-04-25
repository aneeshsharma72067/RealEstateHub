import { GoogleColorIcon } from "../assets/Icons";

const GoogleAuth: React.FC = () => {
  return (
    <div>
      <div className="bg-white w-full px-5 py-2 rounded-md text-slate-700 mx-auto flex justify-between items-center">
        <span className=" text-slate-800">Sign In with Google</span>
        <span><GoogleColorIcon size={30}/></span>
      </div>
    </div>
  );
}

export default GoogleAuth