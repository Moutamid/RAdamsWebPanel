import { Button } from "primereact/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const panels = ["Admin Panel", "Engineer Portal"];

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate(`/login`);
  };
  return (
    <nav className="flex items-center justify-between h-20 border border-b-1 border-b-gray-300 px-4 pr-8 z-50">
      <div className="ml-10 flex justify-center items-center gap-4 cursor-pointer" onClick={() => navigate(`/home`)}>
        <span className="font-medium text-[32px] text-blue-500">TicketsApp</span>
      </div>
      <div className="flex gap-6 mr-10">
        {localStorage.getItem("token") && <Button onClick={() => navigate(`/home`)}>Home</Button>}
        {localStorage.getItem("token") ? (
          <Button onClick={() => handleLogOut()}>Logout</Button>
        ) : (
          <Button onClick={() => navigate(`/login`)}>Login</Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
