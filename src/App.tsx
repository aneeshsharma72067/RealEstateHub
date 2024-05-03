import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import OwnerDashboard from "./pages/OwnerDashboard";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <div className="flex flex-col gap-4">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
