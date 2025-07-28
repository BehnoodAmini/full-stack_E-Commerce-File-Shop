"use client";

import dynamic from "next/dynamic";

// Dynamically import ClientToastContainer here, inside a Client Component
const DynamicToastContainer = dynamic(
  () => import("./ClientToastContainer"),
  { ssr: false } // ssr: false is now allowed because this file is a Client Component
);

const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <DynamicToastContainer />
    </>
  );
};

export default ToastProvider;