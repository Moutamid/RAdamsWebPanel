import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { userActionBody, paginationTemplate } from "@/pages/Tickets/Template";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingIcon from "@/assets/LoadingIcon";
import { ServerURL } from "@/helper";

const AllUsers = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${ServerURL}/user/users`);
        const userData = response.data;
        console.log(userData);

        setData(userData);
      } catch (error) {
        toast.error("Error fetching users:");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col flex-wrap py-[5vh] items-center gap-4">
      <div className="flex w-full items-center justify-center">
        <span className="font-medium text-[32px] text-blue-500">All Users</span>
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
            <Column field="firstName" header="First Name"></Column>
            <Column field="lastName" header="Last Name"></Column>
            <Column field="userName" header="Username"></Column>
            <Column field="vehicle" header="Vehicle"></Column>
            <Column field="permission" header="Permission"></Column>
            <Column field="Action" header="Action" body={userActionBody}></Column>
          </DataTable>
        ) : (
          <LoadingIcon />
        )}
      </div>
    </div>
  );
};

export default AllUsers;
