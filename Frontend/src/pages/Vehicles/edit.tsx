import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import DeleteIcon from "@/assets/Delete";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingIcon from "@/assets/LoadingIcon";
import { useNavigate } from "react-router-dom";
import { ServerURL } from "@/helper";

const Admin = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();
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

  const VehicleCard = ({ name, id }) => {
    const deleteVehicle = async id => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${ServerURL}/vehicle/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVehicles(response.data);
        toast.success("Vehicle deleted successfully!");
        navigate(`/vehicles`);
      } catch (error) {
        toast.error("Error deleting the vehicle");
      }
    };

    return (
      <div className="flex text-[48px] items-center justify-center font-medium bg-yellow-400 text-black shadow-2xl rounded-md  border-solid border-4 border-black px-10 py-2">
        {name}
        <DeleteIcon stroke="red" height={80} width={80} className="cursor-pointer" onClick={() => deleteVehicle(id)} />
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-wrap py-[10vh] items-center gap-4">
      <div className="flex w-full items-center justify-center">
        <span className="font-medium text-[32px] text-blue-500">Admin - Edit Vehicles</span>
      </div>

      <div className=" grid grid-cols-3 gap-10 mt-6">
        {vehicles.length > 0 ? (
          vehicles.map(vehicle => {
            return (
              <div>
                <VehicleCard name={vehicle.number} id={vehicle._id} />
              </div>
            );
          })
        ) : (
          <LoadingIcon />
        )}
      </div>
    </div>
  );
};

export default Admin;
