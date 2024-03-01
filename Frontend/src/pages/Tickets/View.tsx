import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import TicketImage from "@/assets/ticket.jpeg";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingIcon from "@/assets/LoadingIcon";
import { saveAs } from "file-saver";
import { BackendURL, ServerURL } from "@/helper";

const ViewTicket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState();
  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${ServerURL}/ticket/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const ticketData = response.data;
        console.log(ticketData);
        setTicket(ticketData);
      } catch (error) {
        toast.error("Error fetching user data:", error);
      }
    };

    fetchTicketData();
  }, [id]);

  const downloadImage = AllImages => {
    AllImages.forEach(element => {
      saveAs(`${BackendURL}/${element}`, element);
    });
  };

  return (
    <>
      <div className="flex flex-col flex-wrap py-[10vh] items-center gap-4">
        <div className="flex w-full items-center justify-center">
          <span className="font-medium text-[32px] text-blue-500">Ticket View</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 px-20 my-10">
        {ticket ? (
          <div className="px-6 py-10 border border-1 border-solid border-gray-300 rounded-lg shadow-md my-10">
            <span className="font-medium text-[32px] text-blue-500">Details:</span>
            <div className="flex flex-col gap-4 mt-10">
              <div className="flex gap-4">
                <span className="font-medium text-[24px]">Vehicle:</span>
                <span className="font-normal text-[24px]">{ticket && ticket?.vehicle}</span>
              </div>
              <div className="flex gap-4">
                <span className="font-medium text-[24px]">Driver:</span>
                <span className="font-normal text-[24px]">{ticket && ticket?.driver}</span>
              </div>
              <div className="flex gap-4">
                <span className="font-medium text-[24px]">H Code:</span>
                <span className="font-normal text-[24px]">{ticket && ticket?.h_code}</span>
              </div>
              <div className="flex gap-4">
                <span className="font-medium text-[24px]">Date:</span>
                <span className="font-normal text-[24px]">{ticket && ticket?.date}</span>
              </div>
            </div>
          </div>
        ) : (
          <LoadingIcon />
        )}
        <div>
          <span className="font-medium text-[32px] text-blue-500">Images:</span>
          <div className="flex gap-6 flex-wrap my-10">
            {ticket ? (
              ticket?.images?.map((imageName, index) => (
                <img key={index} src={`http://127.0.0.1:8000/${imageName}`} alt={imageName} height={200} width={200} />
              ))
            ) : (
              <LoadingIcon />
            )}
          </div>
          <div className="mt-5 mb-20 flex justify-center">
            <Button onClick={() => downloadImage(ticket?.images)}>Download</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTicket;
