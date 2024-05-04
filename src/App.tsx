import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
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

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <div className="flex flex-col gap-4">
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
    </>
  );
}

export default App;
