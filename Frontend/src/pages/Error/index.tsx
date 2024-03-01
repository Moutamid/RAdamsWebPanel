import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-gray-50 p-8 shadow-md flex flex-col items-center rounded-md">
        <h4 className="mb-4 text-primary text-2xl font-bold">Error 404: Page not found</h4>
        <button
          className="bg-primary text-black w-full border border-solid border-gray-300 shadow-md py-2 px-4 rounded-md hover:bg-black hover:text-white"
          onClick={goBack}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Error;
