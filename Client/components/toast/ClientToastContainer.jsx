"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientToastContainer = () => {
  return (
    <ToastContainer
      bodyClassName={() => "font-[IRANSans] text-sm flex items-center"}
      position="top-right"
      autoClose={3000}
      theme="colored"
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={true}
      pauseOnHover
      draggable
      progress={undefined}
    />
  );
};

export default ClientToastContainer;
