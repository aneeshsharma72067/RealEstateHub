import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
