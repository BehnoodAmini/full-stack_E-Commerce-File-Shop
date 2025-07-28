"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import { FiRefreshCw } from "react-icons/fi";

import SlideBox from "@/components/sliders/product-slider-box";

const AccountPayments = ({ cookie }) => {
  // PRICE BEAUTIFUL
  function priceChanger(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const router = useRouter();

  const [data, setData] = useState([-1]);
  const [needRefresh, setNeedRefresh] = useState(0);
  useEffect(() => {
    if (cookie && cookie.length > 0) {
      axios
        .get(
          "https://behnood-fileshop-server.liara.run/api/get-part-of-user-data/payments",
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
        <title> سفارش‌های من </title>
        <meta name="description" content=" سفارش‌های من " />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="/account/payments" />
      </>
      <h3 className="text-xl absolute top-1 right-1">سفارش‌های من</h3>
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
          {data.length} سفارش
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
                سفارشی ثبت نشده است...
              </div>
            ) : (
              <div className="w-full flex flex-col gap-8">
                {data.map((da, i) => (
                  <div
                    key={i}
                    className="w-full flex flex-col gap-4 bg-zinc-200 text-sm rounded-xl p-1 md:p-4 relative shadow-sm hover:shadow-md transition-shadow duration-300 max-lg:items-center"
                  >
                    <div className="flex justify-between items-start gap-4 xl:w-250 mx-2.5 flex-wrap  max-md:mt-5">
                      <div className="flex justify-center items-center w-30 h-8 rounded-lg bg-sky-600 text-white!">
                        {priceChanger(da.amount)} تومان
                      </div>
                      <div className="flex justify-center items-center w-40 h-8 rounded-lg bg-sky-600 text-white!">
                        تاریخ: {da.createdAt}
                      </div>
                      {da.payed == true ? (
                        <div className="flex justify-center items-center w-30 h-8 rounded-lg text-sm text-white! bg-emerald-600">
                          پرداخت شده
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            router.push(
                              `/payment-gateway?Authority=${da.resnumber}`
                            );
                          }}
                          className="cursor-pointer flex justify-center items-center w-30 h-8 rounded-lg text-sm text-white! bg-rose-600"
                        >
                          در انتظار پرداخت
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center lg:justify-start items-center lg:gap-13.5 flex-wrap">
                      {da.products.map((da, i) => (
                        <SlideBox itemData={da} key={i} />
                      ))}
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

export default AccountPayments;
