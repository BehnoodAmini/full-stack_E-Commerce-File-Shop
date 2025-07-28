"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import { FiRefreshCw } from "react-icons/fi";

import Like from "../likeComp";

import { useAppContext } from "@/context/appContext";

const CartPageComp = ({ cookie }) => {
  const spliterForFeatures = (value) => {
    return value.split(":");
  };

  // PRICE BEAUTIFUL
  function priceChanger(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [data, setData] = useState([-1]);
  const [needRefresh, setNeedRefresh] = useState(0);
  const [priceSum, setPriceSum] = useState(0);

  // CONTEXT OF CART NUMBER
  const { cartNumber, setCartNumber } = useAppContext();

  const [cartProductsIds, setCartProductsIds] = useState([-1]);
  const router = useRouter();

  useEffect(() => {
    if (cookie && cookie.length > 0) {
      axios
        .get(
          "https://behnood-fileshop-server.liara.run/api/get-part-of-user-data/cart",
          { headers: { auth_cookie: cookie } }
        )
        .then((d) => {
          setData(d.data);
          setNeedRefresh(0);
          if (d.data.length < 1) {
            setPriceSum(0);
          } else {
            let i = 0;
            for (let j = 0; j < d.data.length; j++) {
              i = i + Number(d.data[j].price);
            }
            setPriceSum(i);
          }

          // JUST PRODUCT IDS
          const ids = d.data.map((da) => da._id);
          setCartProductsIds(ids);
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
    }
  }, [cookie, needRefresh]);

  const productRemoveHandler = (input) => {
    const formData = {
      method: "remove",
      goalCartProductId: input,
    };
    axios
      .post(
        "https://behnood-fileshop-server.liara.run/api/cart-managment",
        formData,
        { headers: { auth_cookie: cookie } }
      )
      .then((d) => {
        const message =
          d.data && d.data.msg ? d.data.msg : "محصول از سبد خرید حذف شد!";
        toast.success(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setNeedRefresh(1);
        setCartNumber(cartNumber - 1);
      })
      .catch((e) => {
        toast.error("خطا در حذف محصول", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const favAdder = (input) => {
    const productData = {
      method: "push",
      newFavProduct: input,
    };

    const backendUrl = `https://behnood-fileshop-server.liara.run/api/favourite-products`;
    axios
      .post(backendUrl, productData, { headers: { auth_cookie: cookie } })
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

  const paymentHandler = () => {
    const formData = {
      amount: Number(priceSum),
      products: cartProductsIds,
    };
    axios
      .post(
        "https://behnood-fileshop-server.liara.run/api/new-payment",
        formData,
        { headers: { auth_cookie: cookie } }
      )
      .then((d) => {
        const resnumber = d.data.resnumber;
        const message =
          d.data && d.data.msg ? d.data.msg : "در حال انتقال به درگاه پرداخت.";
        toast.success(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push(`/payment-gateway?Authority=${resnumber}`);
      })
      .catch((e) => {
        console.log(e);
        const message =
          e.response && e.response.data && e.response.data.msg
            ? e.response.data.msg
            : "خطا در انتقال به درگاه پرداخت!";
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
    <div className="flex flex-col gap-8 p-2">
      <div className=" flex justify-between items-start max-md:p-4 max-md:mt-10">
        <h1 className="text-indigo-600 text-2xl border-r-indigo-500 border-r-2 pr-1">
          سبد خرید
        </h1>
        <div
          onClick={() => {
            setNeedRefresh(1);
            setData([-1]);
          }}
          className="cursor-pointer text-white bg-indigo-500 rounded-md flex text-sm justify-center items-center gap-1 w-28 h-10"
        >
          <FiRefreshCw /> به روز رسانی
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
            <div className="flex justify-between items-center md:items-start gap-2 flex-col md:flex-row">
              <div className="w-full rounded-md bg-zinc-100 p-4 shadow-[0px_0px_5px_rgba(0,0,0,.15)]">
                {data.length < 1 ? (
                  <div className="flex justify-center items-center p-8 w-full">
                    محصولی موجود نیست...
                  </div>
                ) : (
                  <div className="w-full flex flex-col gap-8">
                    {data.map((da, i) => (
                      <div
                        key={i}
                        className="w-full flex flex-col gap-4 bg-zinc-200 text-sm rounded-md p-4 relative max-lg:items-center"
                      >
                        <div className="flex xl:justify-between justify-center items-start gap-4 max-lg:flex-wrap">
                          <div className="flex justify-center items-center">
                            <Image
                              width={260}
                              height={150}
                              className="rounded-md"
                              src={da.image}
                              alt={da.title}
                              title={da.title}
                            />
                          </div>
                          <div className="relative w-full flex flex-col gap-4">
                            <div className="max-xl:flex max-lg:gap-10 max-lg:flex-wrap max-xl:justify-center">
                              <div className="hidden lg:flex lg:absolute top-0 left-35 bg-indigo-400 text-white! rounded-md text-xs justify-center items-center w-20 h-6">
                                {da.typeOfProduct == "book" ? (
                                  <span>کتاب</span>
                                ) : da.typeOfProduct == "app" ? (
                                  <span>اپلیکیشن</span>
                                ) : (
                                  <span>فایل گرافیکی</span>
                                )}
                              </div>
                              <Link
                                href={`/shop/${da.slug}`}
                                className="lg:absolute top-0 left-12 flex justify-center items-center text-xs bg-blue-500 text-white! transition-all duration-300 hover:bg-blue-600 rounded-md w-20 h-6"
                                target="_blank"
                              >
                                لینک محصول
                              </Link>
                              <div
                                onClick={() => favAdder(da._id)}
                                className="lg:absolute top-0 left-0 text-xs flex justify-center items-center w-10 h-6 cursor-pointer"
                              >
                                <Like />
                              </div>
                            </div>
                            <h3 className="text-base">{da.title}</h3>
                            <p>{da.shortDesc}</p>
                            <div className="flex justify-start items-center gap-4">
                              <div>{da.buyNumber} فروش</div>
                              <div>{priceChanger(da.price)} تومان</div>
                            </div>
                            <div className="w-[95%] h-0.5 bg-zinc-400 rounded-md"></div>
                            <div className="flex flex-col gap-2">
                              {da.features.length < 1 ? (
                                <div></div>
                              ) : (
                                da.features.map((fe, i) => (
                                  <div
                                    key={i}
                                    className="flex justify-center items-center gap-6"
                                  >
                                    <div className="flex justify-start items-center gap-1">
                                      {spliterForFeatures(fe)[0]}
                                    </div>
                                    <div>{spliterForFeatures(fe)[1]}</div>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="w-20 h-6 lg:absolute lg:bottom-5 lg:left-5">
                          <button
                            onClick={() => productRemoveHandler(da._id)}
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
                    ))}
                  </div>
                )}
              </div>
              <div className="w-80 min-w-80 max-md:w-full rounded-md bg-zinc-100 p-4 flex flex-col gap-6 shadow-[0px_0px_5px_rgba(0,0,0,.15)] max-md:mt-10">
                <div className="flex justify-between items-center">
                  <div>مجموع قیمت</div>
                  <div>{priceChanger(priceSum)} تومان</div>
                </div>
                <button
                  onClick={paymentHandler}
                  className="cursor-pointer max-md:bg-zinc-100! bg-white text-center rounded-2xl h-10 relative group max-lg:flex max-md:justify-center max-lg:items-center max-lg:gap-20"
                  type="button"
                >
                  <div className="hidden bg-green-400 rounded-xl h-10 w-1/4 md:flex items-center justify-center lg:absolute left-1 top-0 group-hover:w-full z-10 duration-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1024 1024"
                      height="21px"
                      width="21px"
                    >
                      <path
                        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                        fill="#000000"
                      />
                      <path
                        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                        fill="#000000"
                      />
                    </svg>
                  </div>
                  <p className="md:translate-x-2 max-md:flex max-md:items-center max-md:justify-center max-md:bg-emerald-600 max-md:text-white max-md:w-full max-md:rounded-xl max-md:h-10">
                    پرداخت
                  </p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPageComp;
