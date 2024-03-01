import React, { useState, useEffect } from "react";
import DeleteIcon from "@/assets/Delete";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ServerURL } from "@/helper";

const addVehicle = () => {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${ServerURL}/vehicle/create`,
        { number: number },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Vehicle added successfully:");
      navigate(`/vehicles`);
    } catch (error) {
      console.error("Error adding vehicle:", error.message);
      toast.error("Vehicle number should be unique.");
    }
  };

  return (
    <div className="flex flex-col flex-wrap py-[10vh] items-center gap-4">
      <div className="flex flex-col gap-10 w-full items-center justify-center">
        <span className="font-medium text-[32px] text-blue-500">Admin - Add Vehicle</span>
        <div className="flex flex-col gap-6">
          <span className="p-float-label">
            <InputText id="username" value={number} onChange={e => setNumber(e.target.value)} />
            <label htmlFor="username">Number</label>
          </span>
          <div className=" flex justify-center">
            <Button className="text-white font-medium text-base flex items-center " onClick={handleSubmit}>
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default addVehicle;
