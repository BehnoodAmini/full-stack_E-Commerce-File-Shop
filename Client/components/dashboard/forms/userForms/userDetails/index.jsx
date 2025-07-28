"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

import { toast } from "react-toastify";

const UserDetails = ({ goalId }) => {
  //PREVENT FORM TO BE SENT WITH ENTER
  const FormKeyNotSuber = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
    }
  };

  // PRICE BEAUTIFUL
  function priceChanger(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const goTopCtrl = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const [authCookie, setAuthCookie] = useState(Cookies.get("auth_cookie"));

  const viewedRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const displaynameRef = useRef();
  const activateCodeRef = useRef();
  const userIsActiveRef = useRef();
  const emailSendRef = useRef();
  const activateCodeCounterRef = useRef();

  const UpdateHandler = (e) => {
    e.preventDefault();
    const formData = {
      updatedAt: new Date().toLocaleDateString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      email: emailRef.current.value,
      username: usernameRef.current.value,
      viewed: viewedRef.current.value,
      displayname: displaynameRef.current.value,
      userIsActive: userIsActiveRef.current.value,
      activateCode: activateCodeRef.current.value,
      emailSend: emailSendRef.current.value,
      activateCodeCounter: activateCodeCounterRef.current.value,
    };
    const url = `https://behnood-fileshop-server.liara.run/api/update-user/${goalId}`;
    axios
      .post(url, formData, {
        headers: { auth_cookie: authCookie },
      })
      .then((d) => {
        toast.success("کاربر با موفقیت به‌روزرسانی شد.", {
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
    const url = `https://behnood-fileshop-server.liara.run/api/delete-user/${goalId}`;
    axios
      .post(
        url,
        { item: 1 },
        {
          headers: { auth_cookie: authCookie },
        }
      )
      .then((d) => {
        toast.success("کاربر با موفقیت حذف شد.", {
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

  // LOADING DEFAULT VALUES
  const [fullData, setFullData] = useState([-1]);
  useEffect(() => {
    goTopCtrl();
    axios
      .get(`https://behnood-fileshop-server.liara.run/api/get-user/${goalId}`, {
        headers: { auth_cookie: authCookie },
      })
      .then((d) => {
        setFullData(d.data);
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

  const paymentUncheckerHandler = (goalId) => {
    const url = `https://behnood-fileshop-server.liara.run/api/uncheck-payment/${goalId}`;
    axios
      .get(url, {
        headers: { auth_cookie: authCookie },
      })
      .then((d) => {
        toast.success("به بخش سفارش‌های جدید افزوده شد.", {
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

  const commentUncheckerHandler = (goalId) => {
    const url = `https://behnood-fileshop-server.liara.run/api/uncheck-comment/${goalId}`;
    axios
      .get(url, {
        headers: { auth_cookie: authCookie },
      })
      .then((d) => {
        toast.success("به بخش دیدگاه‌های جدید افزوده شد.", {
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
            <h2 className="text-orange-500">جزئیات کاربر</h2>
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
              شناسه کاربر: {fullData._id ? fullData._id : ""}
            </div>
            <div className="bg-zinc-100 rounded px-3 py-1 text-sm">
              تاریخ ایجاد: {fullData.createdAt ? fullData.createdAt : ""}
            </div>
            <div className="bg-zinc-100 rounded px-3 py-1 text-sm">
              به‌روزرسانی: {fullData.updatedAt ? fullData.updatedAt : ""}
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
              <div>ایمیل کاربر</div>
              <input
                defaultValue={fullData.email ? fullData.email : ""}
                required={true}
                type="text"
                ref={emailRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>نام کاربری(username)</div>
              <input
                defaultValue={fullData.username ? fullData.username : ""}
                required={true}
                type="text"
                ref={usernameRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>نام نمایشی(displayname)</div>
              <input
                defaultValue={fullData.displayname ? fullData.displayname : ""}
                required={true}
                type="text"
                ref={displaynameRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>کد فعال سازی حساب کاربر</div>
              <input
                defaultValue={
                  fullData.activateCode ? fullData.activateCode : ""
                }
                required={true}
                type="text"
                ref={activateCodeRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>تعداد باقی مانده ارسال کد فعال سازی به کاربر</div>
              <input
                defaultValue={
                  fullData.activateCodeCounter
                    ? fullData.activateCodeCounter
                    : 0
                }
                required={true}
                type="number"
                ref={activateCodeCounterRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>محصولات مورد علاقه کاربر</div>
              {
                <div className="flex justify-center md:justify-start items-center gap-4 text-xs flex-wrap">
                  {fullData.favoriteProducts.length < 1 ? (
                    <div>بدون محصول مورد علاقه</div>
                  ) : (
                    fullData.favoriteProducts.map((da, i) => (
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
              <div>سبد خرید کاربر</div>
              {
                <div className="flex justify-center md:justify-start items-center gap-4 text-xs flex-wrap">
                  {fullData.cart.length < 1 ? (
                    <div>محصولی در سبد خرید کاربر نیست!</div>
                  ) : (
                    fullData.cart.map((da, i) => (
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
              <div>محصولات خریداری شده</div>
              {
                <div className="flex justify-center md:justify-start items-center gap-4 text-xs flex-wrap">
                  {fullData.userProducts.length < 1 ? (
                    <div>بدون محصول خریداری شده.</div>
                  ) : (
                    fullData.userProducts.map((da, i) => (
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
              <div>سفارش‌ها</div>
              {
                <div className="flex justify-center md:justify-start items-center gap-4 text-xs flex-wrap">
                  {fullData.payments.length < 1 ? (
                    <div>بدون سفارش.</div>
                  ) : (
                    fullData.payments.map((da, i) => (
                      <div
                        key={i}
                        className="bg-zinc-100 rounded-lg p-4 flex flex-col gap-2 shadow-[0px_0px_5px_rgba(0,0,0,.15)]"
                      >
                        <div className="flex justify-between items-center gap-1">
                          <div>مبلغ: </div>
                          <div>{priceChanger(da.amount)} تومان</div>
                        </div>
                        <div className="flex justify-between items-center gap-4">
                          <div>وضعیت: </div>
                          <div>
                            {da.payed == true
                              ? "پرداخت شده✅"
                              : "پرداخت نشده❌"}
                          </div>
                        </div>
                        <div className="flex justify-between items-center gap-4">
                          <div>تاریخ: </div>
                          <div>{da.createdAt}</div>
                        </div>
                        <div
                          onClick={() => paymentUncheckerHandler(da._id)}
                          className="cursor-pointer rounded-lg flex justify-center items-center w-50 h-6 text-xs bg-indigo-500 text-white! hover:bg-indigo-600 transition-all duration-300"
                        >
                          نمایش در بخش سفارش‌های جدید
                        </div>
                      </div>
                    ))
                  )}
                </div>
              }
            </div>
            <div className="flex flex-col gap-2">
              <div>دیدگاه‌ها</div>
              {
                <div className="flex justify-center md:justify-start items-center gap-2 text-xs flex-wrap">
                  {fullData.comments.length < 1 ? (
                    <div>بدون دیدگاه.</div>
                  ) : (
                    fullData.comments.map((da, i) => (
                      <div
                        key={i}
                        className="w-[90%] md:w-[48%] min-h-[12rem] bg-zinc-100 rounded-lg p-4 flex flex-col justify-between gap-1 shadow-[0px_0px_5px_rgba(0,0,0,.15)]"
                      >
                        <div className="flex justify-between items-center gap-2">
                          <div>مرجع: </div>
                          <div>
                            {da.typeOfModel == "post" ? "مقاله" : "محصول"}
                          </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                          <div>تاریخ: </div>
                          <div>{da.createdAt}</div>
                        </div>
                        <div className="flex justify-start items-start gap-1">
                          <div>متن: </div>
                          <div className="text-justify line-clamp-3">
                            {da.message}
                          </div>
                        </div>
                        <div className="flex justify-center items-center">
                          <div
                            onClick={() => commentUncheckerHandler(da._id)}
                            className="cursor-pointer rounded-lg flex justify-center items-center w-50 h-6 text-xs bg-indigo-500 text-white! hover:bg-indigo-600 transition-all duration-300"
                          >
                            نمایش در بخش دیدگاه‌های جدید
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              }
            </div>
            <div className="flex flex-col gap-2">
              <div>وضعیت حساب کاربری</div>
              <select
                ref={userIsActiveRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              >
                {fullData.userIsActive && fullData.userIsActive == true ? (
                  <>
                    <option value={true}>فعال</option>
                    <option value={false}>غیرفعال</option>
                  </>
                ) : (
                  <>
                    <option value={false}>غیرفعال</option>
                    <option value={true}>فعال</option>
                  </>
                )}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <div>وضعیت ارسال ایمیل تبلیغاتی</div>
              <select
                ref={emailSendRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              >
                {fullData.emailSend && fullData.emailSend == true ? (
                  <>
                    <option value={true}>ارسال می‌شود</option>
                    <option value={false}>ارسال نمی‌شود</option>
                  </>
                ) : (
                  <>
                    <option value={false}>ارسال نمی‌شود</option>
                    <option value={true}>ارسال می‌شود</option>
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

export default UserDetails;
