"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

import { toast } from "react-toastify";

const PaymentDetails = ({ goalId }) => {
  //PREVENT FORM TO BE SENT WITH ENTER
  const FormKeyNotSuber = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
    }
  };

  const goTopCtrl = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const [authCookie, setAuthCookie] = useState(Cookies.get("auth_cookie"));

  const viewedRef = useRef();
  const amountRef = useRef();
  const payedRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();

  // LOADING DEFAULT VALUES
  const [fullData, setFullData] = useState([-1]);
  useEffect(() => {
    goTopCtrl();
    axios
      .get(
        `https://behnood-fileshop-server.liara.run/api/get-payment/${goalId}`,
        {
          headers: { auth_cookie: authCookie },
        }
      )
      .then((d) => {
        setFullData(d.data);
        console.log(d.data);
      })
      .catch((e) => {
        toast.error("خطا در لود اطلاعات!", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }, [goalId]);

  const UpdateHandler = (e) => {
    e.preventDefault();
    const formData = {
      updatedAt: new Date().toLocaleDateString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      viewed: viewedRef.current.value,
      amount: amountRef.current.value,
      payed: payedRef.current.value,
      email: emailRef.current.value,
      username: usernameRef.current.value,
      products: fullData.products,
    };
    const url = `https://behnood-fileshop-server.liara.run/api/update-payment/${goalId}`;
    axios
      .post(url, formData, {
        headers: { auth_cookie: authCookie },
      })
      .then((d) => {
        toast.success("سفارش با موفقیت به‌روزرسانی شد.", {
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

  const RemoveHandler = () => {
    const url = `https://behnood-fileshop-server.liara.run/api/delete-payment/${goalId}`;
    axios
      .post(
        url,
        { item: 1 },
        {
          headers: { auth_cookie: authCookie },
        }
      )
      .then((d) => {
        toast.success("سفارش با موفقیت حذف شد.", {
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
      {fullData[0] == -1 ? (
        <div className="flex justify-center items-center p-12">
          <Image alt="loading" width={120} height={120} src={"/loading.svg"} />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h2 className="text-orange-500">جزئیات سفارش</h2>
            <div className="w-20 h-6 flex justify-center items-center m-1">
              <button
                onClick={() => RemoveHandler()}
                className="cursor-pointer h-8 inline-flex items-center px-4 py-2 bg-rose-600 transition ease-in-out delay-75 hover:bg-rose-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
              >
                حذف
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center flex-wrap gap-5">
            <div className="bg-zinc-100 rounded px-3 py-1 text-sm">
              کد پرداختی: {fullData.resnumber ? fullData.resnumber : ""}
            </div>
            <div className="bg-zinc-100 rounded px-3 py-1 text-sm">
              به‌روزرسانی: {fullData.updatedAt ? fullData.updatedAt : ""}
            </div>
            <div className="bg-zinc-100 rounded px-3 py-1 text-sm">
              تاریخ ایجاد: {fullData.createdAt ? fullData.createdAt : ""}
            </div>
          </div>
          <form
            onSubmit={UpdateHandler}
            onKeyDown={FormKeyNotSuber}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <div>دیده شد</div>
              <select
                ref={viewedRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              >
                {fullData.viewed && fullData.viewed == true ? (
                  <>
                    <option value={true}>دیده شده</option>
                    <option value={false}>دیده نشده</option>
                  </>
                ) : (
                  <>
                    <option value={false}>دیده نشده</option>
                    <option value={true}>دیده شده</option>
                  </>
                )}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <div>ایمیل جدید کاربر</div>
              <input
                defaultValue={fullData.email ? fullData.email : ""}
                required={true}
                type="text"
                ref={emailRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>نام کاربری جدید(username)</div>
              <input
                defaultValue={fullData.username ? fullData.username : ""}
                required={true}
                type="text"
                ref={usernameRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>مبلغ جدید:(تومان)</div>
              <input
                defaultValue={fullData.amount ? fullData.amount : ""}
                required={true}
                type="number"
                ref={amountRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>محصولات</div>
              {
                <div className="flex justify-center md:justify-start items-center gap-4 text-xs flex-wrap">
                  {fullData.products.length < 1 ? (
                    <div>بدون محصول</div>
                  ) : (
                    fullData.products.map((da, i) => (
                      <div
                        key={i}
                        className="bg-zinc-100 rounded-lg p-4 flex flex-col gap-2 shadow-[0px_0px_5px_rgba(0,0,0,.15)]"
                      >
                        <div className="flex justify-between items-center gap-1">
                          <div>شناسه: </div>
                          <div>{da._id}</div>
                        </div>
                        <div className="flex justify-start items-center gap-1">
                          <div>عنوان: </div>
                          <div>{da.title}</div>
                        </div>
                        <div className="flex justify-center">
                          <Link
                            href={`/shop/${da.slug}`}
                            target={"_blank"}
                            className="rounded-lg flex justify-center items-center w-12 h-6 text-xs bg-indigo-500 text-white! hover:bg-indigo-600 transition-all duration-300"
                          >
                            لینک
                          </Link>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              }
            </div>
            <div className="flex flex-col gap-2">
              <div>وضعیت پرداخت</div>
              <select
                ref={payedRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              >
                {fullData.payed && fullData.payed == true ? (
                  <>
                    <option value={true}>پرداخت شده</option>
                    <option value={false}>پرداخت نشده</option>
                  </>
                ) : (
                  <>
                    <option value={false}>پرداخت نشده</option>
                    <option value={true}>پرداخت شده</option>
                  </>
                )}
              </select>
            </div>
            <button
              type="submit"
              className="cursor-pointer p-2 bg-indigo-600 text-white w-full rounded-md transition-all duration-300 hover:bg-orange-500"
            >
              به روز رسانی
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
