"use client";

import { useRef, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Cookies from "js-cookie";

import { toast } from "react-toastify";

const CategoryDetails = ({ categoryId }) => {
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

  const titleRef = useRef();
  const slugRef = useRef();
  const imageUrlRef = useRef();
  const imageAltRef = useRef();
  const shortDescRef = useRef();
  const typeOfProductRef = useRef();
  const categorySituationRef = useRef();

  const UpdateHandler = (e) => {
    e.preventDefault();
    const formData = {
      title: titleRef.current.value,
      slug: slugRef.current.value,
      image: imageUrlRef.current.value,
      imageAlt: imageAltRef.current.value,
      shortDesc: shortDescRef.current.value,
      typeOfProduct: typeOfProductRef.current.value,
      situation: categorySituationRef.current.value,
      date: new Date().toLocaleDateString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const url = `https://behnood-fileshop-server.liara.run/api/update-category/${categoryId}`;
    axios
      .post(url, formData, {
        headers: { auth_cookie: authCookie },
      })
      .then((d) => {
        formData.situation == "true"
          ? toast.success("دسته محصول با موفقیت منتشر شد.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          : toast.success("دسته محصول به‌روزرسانی شد.", {
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

  const [fullData, setFullData] = useState([-1]);
  useEffect(() => {
    goTopCtrl();
    axios
      .get(
        `https://behnood-fileshop-server.liara.run/api/get-category/${categoryId}`,
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
  }, [categoryId]);

  const RemoveHandler = () => {
    const url = `https://behnood-fileshop-server.liara.run/api/delete-category/${categoryId}`;
    axios
      .post(
        url,
        { item: 1 },
        {
          headers: { auth_cookie: authCookie },
        }
      )
      .then((d) => {
        toast.success("دسته محصول با موفقیت حذف شد.", {
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
            <h2 className="text-orange-500">جزئیات دسته محصول</h2>
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
          <div className="flex justify-between items-center flex-wrap max-md:gap-5">
            <div className="bg-zinc-100 rounded px-3 py-1 text-sm">
              شناسه دسته بندی: {fullData._id ? fullData._id : ""}
            </div>
            <div className="bg-zinc-100 rounded px-3 py-1 text-sm">
              {fullData.date ? fullData.date : ""}
            </div>
          </div>
          <form
            onSubmit={UpdateHandler}
            onKeyDown={FormKeyNotSuber}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <div>عنوان جدید دسته</div>
              <input
                required={true}
                defaultValue={fullData.title}
                type="text"
                ref={titleRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>اسلاگ جدید دسته</div>
              <input
                required={true}
                defaultValue={fullData.slug}
                type="text"
                ref={slugRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>آدرس جدید عکس</div>
              <input
                required={true}
                defaultValue={fullData.image}
                type="text"
                ref={imageUrlRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>alt جدید عکس</div>
              <input
                required={true}
                defaultValue={fullData.imageAlt}
                type="text"
                ref={imageAltRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>توضیحات کوتاه جدید دسته</div>
              <input
                required={true}
                defaultValue={fullData.shortDesc}
                type="text"
                ref={shortDescRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>نوع دسته بندی محصول</div>
              <select
                ref={typeOfProductRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              >
                {fullData.typeOfProduct == "app" ? (
                  <>
                    <option value={"app"}>اپلیکیشن</option>
                    <option value={"gr"}>فایل گرافیکی</option>
                    <option value={"book"}>کتاب</option>
                  </>
                ) : fullData.typeOfProduct == "book" ? (
                  <>
                    <option value={"book"}>کتاب</option>
                    <option value={"app"}>اپلیکیشن</option>
                    <option value={"gr"}>فایل گرافیکی</option>
                  </>
                ) : (
                  <>
                    <option value={"gr"}>فایل گرافیکی</option>
                    <option value={"app"}>اپلیکیشن</option>
                    <option value={"book"}>کتاب</option>
                  </>
                )}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <div>انتشار و پیش‌نویس</div>
              <select
                ref={categorySituationRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              >
                {fullData.situation == true ? (
                  <>
                    <option value={true}>انتشار</option>
                    <option value={false}>پیش‌نویس</option>
                  </>
                ) : (
                  <>
                    <option value={false}>پیش‌نویس</option>
                    <option value={true}>انتشار</option>
                  </>
                )}
              </select>
            </div>
            <button
              type="submit"
              className="cursor-pointer p-2 bg-indigo-600 text-white w-full rounded-md transition-all duration-300 hover:bg-orange-500"
            >
              به‌روزرسانی
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
