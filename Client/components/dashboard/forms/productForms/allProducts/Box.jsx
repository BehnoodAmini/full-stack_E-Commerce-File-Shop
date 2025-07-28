"use client";

import Image from "next/image";

const Box = ({ data, setProductDetCtrl, setRandNumForProductClick }) => {
// PRICE BEAUTIFUL
function priceChanger(x){
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

  return (
    <div
      onClick={() => {
        setProductDetCtrl(data._id);
        setRandNumForProductClick(Math.random());
      }}
      className="xl:relative flex max-[1280px]:gap-5 flex-wrap justify-center xl:justify-start gap-8 items-center cursor-pointer w-full p-6 rounded-lg bg-zinc-100 border-2 border-zinc-200 transition-all duration-300 hover:border-orange-500"
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
      <div className="flex flex-col gap-4 max-[1280px]:gap-8 h-40 max-[328]:h-50">
        <div className="text-xl max-[1280px]:line-clamp-1">{data.title}</div>
        <div className="xl:absolute left-3 top-3 flex justify-center xl:justify-end items-center gap-2 text-white flex-wrap">
          <div className="text-xs bg-indigo-500 px-3 py-1 rounded">
            {data.updatedAt}
          </div>
          <div className="text-xs bg-indigo-500 px-3 py-1 rounded">
            {data.buyNumber} فروش
          </div>
          <div className="text-xs bg-indigo-500 px-3 py-1 rounded">
            {priceChanger(data.price)} تومان
          </div>
        </div>
        <div className="xl:absolute bottom-3 left-3 flex justify-center xl:justify-end items-center gap-2 text-white flex-wrap">
          <div className="text-xs bg-indigo-600 px-3 py-1 rounded">
            {data.typeOfProduct == "book" ? (
              <span>کتاب</span>
            ) : data.typeOfProduct == "app" ? (
              <span>اپلیکیشن</span>
            ) : (
              <span>فایل گرافیکی</span>
            )}
          </div>
          <div className="text-xs bg-orange-500 w-24 h-6 rounded flex justify-center items-center">
            بازدید: {data.pageView}
          </div>
          {data.published == true ? (
            <div className="text-xs bg-emerald-600 px-3 py-1 rounded">
              منتشر شده
            </div>
          ) : (
            <div className="text-xs bg-orange-500 px-3 py-1 rounded">
              پیش‌نویس
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Box;
