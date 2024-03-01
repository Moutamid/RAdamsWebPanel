import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingIcon from "@/assets/LoadingIcon";
import { ServerURL } from "@/helper";

const VehicleCard = ({ name }) => {
  return (
    <div className="text-[48px] font-medium bg-yellow-400 text-black shadow-2xl rounded-md  border-solid border-4 border-black px-10 py-2">
      {name}
    </div>
  );
};

const Admin = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${ServerURL}/vehicle/vehicles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error.message);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className="flex flex-col flex-wrap py-[10vh] items-center gap-4">
      <div className="flex w-full items-center justify-center">
        <span className="font-medium text-[32px] text-blue-500">Admin - Vehicles</span>
      </div>
      <div className="flex gap-4 w-full items-center justify-center">
        <Button onClick={() => navigate(`/vehicles/add`)}>Add Vehicle</Button>
        <Button onClick={() => navigate(`/vehicles/edit`)}>Edit Vehicles</Button>
      </div>
      <div className=" grid grid-cols-3 gap-10 mt-6">
        {vehicles.length > 0 ? (
          vehicles.map(vehicle => {
            return <VehicleCard name={vehicle?.number} />;
          })
        ) : (
          <LoadingIcon />
        )}
      </div>
    </div>
  );
};

export default Admin;
