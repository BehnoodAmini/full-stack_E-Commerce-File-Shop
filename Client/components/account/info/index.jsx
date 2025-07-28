"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import Cookies from "js-cookie";

import { FiRefreshCw } from "react-icons/fi";

const Info = ({ cookie }) => {
  const [data, setData] = useState([-1]);
  const [needRefresh, setNeedRefresh] = useState(0);
  useEffect(() => {
    if (cookie && cookie.length > 0) {
      axios
        .get(
          "https://behnood-fileshop-server.liara.run/api/get-part-of-user-data/info",
          { headers: { auth_cookie: cookie } }
        )
        .then((d) => {
          setData(d.data);
          setBulkEmailSituation(d.data.emailSend);
        })
        .catch((e) => {
          toast.error("خطا در لود اطلاعات", {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      setNeedRefresh(0);
    }
  }, [cookie, needRefresh]);

  // FOR MINI UPDATE DATA
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({});

  const formSubmitHandler = () => {
    const formData = {
      displayname: watch("displayname"),
      password: watch("password"),
      rePassword: watch("rePassword"),
    };
    const backendUrl = `https://behnood-fileshop-server.liara.run/api/mini-update-user/${data._id}`;
    axios
      .post(backendUrl, formData, {
        headers: { auth_cookie: authCookie },
      })
      .then((d) => {
        const message = d.data.msg
          ? d.data.msg
          : "تغییر اطلاعات با موفقیت انجام شد!";
        toast.success(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setNeedRefresh(1);
      })
      .catch((err) => {
        const errorMsg =
          err.response && err.response.data && err.response.data.msg
            ? err.response.data.msg
            : "خطا!";
        console.log(err);
        toast.error(errorMsg, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  // FOR CONFIRMING USER ACCOUNT USING EMAIL
  const ActivateCodeRef = useRef();
  const emailConfirmHandler = (e) => {
    e.preventDefault();
    const formData = {
      activateCode: ActivateCodeRef.current.value,
    };
    const backendUrl = `https://behnood-fileshop-server.liara.run/api/confirm-user-email`;
    axios
      .post(backendUrl, formData, { headers: { auth_cookie: cookie } })
      .then((d) => {
        const message = d.data.msg
          ? d.data.msg
          : "تغییر اطلاعات با موفقیت انجام شد!";
        toast.success(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setNeedRefresh(1);
      })
      .catch((err) => {
        const errorMsg =
          err.response && err.response.data && err.response.data.msg
            ? err.response.data.msg
            : "خطا!";
        console.log(err);
        toast.error(errorMsg, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  // FOR CONFIRMING USER ACCOUNT USING EMAIL
  const sendEmailReactivator = () => {
    const backendUrl = `https://behnood-fileshop-server.liara.run/api/user-reactivation-code`;
    axios
      .post(backendUrl, { item: 1 }, { headers: { auth_cookie: cookie } })
      .then((d) => {
        const message = d.data.msg ? d.data.msg : "ایمیل دوباره ارسال شد!";
        toast.success(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setNeedRefresh(1);
      })
      .catch((err) => {
        const errorMsg =
          err.response && err.response.data && err.response.data.msg
            ? err.response.data.msg
            : "خطا!";
        console.log(err);
        toast.error(errorMsg, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  // FOR ADVERTISE EMAILS
  const [bulkEmailSituation, setBulkEmailSituation] = useState(true);
  const bulkEmailChanger = (input) => {
    const formData = {
      emailSend: input,
    };
    const backendUrl = `https://behnood-fileshop-server.liara.run/api/update-email-user`;
    axios
      .post(backendUrl, formData, { headers: { auth_cookie: cookie } })
      .then((d) => {
        const message = d.data.msg
          ? d.data.msg
          : "تغییر اطلاعات با موفقیت انجام شد!";
        toast.success(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setBulkEmailSituation(input);
      })
      .catch((err) => {
        const errorMsg =
          err.response && err.response.data && err.response.data.msg
            ? err.response.data.msg
            : "خطا!";
        console.log(err);
        toast.error(errorMsg, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  // ROUTER AFTER LOGOUT
  const [routerState, setRouterState] = useState(0);
  useEffect(() => {
    if (routerState == 1) {
      router.push("/login");
      setRouterState(0);
    }
  }, [routerState]);

  // LOGOUT
  const router = useRouter();
  const logoutHandler = () => {
    Cookies.remove("auth_cookie");
    setRouterState(1);
  };

  return (
    <div className="flex flex-col gap-8 relative pt-8">
      <>
        <meta charSet="utf-8" />
        <title> اطلاعات من </title>
        <meta name="description" content=" اطلاعات من " />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="/account/info" />
      </>
      <h3 className="text-xl absolute top-1 right-1">اطلاعات من</h3>
      <div
        onClick={() => {
          setNeedRefresh(1);
          setData([-1]);
        }}
        className="absolute top-0 left-0 cursor-pointer text-white bg-indigo-500 rounded-md flex text-sm justify-center items-center gap-1 w-28 h-10"
      >
        <FiRefreshCw /> به روز رسانی
      </div>
      <div>
        {data[0] == -1 ? (
          <div className="flex justify-center items-center p-12">
            <Image
              alt="loading"
              width={120}
              height={120}
              src={"/loading.svg"}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {data.userIsActive == false ? (
              <div className="flex flex-col gap-8 bg-zinc-200 w-full text-sm rounded-xl p-4 mt-5">
                <form
                  onSubmit={emailConfirmHandler}
                  className="flex flex-col gap-8 items-center"
                >
                  <div className="flex flex-wrap justify-between items-center gap-4 w-full">
                    <h3 className="text-lg">تایید حساب کاربری</h3>
                    <div
                      onClick={() => sendEmailReactivator()}
                      className="cursor-pointer bg-sky-600 text-white! rounded-lg px-4 py-2 transition-all duration-300 hover:bg-sky-700 text-xs"
                    >
                      ارسال دوباره ایمیل ( {data.activateCodeCounter} )
                    </div>
                  </div>
                  <input
                    type="text"
                    ref={ActivateCodeRef}
                    required
                    placeholder="لطفا کدی که برایتان ارسال شده است را وارد کنید تا حساب کاربری فعال شود."
                    autoComplete="off"
                    className="p-2 rounded-md w-full outline-none border-zinc-400 border-2 focus:border-orange-300 shadow-[0px_0px_5px_rgba(0,0,0,.15)] transition-all duration-500 focus:shadow-orange-400"
                  />
                  <button
                    type="submit"
                    className="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group"
                  >
                    فعال کردن حساب
                  </button>
                </form>
              </div>
            ) : (
              <div></div>
            )}

            <div className="flex justify-center md:justify-between items-center gap-4 flex-wrap">
              <div className="flex justify-center gap-1 items-center bg-zinc-200 w-60 text-sm h-10 rounded-md p-1">
                <div>تاریخ ثبت نام:</div>
                <div>{data.createdAt}</div>
              </div>
              <div className="flex justify-center gap-1 items-center bg-zinc-200 w-60 text-sm h-10 rounded-md p-1">
                <div>به روز رسانی:</div>
                <div>{data.updatedAt}</div>
              </div>
            </div>
            <div className="flex flex-col gap-8 bg-zinc-200 w-full text-sm rounded-md p-4">
              <div className="flex justify-start gap-1 items-center">
                <div>نام کاربری:</div>
                <div>{data.username}</div>
              </div>
              <div className="flex justify-start gap-1 items-center">
                <div>نام نمایشی:</div>
                <div>{data.displayname}</div>
              </div>
              <div className="flex justify-start gap-1 items-center">
                <div>ایمیل:</div>
                <div>{data.email}</div>
              </div>
            </div>
            <div className="flex flex-col gap-8 items-center bg-zinc-200 w-full text-sm rounded-md p-4">
              <div className="text-base">به روز رسانی اطلاعات</div>
              <form
                onSubmit={handleSubmit(formSubmitHandler)}
                className="flex flex-col gap-8 w-full md:w-[30rem] bg-gray-100 p-6 rounded-md shadow-[0px_0px_1rem_rgba(0,0,0,.2)]"
              >
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="نام نمایشی جدید"
                    autoComplete="off"
                    className="p-2 rounded-md w-full outline-none border-zinc-400 border-2 focus:border-orange-300 shadow-[0px_0px_5px_rgba(0,0,0,.15)] transition-all duration-500 focus:shadow-orange-400"
                    {...register("displayname", {
                      required: true,
                      maxLength: 20,
                      minLength: 8,
                    })}
                  />
                  {errors.displayname &&
                    errors.displayname.type == "required" && (
                      <div className="text-rose-500 text-sm">
                        نام نمایشی وارد نشده است!
                      </div>
                    )}
                  {errors.displayname &&
                    errors.displayname.type == "maxLength" && (
                      <div className="text-rose-500 text-sm">
                        نام نمایشی باید کمتر از 20 کارکتر باشد!
                      </div>
                    )}
                  {errors.displayname &&
                    errors.displayname.type == "minLength" && (
                      <div className="text-rose-500 text-sm">
                        نام نمایشی باید بیشتر از 8 کارکتر باشد!
                      </div>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    type="password"
                    placeholder="رمز عبور جدید"
                    autoComplete="off"
                    className="p-2 rounded-md w-full outline-none border-zinc-400 border-2 focus:border-orange-300 shadow-[0px_0px_5px_rgba(0,0,0,.15)] transition-all duration-500 focus:shadow-orange-400"
                    {...register("password", {
                      required: true,
                      maxLength: 20,
                      minLength: 8,
                    })}
                  />
                  {errors.password && errors.password.type == "required" && (
                    <div className="text-rose-500 text-sm">
                      رمز عبور وارد نشده است!
                    </div>
                  )}
                  {errors.password && errors.password.type == "maxLength" && (
                    <div className="text-rose-500 text-sm">
                      رمز عبور باید کمتر از 20 کارکتر باشد!
                    </div>
                  )}
                  {errors.password && errors.password.type == "minLength" && (
                    <div className="text-rose-500 text-sm">
                      رمز عبور باید بیشتر از 8 کارکتر باشد!
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    type="password"
                    placeholder="تکرار رمز عبور جدید"
                    autoComplete="off"
                    className="p-2 rounded-md w-full outline-none border-zinc-400 border-2 focus:border-orange-300 shadow-[0px_0px_5px_rgba(0,0,0,.15)] transition-all duration-500 focus:shadow-orange-400"
                    {...register("rePassword", {
                      required: true,
                      validate: (val) => val === watch("password"),
                    })}
                  />
                  {errors.rePassword &&
                    errors.rePassword.type == "required" && (
                      <div className="text-rose-500 text-sm">
                        رمز عبور وارد نشده است!
                      </div>
                    )}
                  {errors.rePassword &&
                    errors.rePassword.type == "validate" && (
                      <div className="text-rose-500 text-sm">
                        تکرار رمز عبور مطابقت ندارد!
                      </div>
                    )}
                </div>
                <button
                  type="submit"
                  className="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group"
                >
                  به روز رسانی اطلاعات
                </button>
              </form>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-6 bg-zinc-100 w-full text-sm rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between w-85 h-12 bg-white rounded-xl border border-zinc-300 px-4 py-2 shadow-sm">
                <span>اطلاع رسانی جشنواره‌ها از طریق ایمیل</span>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={bulkEmailSituation}
                    onChange={(e) => bulkEmailChanger(e.target.checked)}
                  />
                  <div className="group peer ring-0 bg-rose-400 rounded-full outline-none duration-300 after:duration-300 w-16 h-8 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-5.5 after:top-1 after:left-1 after:-rotate-180 after:flex after:justify-center after:items-center after:text-[0.85rem] after:leading-none peer-checked:after:translate-x-8 peer-checked:after:content-['✔️'] peer-hover:after:scale-95  peer-checked:after:rotate-0"></div>
                </label>
              </div>
              <button
                onClick={logoutHandler}
                className="cursor-pointer bg-white text-center w-85 rounded-2xl h-12 relative text-sm group"
                type="button"
              >
                <div className="bg-rose-500 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-0 top-[1px] group-hover:w-85 z-10 duration-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    height="1.6rem"
                    width="2rem"
                  >
                    <path
                      d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                      fill="#FFFFFF"
                    />
                    <path
                      d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                      fill="#FFFFFF"
                    />
                  </svg>
                </div>
                <p className="translate-x-2 absolute right-6 top-3.5">
                  خروج از حساب کاربری
                </p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;
