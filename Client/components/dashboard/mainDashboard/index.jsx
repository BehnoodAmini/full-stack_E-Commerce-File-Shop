"use client";

import { useState, useEffect } from "react";

import { BiMenu } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

import DashboardCtrl from "../dashboard-ctrl";
import AdminPanel from "../forms/admin-panel";
import MiddleBannerAll from "../forms/middleBannerForms";
import SliderAll from "../forms/sliderForms";
import PostsMain from "../forms/postForms";
import CategoryMain from "../forms/categoryForms";
import ProductForms from "../forms/productForms";
import UserForms from "../forms/userForms";
import PaymentForms from "../forms/paymentForms";
import CommentsMain from "../forms/commentForms";

const MainDashboard = () => {
  const [contentChanger, setContentChanger] = useState("admin-panel");
  const [details, setDetails] = useState(<AdminPanel />);

  useEffect(() => {
    if (contentChanger == "admin-panel") {
      setDetails(<AdminPanel />);
      setMenuIsOpen(-1)
    } else if (contentChanger == "midBan") {
      setDetails(<MiddleBannerAll />);
      setMenuIsOpen(-1);
    } else if (contentChanger == "sliders") {
      setDetails(<SliderAll />);
      setMenuIsOpen(-1);
    } else if (contentChanger == "posts") {
      setDetails(<PostsMain />);
      setMenuIsOpen(-1);
    } else if (contentChanger == "categories") {
      setDetails(<CategoryMain />);
      setMenuIsOpen(-1);
    } else if (contentChanger == "products") {
      setDetails(<ProductForms />);
      setMenuIsOpen(-1);
    } else if (contentChanger == "users") {
      setDetails(<UserForms />);
      setMenuIsOpen(-1);
    } else if (contentChanger == "payments") {
      setDetails(<PaymentForms />);
      setMenuIsOpen(-1);
    } else if (contentChanger == "comments") {
      setDetails(<CommentsMain />);
      setMenuIsOpen(-1);
    }
  }, [contentChanger]);

  // FOR RESPONSIVE
  const [menuIsOpen, setMenuIsOpen] = useState(-1);

  useEffect(() => {
    if (menuIsOpen == -1) {
      document.body.style.overflow = "auto";
    } else if (menuIsOpen == 1) {
      document.body.style.overflow = "hidden";
    }
  }, [menuIsOpen]);

  return (
    <div className="flex justify-between items-start gap-4 container mx-auto">
      <div
        className={
          menuIsOpen == -1
            ? "z-50 fixed md:sticky md:top-0 md:bottom-0 md:right-0 py-4 md:py-0 h-[100vh] bottom-0 top-0 left-[100%] -right-[100%]  transition-all duration-500"
            : "z-50 flex bg-[#000000cc] md:bg-transparent backdrop-blur-md p-6 md:rounded-lg rounded-none py-4 md:py-0 max-md:h-[100vh] fixed bottom-0 top-0 left-0 right-0 md:static transition-all duration-500"
        }
      >
        <DashboardCtrl setContentChanger={setContentChanger} />
      </div>
      <div className="w-full mt-12 md:mt-0">{details}</div>
      <div className="z-50 flex md:hidden fixed top-2 right-5 bg-[#b80036cb] rounded-full p-1">
        <BiMenu
          onClick={() => {
            setMenuIsOpen(menuIsOpen * -1);
          }}
          className={
            menuIsOpen == -1 ? "w-10 h-10 flex text-white" : "w-10 h-10 hidden"
          }
        />
        <IoMdClose
          onClick={() => {
            setMenuIsOpen(menuIsOpen * -1);
          }}
          className={
            menuIsOpen == 1 ? "w-10 h-10 text-white flex" : "w-10 h-10 hidden"
          }
        />
      </div>
    </div>
  );
};

export default MainDashboard;
