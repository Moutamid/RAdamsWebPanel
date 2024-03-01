import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { ServerURL } from "@/helper";

const AddUser = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicle, setVehicle] = useState();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [permission, setPermission] = useState("Driver");
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    vehicle: false,
    userName: false,
    password: false,
  });
  const { id } = useParams();

  const handleChange = (e, setter) => {
    const { name, value } = e.target;
    setter(value);
    if (value.trim() === "") {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: true,
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: false,
      }));
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${ServerURL}/user/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        console.log(userData);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setPassword(userData.password);
        setPermission(userData.permission);
        setUserName(userData.userName);
        setVehicle(userData.vehicle);
      } catch (error) {
        toast.error("Error fetching user data:", error);
      }
    };

    const getVehicles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${ServerURL}/vehicle/numbers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        toast.error("Error while getting vehicles");
        console.log(err);
      }
    };

    fetchUserData();
    getVehicles();
  }, [id]);

  const handleSubmit = async () => {
    try {
      if (!firstName.trim() || !lastName.trim() || !userName.trim() || !password.trim()) {
        toast.error("Please fill in all required fields.");
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication token is missing. Please log in again.");
        return;
      }

      const response = await axios.put(
        `${ServerURL}/user/edit/${id}`,
        {
          firstName,
          lastName,
          vehicle: vehicle?.number,
          userName,
          password,
          permission,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User data updated successfully:", response.data);

      toast.success("User updated successfully!");
      navigate(`/users`);
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to update user data. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col flex-wrap py-[10vh] items-center gap-4">
      <div className="flex w-full items-center justify-center">
        <span className="font-medium text-[32px] text-blue-500">Admin - Edit User</span>
      </div>
      <div className="flex flex-col gap-6">
        <span className="p-float-label">
          <InputText id="firstName" value={firstName} onChange={e => handleChange(e, setFirstName)} />
          <label htmlFor="firstName" className={errors.firstName ? "error" : ""}>
            First Name
          </label>
          {errors.firstName && <small className="error-message">First name is required</small>}
        </span>
        <span className="p-float-label">
          <InputText id="lastName" value={lastName} onChange={e => handleChange(e, setLastName)} />
          <label htmlFor="lastName" className={errors.lastName ? "error" : ""}>
            Last Name
          </label>
          {errors.lastName && <small className="error-message">Last name is required</small>}
        </span>
        <span className="p-float-label">
          {/* <InputText id="vehicle" value={vehicle} onChange={e => handleChange(e, setVehicle)} /> */}
          <Dropdown
            value={vehicle}
            onChange={e => setVehicle(e.value)}
            options={data}
            optionLabel="number"
            placeholder="Select a Vehicle"
            className="!w-[17rem]"
          />
          <label htmlFor="vehicle" className={errors.vehicle ? "error" : ""}>
            Vehicle
          </label>
          {errors.vehicle && <small className="error-message">Vehicle is required</small>}
        </span>
        <span className="p-float-label">
          <InputText id="userName" value={userName} onChange={e => handleChange(e, setUserName)} />
          <label htmlFor="userName" className={errors.userName ? "error" : ""}>
            Username
          </label>
          {errors.userName && <small className="error-message">Username is required</small>}
        </span>
        <span className="p-float-label">
          <InputText id="password" value={password} onChange={e => handleChange(e, setPassword)} />
          <label htmlFor="password" className={errors.password ? "error" : ""}>
            Password
          </label>
          {errors.password && <small className="error-message">Password is required</small>}
        </span>
        <div className="flex flex-wrap gap-3">
          <div className="flex align-items-center">
            <RadioButton
              inputId="permission1"
              name="permission"
              value="Driver"
              onChange={e => setPermission(e.value)}
              checked={permission === "Driver"}
            />
            <label htmlFor="permission1" className="ml-2">
              Driver
            </label>
          </div>
          <div className="flex align-items-center">
            <RadioButton
              inputId="permission2"
              name="permission"
              value="Admin"
              onChange={e => setPermission(e.value)}
              checked={permission === "Admin"}
            />
            <label htmlFor="permission2" className="ml-2">
              Admin
            </label>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button onClick={handleSubmit}>Add User</Button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
