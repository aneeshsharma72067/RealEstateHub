import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <div className="flex flex-col gap-4">
        <Navbar />
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
