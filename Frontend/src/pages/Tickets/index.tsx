import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { actionBody, paginationTemplate } from "@/pages/Tickets/Template";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingIcon from "@/assets/LoadingIcon";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { ServerURL } from "@/helper";

const Tickets = () => {
  const [data, setData] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [hcode, setHcode] = useState([]);
  const [driver, setDriver] = useState([]);
  const [date, setDate] = useState([]);

  const [vehicles, setVehicles] = useState();
  const [hcodes, setHcodes] = useState();
  const [drivers, setDrivers] = useState();
  const [dates, setDates] = useState();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${ServerURL}/ticket/tickets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        console.log(userData);

        setData(userData);
      } catch (error) {
        toast.error("Error fetching users:");
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
        setVehicles(response.data);
      } catch (err) {
        toast.error("Error while getting vehicles");
        console.log(err);
      }
    };
    const getDrivers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${ServerURL}/user/drivers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setDrivers(response.data);
      } catch (err) {
        toast.error("Error while getting vehicles");
        console.log(err);
      }
    };
    const getHcodes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${ServerURL}/ticket/hcodes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setHcodes(response.data);
      } catch (err) {
        toast.error("Error while getting vehicles");
        console.log(err);
      }
    };
    const getDates = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${ServerURL}/ticket/dates`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setDates(response.data);
      } catch (err) {
        toast.error("Error while getting vehicles");
        console.log(err);
      }
    };

    fetchTickets();
    getVehicles();
    getDrivers();
    getHcodes();
    getDates();
  }, []);

  const handleFilters = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${ServerURL}/ticket/filter`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          vehicle: vehicle?.number,
          driver: driver?.fullName,
          hcode: hcode?.hcode,
          date: date?.date,
        },
      });
      console.log("filter", response.data);

      setData(response.data);
    } catch (error) {
      toast.error("Error fetching tickets:");
    }
  };

  const handleClear = () => {
    setVehicle([]);
    setDriver([]);
    setHcode([]);
    setDate([]);
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${ServerURL}/ticket/tickets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        console.log(userData);

        setData(userData);
      } catch (error) {
        toast.error("Error fetching users:");
      }
    };
    fetchTickets();
  };

  return (
    <div className="flex flex-col flex-wrap py-[5vh] items-center gap-4">
      <div className="flex w-full items-center justify-center">
        <span className="font-medium text-[32px] text-blue-500">Tickets</span>
      </div>
      <div className="flex gap-6 w-full px-[15vw]">
        <Dropdown
          value={vehicle}
          onChange={e => setVehicle(e.value)}
          options={vehicles}
          optionLabel="number"
          placeholder="Select Vehicle"
          className="w-full md:w-14rem"
          showClear
        />
        <Dropdown
          value={driver}
          onChange={e => setDriver(e.value)}
          options={drivers}
          optionLabel="fullName"
          placeholder="Select Driver"
          className="w-full md:w-14rem"
          showClear
        />
        <Dropdown
          value={hcode}
          onChange={e => setHcode(e.value)}
          options={hcodes}
          optionLabel="hcode"
          placeholder="Select H Code"
          className="w-full md:w-14rem"
          showClear
        />
        <Dropdown
          value={date}
          onChange={e => setDate(e.value)}
          options={dates}
          optionLabel="date"
          placeholder="Select Date"
          className="w-full md:w-14rem"
          showClear
        />
        <Button onClick={handleFilters}>Apply filters</Button>
        <Button onClick={handleClear} className="bg-red-500 hover:bg-red-700">
          Clear filters
        </Button>
      </div>
      <div className="flex flex-col gap-6 w-full px-[15vw] mt-10">
        {data.length > 0 ? (
          <DataTable
            className="items-center"
            value={data}
            removableSort
            tableStyle={{ minWidth: "100%" }}
            dataKey="id"
            scrollable
            // scrollHeight="50vh"
            paginator
            rows={7}
            paginatorTemplate={paginationTemplate}
            paginatorClassName="justify-between"
          >
            <Column field="vehicle" header="Vehicle"></Column>
            <Column field="driver" header="Driver"></Column>
            <Column field="h_code" header="H Code"></Column>
            <Column field="date" header="Date"></Column>
            <Column field="Action" header="Action" body={actionBody}></Column>
          </DataTable>
        ) : (
          <LoadingIcon />
        )}
      </div>
    </div>
  );
};

export default Tickets;
