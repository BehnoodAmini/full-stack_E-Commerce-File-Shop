"use client";

import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import UserDetails from "../userDetails";
import Loading from "@/app/loading";

const FindUser = () => {
  const [authCookie, setAuthCookie] = useState(Cookies.get("auth_cookie"));

  const [userData, setUserData] = useState(0);
  const emailRef = useRef();

  const SubmitHandler = (e) => {
    e.preventDefault();
    setUserData(2);
    const formData = {
      email: emailRef.current.value,
    };
    const url = `https://behnood-fileshop-server.liara.run/api/search-user`;
    axios
      .post(url, formData, {
        headers: { auth_cookie: authCookie },
      })
      .then((d) => {
        if (d.data.userData == 0) {
          toast.info("چنین کاربری یافت نشد!", {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setUserData(1);
        } else {
          toast.success("اطلاعات کاربر بارگذاری شد.", {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setUserData(d.data.userData);
        }
      })
      .catch((e) => {
        let message = "خطا در لود اطلاعات!";
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
      <div className="flex flex-col gap-2">
        <h2>پیدا کردن کاربر با ایمیل</h2>
        <form onSubmit={SubmitHandler} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <input
              required={true}
              type="email"
              ref={emailRef}
              placeholder="لطفا یک ایمیل وارد کنید..."
              className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_10px_0_rgba(99,102,241,.70)] py-2.5 px-2.5 rounded-xl border-[1px] border-slate-500 text-white group mb-10"
          >
            جست و جوی کاربر
          </button>
        </form>
        <div>
          <div>
            {userData == 0 ? (
              <div></div>
            ) : userData == 1 ? (
              <div className="flex justify-center items-center text-rose-600">
                کاربری با این مشخصات پیدا نشد...
              </div>
            ) : userData == 2 ? (
              <Loading />
            ) : (
              <UserDetails goalId={userData._id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindUser;
