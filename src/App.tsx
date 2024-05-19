import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import toast, { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import OwnerDashboard from "./pages/OwnerDashboard";
import PG from "./pages/PG";
import HousesForRent from "./pages/HousesForRent";
import Properties from "./pages/Properties";
import Layout from "./pages/Layout";
import Search from "./pages/Search";
import Plots from "./pages/Plots";
import PriceTrends from "./pages/PriceTrends";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./services/firebase/config";
import { getUserData } from "./services/firebase/firebaseFunctions";
import { useUserStore } from "./stores/store";

function App() {
  const setUser = useUserStore((state) => state.updateUser);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      setIsUserLoading(true);
      if (user) {
        console.log("user is logged in", user);
        const res = await getUserData(user.uid);
        if (res.success && res.data) {
          setUser(res.data);
          toast.success(`Welcome back ${res.data.username || res.data.email}`);
        }
        if (!res.success) {
          toast.error("Can't fetch user's data !! ");
        }
      } else {
        console.log("user is not logged in ");
      }
      setIsUserLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      {isUserLoading ? (
        <div className="w-screen grid place-items-center h-screen">
          <div className="w-10 h-10 rounded-full border-4 border-white border-b-red-400 animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 py-4 px-8">
          <Navbar />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/property-and-land" element={<Properties />} />
              <Route path="/houses-for-rent" element={<HousesForRent />} />
              <Route path="/pg-houses" element={<PG />} />
              <Route path="/buy-plot" element={<Plots />} />
            </Route>
            <Route path="/search" element={<Search />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />
            <Route path="/price-trends" element={<PriceTrends />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
