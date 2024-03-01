import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import Vehicles from "@/pages/Vehicles";
import EditVehicles from "@/pages/Vehicles/edit.tsx";
import AddUser from "@/pages/User";
import EditUser from "@/pages/User/edit";
import Tickets from "@/pages/Tickets";
import ViewTicket from "./pages/Tickets/View";
import AllUsers from "@/pages/User/All";
import AddVehicle from "@/pages/Vehicles/add";
import ErrorPage from "@/pages/Error";
import Navbar from "@/Components/Navbar";
import PrivateRoute from "@/pages/PrivateRoute";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen w-full">
        <Navbar />
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/vehicles/edit" element={<EditVehicles />} />
            <Route path="/vehicles/add" element={<AddVehicle />} />
            <Route path="/user/add" element={<AddUser />} />
            <Route path="/user/edit/:id" element={<EditUser />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/ticket/view/:id" element={<ViewTicket />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
