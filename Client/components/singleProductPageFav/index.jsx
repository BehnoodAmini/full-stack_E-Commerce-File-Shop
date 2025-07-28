"use client";

import axios from "axios";
import Cookies from "js-cookie";

import { toast } from "react-toastify";

const SingleProductPageFav = ({ data }) => {
  const auth_cookie = Cookies.get("auth_cookie");
  const FavAdder = () => {
    const productData = {
      method: "push",
      newFavProduct: data
    };

    const backendUrl = `https://behnood-fileshop-server.liara.run/api/favourite-products`;
    axios
      .post(backendUrl, productData, { headers: { auth_cookie: auth_cookie } })
      .then((d) => {
        const message = d.data.msg
          ? d.data.msg
          : "به محصولات مورد علاقه افزوده شد.";
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

  return (
    <div>
      <button
        onClick={() => FavAdder()}
        className="cursor-pointer flex justify-center items-center text-center rounded-lg p-2 w-full bg-blue-500 transition-all duration-300 hover:bg-blue-600 text-white"
      >
        افزودن به علاقه مندی‌ها
      </button>
    </div>
  );
};

export default SingleProductPageFav;
