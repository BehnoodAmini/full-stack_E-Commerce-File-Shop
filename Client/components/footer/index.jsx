"use client";

import Image from "next/image";
import Link from "next/link";

import { HiOutlineArrowUp } from "react-icons/hi";
import { TfiAngleLeft } from "react-icons/tfi";

const Footer = () => {
  const goTopCtrl = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="container mx-auto flex flex-col gap-8 py-6 mt-8">
      <div className="flex justify-between items-center p-8 bg-zinc-100 rounded-xl flex-col md:flex-row gap-8 md:gap-2">
        <div className="w-72 max-w-72 flex flex-col gap-4">
          <div className="flex justify-center">
            <Image
              src={"/logo.jpg"}
              className="rounded-lg"
              width={100}
              height={100}
              alt="shop logo"
            />
          </div>
          <p className="text-center text-base sm:text-sm">متن ساختگی</p>
        </div>
        <div className="flex justify-around items-start gap-8 sm:gap-16">
          <div className="flex flex-col gap-4">
            <div className="text-xl">دسترسی سریع</div>
            <ul className="flex flex-col gap-3 text-base sm:text-sm">
              <li>
                <Link
                  href={"/about"}
                  className="w-32 flex gap-1 items-center transition-all duration-300 hover:gap-2 hover:text-orange-500!"
                >
                  <TfiAngleLeft />
                  <span>درباره ما</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/contact"}
                  className="w-32 flex gap-1 items-center transition-all duration-300 hover:gap-2 hover:text-orange-500!"
                >
                  <TfiAngleLeft />
                  <span>تماس با ما</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/help"}
                  className="w-32 flex gap-1 items-center transition-all duration-300 hover:gap-2 hover:text-orange-500!"
                >
                  <TfiAngleLeft />
                  <span>حریم خصوصی</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/blog"}
                  className="w-32 flex gap-1 items-center transition-all duration-300 hover:gap-2 hover:text-orange-500!"
                >
                  <TfiAngleLeft />
                  <span>وبلاگ</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-xl">راهنمای خرید</div>
            <ul className="flex flex-col gap-3 text-base sm:text-sm">
              <li>
                <Link
                  href={"/help"}
                  className="w-32 flex gap-1 items-center transition-all duration-300 hover:gap-2 hover:text-orange-500!"
                >
                  <TfiAngleLeft />
                  <span>سوالات متداول</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/help"}
                  className="w-32 flex gap-1 items-center transition-all duration-300  hover:gap-2 hover:text-orange-500!"
                >
                  <TfiAngleLeft />
                  <span>چگونه خرید کنم؟</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/help"}
                  className="w-32 flex gap-1 items-center transition-all duration-300 hover:gap-2 hover:text-orange-500!"
                >
                  <TfiAngleLeft />
                  <span>قوانین سایت</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex justify-center gap-4 items-center">
            <Image
              src={"/images/Licenses/1.png"}
              className="rounded-lg"
              width={100}
              height={100}
              alt="enamad logo"
            />
            <Image
              src={"/images/Licenses/2.png"}
              className="rounded-lg"
              width={100}
              height={100}
              alt="enamad logo"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p>تمامی حقوق مادی و معنوی این وبسایت متعلق به ***** می‌باشد.</p>
        <HiOutlineArrowUp
          onClick={() => goTopCtrl()}
          className="z-40 fixed bottom-4 left-4 cursor-pointer w-12 h-12 p-2 rounded-lg bg-[#0093b8cb] text-white transition-all duration-300 hover:bg-indigo-500 hover:text-white border-2 border-white"
        />
      </div>
    </footer>
  );
};

export default Footer;
