"use client";

import Image from "next/image";

const Box = ({ data, setCategoryDetCtrl, setRandNumForBannerClick }) => {
  return ( 
    <div
      onClick={() => {
        setCategoryDetCtrl(data._id);
        setRandNumForBannerClick(Math.random());
      }}
      className="md:relative flex max-md:gap-5 flex-wrap justify-center md:justify-start gap-8 items-center max-[350px]:items-start cursor-pointer w-full max-[350px]:h-60 p-6 rounded-lg bg-zinc-100 border-2 border-zinc-200 transition-all duration-300 hover:border-orange-500"
    >
      <div className="flex justify-start items-center max-[350px]:w-full max-[350px]:justify-center">
        <Image
          className="rounded-lg"
          src={data.image}
          alt={data.imageAlt}
          title={data.imageAlt}
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col gap-4 h-10 max-[350px]:justify-center">
        <div>{data.title}</div>
        <div className="text-xs md:absolute bottom-3 left-3  text-white flex justify-center md:justify-end items-center gap-2">
          <div className="bg-blue-600 px-3 py-1 rounded">
            {data.typeOfProduct == "book" ? (
              <span>کتاب</span>
            ) : data.typeOfProduct == "app" ? (
              <span>اپلیکیشن</span>
            ) : (
              <span>فایل گرافیکی</span>
            )}
          </div>
          <div>
            {data.situation == true ? (
              <div className="bg-emerald-600 px-3 py-1 rounded">منتشر شده</div>
            ) : (
              <div className="bg-orange-500 px-3 py-1 rounded">پیش‌نویس</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;
