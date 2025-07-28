"use client";

import Image from "next/image";

const Box = ({ data, setMidBanDetCtrl, setRandNumForBannerClick }) => {
  return (
    <div
      onClick={() => {
        setMidBanDetCtrl(data._id);
        setRandNumForBannerClick(Math.random());
      }}
      className="xl:relative flex max-xl:gap-5 flex-wrap justify-center xl:justify-start gap-8 items-center cursor-pointer w-full max-md:h-90 max-[1280px]:h-100 p-6 rounded-lg bg-zinc-100 border-2 border-zinc-200 transition-all duration-300 hover:border-orange-500"
    >
      <div className="flex justify-start items-center">
        <Image
          className="rounded-lg"
          src={data.image}
          alt={data.imageAlt}
          title={data.imageAlt}
          width={400}
          height={200}
        />
      </div>
      <div className="flex flex-col gap-4 h-40">
        <div>{data.title}</div>
        <div className="max-xl:flex max-xl:flex-wrap max-xl:justify-center max-xl:items-center max-xl:gap-5">
        <div className="text-xs xl:absolute left-3 top-3 bg-indigo-500 text-white xl:px-3 xl:py-1 max-xl:w-25 max-xl:flex max-xl:justify-center max-xl:items-center max-xl:h-5.5 rounded">
          {data.UpdatedAt}
        </div>
        <div className="xl:absolute bottom-3 left-3 flex justify-center xl:justify-end items-center gap-2">
          <div className="text-xs bg-orange-500 text-white w-24 h-6 rounded flex justify-center items-center">
            بازدید: {data.pageView}
          </div>
          {data.published == true ? (
            <div className="text-xs bg-emerald-600 text-white px-3 py-1 rounded">
              منتشر شده
            </div>
          ) : (
            <div className="text-xs bg-orange-500 text-white px-3 py-1 rounded">
              پیش‌نویس
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Box;
