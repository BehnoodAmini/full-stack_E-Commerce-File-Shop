"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import { toast } from "react-toastify";

import { FiRefreshCw } from "react-icons/fi";

const Purchased = ({ cookie }) => {
  const [data, setData] = useState([-1]);
  const [needRefresh, setNeedRefresh] = useState(0);
  useEffect(() => {
    if (cookie && cookie.length > 0) {
      axios
        .get(
          "https://behnood-fileshop-server.liara.run/api/get-part-of-user-data/purchased",
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
        <title> فایل‌های من </title>
        <meta name="description" content=" فایل‌های من " />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="/account/purchased" />
      </>
      <h3 className="text-xl absolute top-1 right-1">فایل‌های خریداری شده من</h3>
      <div className="flex items-center justify-end">
        <div
          onClick={() => {
            setNeedRefresh(1);
            setData([-1]);
          }}
          className="absolute top-12 lg:top-1 left-1 cursor-pointer text-white bg-indigo-500 rounded-md flex text-sm justify-center items-center gap-1 w-28 h-10"
        >
          <FiRefreshCw /> به روز رسانی
        </div>
        <div className="absolute top-12 lg:top-1 left-35 text-white bg-indigo-500 rounded-md flex text-sm justify-center items-center gap-1 w-25 h-10">
          {data.length} محصول
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
                محصولی خریداری نشده است...
              </div>
            ) : (
              <div className="w-full flex flex-col gap-8">
                {data.map((da, i) => (
                  <div
                    key={i}
                    className="w-full flex flex-col lg:flex-row gap-4 bg-white border border-zinc-200 shadow-sm rounded-xl p-4 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex justify-center items-center">
                      <Image
                        width={260}
                        height={150}
                        className="rounded-lg object-cover"
                        src={da.image}
                        alt={da.imageAlt}
                        title={da.title}
                      />
                    </div>
                    <div className="relative w-full flex flex-col gap-4 justify-between max-lg:items-center">
                      <Link
                        href={`/shop/${da.slug}`}
                        className="absolute top-2 lg:left-2 flex justify-center items-center text-xs bg-blue-500 text-white! transition-all duration-300 hover:bg-blue-600 rounded-md px-3 py-1 shadow"
                        target="_blank"
                      >
                        لینک محصول
                      </Link>
                      <h3 className="text-base md:font-semibold text-gray-800 mt-12 lg:mt-0">
                        {da.title}
                      </h3>
                      <Link
                        href={da.mainFile}
                        className="flex justify-center items-center text-sm font-medium py-2.5 px-2 bg-violet-500 text-white! transition-transform duration-300 hover:scale-102 hover:bg-violet-600 rounded-md shadow-sm"
                        target="_blank"
                      >
                        دانلود فایل محصول
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          height="20px"
                          width="20px"
                        >
                          <g strokeWidth={0} id="SVGRepo_bgCarrier" />
                          <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            id="SVGRepo_tracerCarrier"
                          />
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <g id="Interface / Download">
                              {" "}
                              <path
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth={2}
                                stroke="#f1f1f1"
                                d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                                id="Vector"
                              />{" "}
                            </g>{" "}
                          </g>
                        </svg>
                      </Link>
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

export default Purchased;
