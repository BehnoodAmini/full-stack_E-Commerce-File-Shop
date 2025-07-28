"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

import { toast } from "react-toastify";

import { IoIosSearch } from "react-icons/io";
import { HiOutlineShoppingCart } from "react-icons/hi";

import Like from "@/components/likeComp";

import { useAppContext } from "@/context/appContext";

const SlideBox = ({ itemData, linkComp }) => {
  // PRICE BEAUTIFUL
  function priceChanger(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const auth_cookie = Cookies.get("auth_cookie");
  const FavAdder = () => {
    const productData = {
      method: "push",
      newFavProduct: itemData._id,
    };

    const backendUrl = `https://behnood-fileshop-server.liara.run/api/favourite-products`;
    axios
      .post(backendUrl, productData, { headers: { auth_cookie: auth_cookie } })
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

  // CONTEXT OF CART NUMBER
  const { cartNumber, setCartNumber } = useAppContext();

  const CartAdder = () => {
    const productData = {
      method: "push",
      newCartProduct: itemData._id,
    };

    const backendUrl = `https://behnood-fileshop-server.liara.run/api/cart-managment`;
    axios
      .post(backendUrl, productData, { headers: { auth_cookie: auth_cookie } })
      .then((d) => {
        const message = d.data.msg ? d.data.msg : "به سبد خرید افزوده شد.";
        toast.success(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setCartNumber(cartNumber + 1);
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

  return (
    <article className="sliderItem p-2 hover:-translate-y-2 transition-all duration-300">
      <div className="relative bg-white h-[27rem] w-64 md:w-72 rounded-lg">
        <Link
          href={`/shop/${itemData.slug}`}
          className="flex justify-center items-center p-2"
          target="_blank"
        >
          <Image
            width={260}
            height={150}
            className="rounded-md max-h-62"
            src={itemData.image}
            alt={itemData.imageAlt}
            title={itemData.imageAlt}
          />
        </Link>
        <div>
          <div className="flex flex-col gap-6 p-2">
            <Link href={`/shop/${itemData.slug}`} target="_blank">
              <h3 className=" m-2 line-clamp-2">{itemData.title}</h3>
            </Link>
            <div className="categories flex justify-start items-center flex-wrap gap-1">
              {itemData.categories.length < 1 ? (
                <div></div>
              ) : (
                itemData.categories.map((da, i) =>
                  i < 2 ? (
                    <Link
                      key={i}
                      href={`/shop?&orderBy=date&maxP=1000000000&minP=0&categories=${da.slug}&pgn=12&pn=1`}
                      target="_blank"
                      className="py-1 px-2 text-xs rounded bg-zinc-200 transition-all duration-300 hover:bg-zinc-300"
                    >
                      {da.title}
                    </Link>
                  ) : (
                    <div key={i}></div>
                  )
                )
              )}
            </div>
          </div>
          <div className=" absolute bottom-2  w-full flex justify-between items-center">
            <div className="flex gap-2 justify-start items-center mr-1">
              <div
                onClick={() => FavAdder()}
                className="bg-zinc-200 flex justify-center items-center w-9 h-9 rounded-lg transition-all duration-500 hover:bg-zinc-300 cursor-pointer"
              >
                <Like />
              </div>
              <div className="bg-zinc-200 flex justify-center items-center w-9 h-9 rounded-lg transition-all duration-500 hover:bg-zinc-300 cursor-pointer">
                <Link
                  href={`/shop?&keyword=${itemData.title}&orderBy=date&maxP=1000000000&minP=0&pgn=12&pn=1`}
                  target="_blank"
                >
                  <IoIosSearch className="w-5 h-5 font-bold" />
                </Link>
              </div>
            </div>
            <div className="flex gap-2 justify-end items-center">
              <HiOutlineShoppingCart
                onClick={() => CartAdder()}
                className=" mr-1 w-9 h-9 p-2 rounded bg-zinc-200 text-indigo-600  cursor-pointer transition-all duration-300 hover:bg-orange-500 hover:text-white"
              />
              <div className=" bg-zinc-500 text-white h-9 px-1 flex justify-center items-center rounded-tr-md rounded-br-md">
                {priceChanger(itemData.price)} تومان
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SlideBox;
