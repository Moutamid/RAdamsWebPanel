import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ServerURL } from "@/helper";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!userName.trim() || !password.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(`${ServerURL}/login`, {
        userName: userName,
        password: password,
      });

      if (response.data.user.permission == "Admin") {
        toast.success("Login successful:");
        localStorage.setItem("token", response.data.token);
        navigate(`/home`);
      } else {
        toast.error("You are Driver. Please login on App.");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error("Login failed. Please try again.");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate(`/home`);
    }
  }, []);

  return (
    <div className="flex flex-col flex-wrap justify-center items-center h-screen">
      <div className="flex flex-col gap-6 p-10 border border-1 border-solid border-gray-200  shadow-lg rounded-lg">
        <h1 className="mb-2 text-[24px] ">Log In</h1>
        <span className="p-float-label">
          <InputText id="username" value={userName} onChange={e => setUserName(e.target.value)} />
          <label htmlFor="username">Username</label>
        </span>
        <span className="p-float-label">
          <InputText id="username" value={password} type="password" onChange={e => setPassword(e.target.value)} />
          <label htmlFor="username">Password</label>
        </span>
        <div className=" flex justify-center">
          <Button className="text-white font-medium text-base flex items-center " onClick={handleSubmit}>
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
