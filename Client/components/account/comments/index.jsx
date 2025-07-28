"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import { toast } from "react-toastify";

import { FiRefreshCw } from "react-icons/fi";

const Comments = ({ cookie }) => {
  const [data, setData] = useState([-1]);
  const [needRefresh, setNeedRefresh] = useState(0);
  useEffect(() => {
    if (cookie && cookie.length > 0) {
      axios
        .get(
          "https://behnood-fileshop-server.liara.run/api/get-part-of-user-data/comments",
          { headers: { auth_cookie: cookie } }
        )
        .then((d) => {
          setData(d.data);
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

  return (
    <div className="flex flex-col gap-8 relative pt-20">
      <>
        <meta charSet="utf-8" />
        <title> دیدگاه‌‌های من </title>
        <meta name="description" content=" دیدگاه‌‌های من " />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="/account/comments" />
      </>
      <h3 className="text-xl absolute top-1 right-1">دیدگاه‌‌های من</h3>
      <div className="flex items-center justify-end">
        <div
          onClick={() => {
            setNeedRefresh(1);
            setData([-1]);
          }}
          className="absolute top-12 md:top-1 left-1 cursor-pointer text-white bg-indigo-500 rounded-md flex text-sm justify-center items-center gap-1 w-28 h-10"
        >
          <FiRefreshCw /> به روز رسانی
        </div>
        <div className="absolute top-12 md:top-1 left-35 text-white bg-indigo-500 rounded-md flex text-sm justify-center items-center gap-1 w-25 h-10">
          {data.length} دیدگاه‌
        </div>
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
          <div>
            {data.length < 1 ? (
              <div className="flex justify-center items-center p-8 w-full">
                دیدگاهی موجود نیست...
              </div>
            ) : (
              <div className="w-full flex flex-col gap-12">
                {data.map((da, i) => (
                  <div
                    key={i}
                    className="w-full flex flex-col gap-4 bg-zinc-200 text-sm rounded-md p-4 relative"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="relative w-full flex flex-col gap-8">
                        <div className="flex justify-between items-center flex-wrap gap-4">
                          <Link
                            href={
                              da.typeOfModel == "post"
                                ? `/blog/${da.src.slug}`
                                : `/shop/${da.src.slug}`
                            }
                            className="px-3 py-1 flex justify-center items-center text-sm bg-blue-500 text-white! transition-all duration-300 hover:bg-blue-600 rounded-md"
                            target="_blank"
                          >
                            {da.typeOfModel == "post" ? "مقاله" : "محصول"}:{" "}
                            {da.src.title}
                          </Link>
                          <div className="flex justify-end items-center gap-4">
                            <div className="bg-indigo-400 text-white! rounded-md text-xs flex justify-center items-center w-28 h-6">
                              {da.createdAt}
                            </div>
                            <div className="">
                              {da.published == true ? (
                                <div className="bg-emerald-600 text-white! w-20 h-6 text-xs rounded-md flex justify-center items-center">
                                  منتشر شده
                                </div>
                              ) : (
                                <div className="bg-rose-600 text-white! w-22 h-6 text-xs rounded-md flex justify-center items-center">
                                  در انتظار انتشار
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="leading-9 text-base text-black!">
                          {da.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
