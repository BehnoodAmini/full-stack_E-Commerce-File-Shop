"use client";

import Image from "next/image";

const Box = ({ data, setMidBanDetCtrl, setRandNumForBannerClick }) => {
  return (
    <div
      onClick={() => {
        setMidBanDetCtrl(data._id);
        setRandNumForBannerClick(Math.random());
      }}
      className="xl:relative flex max-xl:gap-5 flex-wrap justify-center xl:justify-between items-center cursor-pointer w-full p-2 md:p-6 rounded-lg bg-zinc-100 border-2 border-zinc-200 transition-all duration-300 hover:border-orange-500"
    >
      <div className="flex justify-start items-center">
        <Image
          className="rounded-lg"
          src={data.image}
          alt={data.imageAlt}
          title={data.imageAlt}
          width={500}
          height={250}
        />
      </div>
      <div className="flex items-center gap-3 xl:absolute bottom-3 left-3">
        {data.situation == true ? (
          <div className="text-xs bg-emerald-600 text-white px-3 py-1 rounded">
            فعال
          </div>
        ) : (
          <div className="text-xs bg-rose-600 text-white px-3 py-1 rounded">
            غیر فعال
          </div>
        )}
        <div className="text-xs bg-orange-500 text-white px-3 py-1 rounded">
          {data.date}
        </div>
        <div className="text-xs bg-orange-500 text-white px-3 py-1 rounded">
          اسلایدر {data.sorter}
        </div>
      </div>
    </div>
  );
};

export default Box;
