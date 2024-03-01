import React, { useEffect } from "react";
import TicketsIcon from "@/assets/tickets.png";
import UsersIcon from "@/assets/users.png";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate(`/login`);
    }
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center h-screen gap-10">
      <div
        onClick={() => navigate(`/tickets`)}
        className="flex flex-col items-center gap-4 hover:border hover:border-1 hover:border-solid hover:border-gray-300 rounded-lg shadow-sm p-4 cursor-pointer"
      >
        <img src={TicketsIcon} alt="Tickets" style={{ height: "150px" }} />
        <span className="font-medium text-[24px]">Tickets</span>
      </div>
      <div
        onClick={() => navigate(`/admin`)}
        className="flex flex-col items-center gap-4 hover:border hover:border-1 hover:border-solid hover:border-gray-300 rounded-lg shadow-sm p-4 cursor-pointer"
      >
        <img src={UsersIcon} alt="users" style={{ height: "150px" }} />
        <span className="font-medium text-[24px]">Admin</span>
      </div>
    </div>
  );
};

export default Home;
