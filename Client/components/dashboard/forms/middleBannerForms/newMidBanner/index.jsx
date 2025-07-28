"use client";

import { useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { toast } from "react-toastify";

const NewMidBanner = () => {
  //PREVENT FORM TO BE SENT WITH ENTER
  const FormKeyNotSuber = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
    }
  };

  const [authCookie, setAuthCookie] = useState(Cookies.get("auth_cookie"));

  const imageUrlRef = useRef();
  const imageAltRef = useRef();
  const imageLinkRef = useRef();
  const imageSituationRef = useRef();

  const SubmitHandler = (e) => {
    e.preventDefault();
    const formData = {
      image: imageUrlRef.current.value,
      imageAlt: imageAltRef.current.value,
      link: imageLinkRef.current.value,
      situation: imageSituationRef.current.value,
      date: new Date().toLocaleDateString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const url = `https://behnood-fileshop-server.liara.run/api/new-middle-banner`;
    axios
      .post(url, formData, {
        headers: { auth_cookie: authCookie },
      })
      .then((d) => {
        formData.situation == "true"
          ? toast.success("بنر میانی با موفقیت منتشر شد.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          : toast.success("بنر میانی به صورت غیرفعال ذخیره شد.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
      })
      .catch((e) => {
        let message = "متاسفانه ناموفق بود.";
        if (e.response.data.msg) {
          message = e.response.data.msg;
        }

        toast.error(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-orange-500">بنر جدید</h2>
      <form
        onSubmit={SubmitHandler}
        onKeyDown={FormKeyNotSuber}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <div>آدرس عکس</div>
          <input
            required={true}
            type="text"
            ref={imageUrlRef}
            className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>alt عکس</div>
          <input
            required={true}
            type="text"
            ref={imageAltRef}
            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>لینک عکس</div>
          <input
            required={true}
            type="text"
            ref={imageLinkRef}
            className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>روشن و خاموش</div>
          <select
            ref={imageSituationRef}
            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          >
            <option value={true}>روشن</option>
            <option value={false}>خاموش</option>
          </select>
        </div>
        <button
          type="submit"
          className="cursor-pointer p-2 bg-indigo-600 text-white w-full rounded-md transition-all duration-300 hover:bg-orange-500"
        >
          ارسال
        </button>
      </form>
    </div>
  );
};

export default NewMidBanner;
