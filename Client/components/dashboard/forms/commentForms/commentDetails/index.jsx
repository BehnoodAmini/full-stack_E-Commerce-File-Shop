"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

import { toast } from "react-toastify";

const CommentDetails = ({ goalId }) => {
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

  const viewedRef = useRef();
  const publishedRef = useRef();
  const emailRef = useRef();
  const displaynameRef = useRef();
  const messageRef = useRef();

  const [fullData, setFullData] = useState([-1]); // LOADING DEFAULT VALUES
  const [needRefresh, setNeedRefresh] = useState(1);

  const [authCookie, setAuthCookie] = useState(Cookies.get("auth_cookie"));

  useEffect(() => {
    goTopCtrl();
    axios
      .get(
        `https://behnood-fileshop-server.liara.run/api/get-comment/${goalId}`,
        {
          headers: { auth_cookie: authCookie },
        }
      )
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
  }, [goalId, needRefresh]);

  const UpdateHandler = (e) => {
    e.preventDefault();
    const formData = {
      viewed: viewedRef.current.value,
      published: publishedRef.current.value,
      email: emailRef.current.value,
      displayname: displaynameRef.current.value,
      message: messageRef.current.value,
    };
    const url = `https://behnood-fileshop-server.liara.run/api/update-comment/${goalId}`;
    axios
      .post(url, formData, {
        headers: { auth_cookie: authCookie },
      })
      .then((d) => {
        toast.success("دیدگاه با موفقیت به‌روزرسانی شد.", {
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
    const url = `https://behnood-fileshop-server.liara.run/api/delete-comment/${goalId}`;
    axios
      .post(
        url,
        { item: 1 },
        {
          headers: { auth_cookie: authCookie },
        }
      )
      .then((d) => {
        toast.success("دیدگاه با موفقیت حذف شد.", {
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

  const PublishHandler = () => {
    const sendingData = {
      goalId: fullData._id,
      parentId: fullData.parentId,
      email: fullData.email,
    };
    const url = `https://behnood-fileshop-server.liara.run/api/publish-comment`;
    axios
      .post(url, sendingData, {
        headers: { auth_cookie: authCookie },
      })
      .then((d) => {
        toast.success("انتشار دیدگاه با موفقیت انجام شد.", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFullData([-1]);
        setNeedRefresh(needRefresh * -1);
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
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h2 className="text-orange-500">جزئیات دیدگاه</h2>
            <div className="flex justify-center md:justify-end items-center gap-4 flex-wrap">
              <button
                onClick={() => PublishHandler()}
                className="cursor-pointer md:h-8 inline-flex items-center px-4 py-2 bg-sky-600 transition ease-in-out delay-75 hover:bg-sky-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
              >
                انتشار + ارسال ایمیل در صورت پاسخ بودن
              </button>
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
            <Link
              target="_blank"
              href={
                fullData.typeOfModel == "post"
                  ? `/blog/${fullData.src.slug}`
                  : `/shop/${fullData.src.slug}`
              }
              className="bg-blue-600 text-white! rounded px-3 py-1 text-sm"
            >
              {fullData.typeOfModel == "post"
                ? `لینک مقاله: ${fullData.src.title}`
                : `لینک محصول: ${fullData.src.title}`}
            </Link>
            <div className="bg-zinc-100 rounded px-3 py-1 text-sm">
              شناسه دیدگاه: {fullData._id ? fullData._id : ""}
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
              <div>منتشر شود؟</div>
              <select
                ref={publishedRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              >
                {fullData.published && fullData.published == true ? (
                  <>
                    <option value={true}>بله</option>
                    <option value={false}>خیر</option>
                  </>
                ) : (
                  <>
                    <option value={false}>خیر</option>
                    <option value={true}>بله</option>
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
              <div>نام نمایشی(displayname)</div>
              <input
                defaultValue={fullData.displayname ? fullData.displayname : ""}
                required={true}
                type="text"
                ref={displaynameRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            {fullData.parentId == "null" ? (
              <div></div>
            ) : (
              <div className="flex flex-col gap-2">
                <div>دیدگاه اصلی</div>
                <div className=" border-2 border-zinc-300 bg-zinc-50 p-1 rounded-md flex flex-col gap-2">
                  <div className="flex justify-center md:justify-between items-center gap-3 flex-wrap">
                    <div className="px-2 py-1 rounded-lg bg-zinc-200">
                      {fullData.displayname}
                    </div>
                    <div className="px-2 py-1 rounded-lg bg-zinc-200">
                      {fullData.email}
                    </div>
                    <div className="px-2 py-1 rounded-lg bg-indigo-500 text-white!">
                      {fullData.createdAt}
                    </div>
                  </div>
                  <p className="text-black leading-7 text-justify p-2">
                    {fullData.message}
                  </p>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <div>متن دیدگاه</div>
              <textarea
                defaultValue={fullData.message ? fullData.message : ""}
                required={true}
                rows="6"
                ref={messageRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
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

export default CommentDetails;
