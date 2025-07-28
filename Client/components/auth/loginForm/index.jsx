"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import { useAppContext } from "@/context/appContext";

import { toast } from "react-toastify";

import Cookies from "js-cookie";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({});
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // ROUTER AFTER LOGIN
  const [routerState, setRouterState] = useState(0);
  useEffect(() => {
    if (routerState == 1) {
      router.push("./account/info");
      setRouterState(0);
    }
  }, [routerState]);

  // IF USER HAVE TOKEN SHOULD BE REDIRECTED TO ACCOUNT PAGE
  const [authCookie, setAuthCookie] = useState(Cookies.get("auth_cookie"));

  useEffect(() => {
    setAuthCookie(Cookies.get("auth_cookie"));
  }, [Cookies.get("auth_cookie")]);

  const formSubmitHandler = () => {
    setIsLoading(true);
    const formData = {
      email: watch("email"),
      password: watch("password"),
    };
    const backendUrl =
      "https://behnood-fileshop-server.liara.run/api/login-user";
    axios
      .post(backendUrl, formData)
      .then((d) => {
        Cookies.set("auth_cookie", d.data.auth, { expires: 30 });
        const message = d.data.msg
          ? d.data.msg
          : "با موفقیت وارد حساب کاربری شدید!";
        toast.success(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setRouterState(1);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // WHEN USER LOGOUT, HIS CART'S NUMBER SHOULD BE ZERO
  const { setCartNumber } = useAppContext();
  useEffect(() => {
    setCartNumber(0);
  }, []);

  return (
    <section className="container mx-auto flex justify-center items-center">
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="flex flex-col gap-8 mt-15 md:m-12 w-[30rem] bg-gray-100 p-10 md:p-12 rounded-md  max-md:w-[100%]"
      >
        <div className="flex flex-col justify-center items-center gap-3">
          <h1 className="text-xl text-center text-indigo-500">ورود به حساب</h1>
          <Link
            href={"/register"}
            className="bg-indigo-600 text-white! px-2 py-1 rounded-md  transition-all duration-500 hover:bg-indigo-800"
          >
            ثبت نام در سایت
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder="ایمیل"
            autoComplete="off"
            className="p-2 rounded-md w-full outline-none border-zinc-400 border-2 focus:border-orange-300 shadow-[0px_0px_5px_rgba(0,0,0,.15)] transition-all duration-500 focus:shadow-orange-400"
            {...register("email", {
              required: true,
              minLength: 11,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && errors.email.type == "required" && (
            <div className="text-rose-500 text-sm">ایمیل وارد نشده است!</div>
          )}
          {errors.email && errors.email.type == "pattern" && (
            <div className="text-rose-500 text-sm">فرمت ایمیل صحیح نیست!</div>
          )}
          {errors.email && errors.email.type == "minLength" && (
            <div className="text-rose-500 text-sm">
              ایمیل باید بیشتر از 11 کارکتر باشد!
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder="رمز عبور"
            autoComplete="off"
            className="p-2 rounded-md w-full outline-none border-zinc-400 border-2 focus:border-orange-300 shadow-[0px_0px_5px_rgba(0,0,0,.15)] transition-all duration-500 focus:shadow-orange-400"
            {...register("password", {
              required: true,
              maxLength: 20,
              minLength: 6,
            })}
          />
          {errors.password && errors.password.type == "required" && (
            <div className="text-rose-500 text-sm">رمز عبور وارد نشده است!</div>
          )}
          {errors.password && errors.password.type == "maxLength" && (
            <div className="text-rose-500 text-sm">
              رمز عبور باید کمتر از 20 کارکتر باشد!
            </div>
          )}
          {errors.password && errors.password.type == "minLength" && (
            <div className="text-rose-500 text-sm">
              رمز عبور باید بیشتر از 6 کارکتر باشد!
            </div>
          )}
        </div>
        <button
          type="submit"
          className="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group"
          disabled={isLoading}
        >
          <div className="relative overflow-hidden flex justify-center items-center">
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                ></path>
              </svg>
            ) : (
              <>
                <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                  ورود به حساب کاربری
                </p>
                <p className="hidden md:flex absolute top-7 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                  بزن بریم!
                </p>
              </>
            )}
          </div>
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
