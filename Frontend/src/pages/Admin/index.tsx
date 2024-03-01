import React from "react";
import UsersIcon from "@/assets/users.png";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-wrap justify-center items-center h-screen gap-6">
      <span className="font-medium text-[32px] text-blue-500">Admin</span>
      <div className=" flex gap-10">
        <div
          onClick={() => navigate(`/vehicles`)}
          className="flex flex-col items-center gap-4 hover:border hover:border-1 hover:border-solid hover:border-gray-300 rounded-lg shadow-sm p-4 cursor-pointer"
        >
          <img src={UsersIcon} alt="Tickets" style={{ height: "150px" }} />
          <span className="font-medium text-[24px]">Vehicles</span>
        </div>
        <div
          onClick={() => navigate(`/user/add`)}
          className="flex flex-col items-center gap-4 hover:border hover:border-1 hover:border-solid hover:border-gray-300 rounded-lg shadow-sm p-4 cursor-pointer"
        >
          <img src={UsersIcon} alt="users" style={{ height: "150px" }} />
          <span className="font-medium text-[24px]">Add User</span>
        </div>
        <div
          onClick={() => navigate(`/users`)}
          className="flex flex-col items-center gap-4 hover:border hover:border-1 hover:border-solid hover:border-gray-300 rounded-lg shadow-sm p-4 cursor-pointer"
        >
          <img src={UsersIcon} alt="users" style={{ height: "150px" }} />
          <span className="font-medium text-[24px]">All Users</span>
        </div>
      </div>
    </div>
  );
};

export default Admin;
