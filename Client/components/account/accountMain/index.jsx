"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";

import { useAppContext } from "@/context/appContext";

import { BiMenu } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

import Info from "../info";
import Favourite from "../favourite";
import Purchased from "../purchased";
import Comments from "../comments";
import Payments from "../payments";

const AccountMainComp = ({ items }) => {
  const goTopCtrl = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const router = useRouter();
  const [authCookie, setAuthCookie] = useState(Cookies.get("auth_cookie"));
  const [authCookie2, setAuthCookie2] = useState(Cookies.get("auth_cookie"));

  useEffect(() => {
    if (authCookie !== authCookie2) {
      Cookies.remove("auth_cookie");
      router.push("/login");
    } else if (!authCookie || authCookie == "") {
      router.push("/login");
    } else {
      axios
        .get("https://behnood-fileshop-server.liara.run/api/get-user-data", {
          headers: { auth_cookie: authCookie },
        })
        .then((d) => {
          if (!d.data._id) {
            router.push("./login");
          }
        })
        .catch((e) => {
          router.push("./login");
        });
    }
  }, [authCookie]);

  useEffect(() => {
    setAuthCookie2(Cookies.get("auth_cookie"));
  }, [Cookies.get("auth_cookie")]);

  // ROUTING
  const [details, setDetails] = useState(<Info />);

  useEffect(() => {
    if (items.slug[0] == "info") {
      setDetails(<Info cookie={authCookie} />);
    } else if (items.slug[0] == "favourites") {
      setDetails(<Favourite cookie={authCookie} />);
    } else if (items.slug[0] == "purchased") {
      setDetails(<Purchased cookie={authCookie} />);
    } else if (items.slug[0] == "comments") {
      setDetails(<Comments cookie={authCookie} />);
    } else if (items.slug[0] == "payments") {
      setDetails(<Payments cookie={authCookie} />);
    } else {
      setDetails(<Info cookie={authCookie} />);
    }
  }, [items.slug[0]]);

  // FOR RESPONSIVE
  const [menuIsOpen, setMenuIsOpen] = useState(-1);

  useEffect(() => {
    if (menuIsOpen == -1) {
      document.body.style.overflow = "auto";
    } else if (menuIsOpen == 1) {
      document.body.style.overflow = "hidden";
    }
  }, [menuIsOpen]);

  // WHEN USER LOGIN, HIS CART'S NUMBER SHOULD BE SET AGAIN
  const { setCartNumber } = useAppContext();
  useEffect(() => {
    const url = "https://behnood-fileshop-server.liara.run/api/cart-number";
    axios
      .get(url, { headers: { auth_cookie: authCookie } })
      .then((d) => setCartNumber(d.data.number))
      .catch((e) => {
        setCartNumber(0);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center md:justify-between items-start gap-2">
        <div
          className={
            menuIsOpen == -1
              ? "z-50 w-full min-w-full md:min-w-56 md:w-56 flex bg-[#000000cc] md:bg-zinc-100 md:shadow-[1px_0px_5px_rgba(0,0,0,.3)] p-6 md:rounded-lg md:h-100 rounded-none fixed md:sticky md:top-1.5 md:bottom-8 py-4 md:py-0 h-[100vh] bottom-0 top-0 left-[100%] -right-[100%] md:left-0 md:right-0 transition-all duration-500"
              : "z-50 w-full min-w-full md:min-w-56 md:w-56 flex bg-[#000000cc] md:bg-zinc-100 backdrop-blur-md md:shadow-[1px_0px_5px_rgba(0,0,0,.3)] p-6 md:rounded-lg md:h-100 rounded-none py-4 md:py-0 h-[100vh] fixed bottom-0 top-0 left-0 right-0 md:static transition-all duration-500"
          }
        >
          <nav className="flex justify-center items-center w-full">
            <ul className="flex flex-col gap-6 w-full">
              <li>
                <Link
                  onClick={() => {
                    goTopCtrl();
                    setMenuIsOpen(-1);
                  }}
                  className={
                    items.slug[0] == "info"
                      ? "rounded-md bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 text-white! hover:text-white! flex justify-center items-center w-full h-12"
                      : "rounded-md bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white! hover:text-white! flex justify-center items-center w-full h-12"
                  }
                  href={"/account/info"}
                >
                  اطلاعات
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    goTopCtrl();
                    setMenuIsOpen(-1);
                  }}
                  className={
                    items.slug[0] == "favourites"
                      ? "rounded-md bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 text-white! hover:text-white! flex justify-center items-center w-full h-12"
                      : "rounded-md bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white! hover:text-white! flex justify-center items-center w-full h-12"
                  }
                  href={"/account/favourites"}
                >
                  محصولات مورد علاقه
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    goTopCtrl();
                    setMenuIsOpen(-1);
                  }}
                  className={
                    items.slug[0] == "purchased"
                      ? "rounded-md bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 text-white! hover:text-white! flex justify-center items-center w-full h-12"
                      : "rounded-md bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white! hover:text-white! flex justify-center items-center w-full h-12"
                  }
                  href={"/account/purchased"}
                >
                  محصولات
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    goTopCtrl();
                    setMenuIsOpen(-1);
                  }}
                  className={
                    items.slug[0] == "comments"
                      ? "rounded-md bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 text-white! hover:text-white! flex justify-center items-center w-full h-12"
                      : "rounded-md bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white! hover:text-white! flex justify-center items-center w-full h-12"
                  }
                  href={"/account/comments"}
                >
                  دیدگاه‌ها
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    goTopCtrl();
                    setMenuIsOpen(-1);
                  }}
                  className={
                    items.slug[0] == "payments"
                      ? "rounded-md bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 text-white! hover:text-white! flex justify-center items-center w-full h-12"
                      : "rounded-md bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white! hover:text-white! flex justify-center items-center w-full h-12"
                  }
                  href={"/account/payments"}
                >
                  سفارش‌ها
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-2 md:p-4 bg-zinc-100 rounded-md w-full mt-12 md:mt-0">
          {details}
        </div>
      </div>
      <div className="z-50 flex md:hidden fixed top-2 right-5 bg-[#b80036cb] rounded-full p-1">
        <BiMenu
          onClick={() => {
            setMenuIsOpen(menuIsOpen * -1);
          }}
          className={
            menuIsOpen == -1 ? "w-10 h-10 flex text-white" : "w-10 h-10 hidden"
          }
        />
        <IoMdClose
          onClick={() => {
            setMenuIsOpen(menuIsOpen * -1);
          }}
          className={
            menuIsOpen == 1 ? "w-10 h-10 text-white flex" : "w-10 h-10 hidden"
          }
        />
      </div>
    </div>
  );
};

export default AccountMainComp;
