"use client";

import axios from "axios";
import Cookies from "js-cookie";

import { toast } from "react-toastify";

import { useAppContext } from "@/context/appContext";

const SingleProductPageCart = ({ data, price }) => {
  const auth_cookie = Cookies.get("auth_cookie");

  // CONTEXT OF CART NUMBER
  const { cartNumber, setCartNumber } = useAppContext();

  const CartAdder = () => {
    const productData = {
      method: "push",
      newCartProduct: data,
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
    <div>
      <button
        onClick={() => CartAdder()}
        className="cursor-pointer flex justify-center items-center text-center rounded-lg p-2 w-full bg-orange-500 transition-all duration-300 hover:bg-orange-600 text-white"
      >
        افزودن به سبد خرید - {price} تومان
      </button>
    </div>
  );
};

export default SingleProductPageCart;
