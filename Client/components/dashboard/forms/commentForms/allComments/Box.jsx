"use client";

const Box = ({ data, setCommentCtrl, setRandNumForCommentClick }) => {
  return (
    <div
      onClick={() => {
        setCommentCtrl(data._id);
        setRandNumForCommentClick(Math.random());
      }}
      className="md:relative flex max-md:gap-5 flex-wrap justify-center md:justify-start gap-8 items-center cursor-pointer w-full h-auto md:h-28 p-6 rounded-lg bg-zinc-100 border-2 border-zinc-200 transition-all duration-300 hover:border-orange-500"
    >
      <div className="flex flex-col gap-4">
        <div>ایمیل: {data.email}</div>
        <div className="flex flex-wrap justify-center gap-2">
          <div className="text-xs md:absolute left-3 top-3 bg-orange-500 text-white flex justify-center items-center h-6 w-26 rounded-md">
            {data.createdAt}
          </div>
          <div className="text-xs md:absolute left-32 top-3 text-white">
            {data.parentId == "null" ? (
              <div className=" bg-sky-600 text-white px-3 py-1 rounded-md">
                اصلی
              </div>
            ) : (
              <div className=" bg-sky-600 text-white px-3 py-1 rounded-md">
                پاسخ
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <div className="md:absolute bottom-3 left-3 flex justify-end items-center gap-2">
            {data.published == true ? (
              <div className="text-xs bg-emerald-600 text-white flex justify-center items-center h-6 w-26 rounded-md">
                منتشر شده
              </div>
            ) : (
              <div className="text-xs bg-rose-600 text-white flex justify-center items-center h-6 w-26 rounded-md">
                منتشر نشده
              </div>
            )}
          </div>
          <div className="md:absolute bottom-3 left-32 flex justify-end items-center gap-2">
            {data.viewed == true ? (
              <div></div>
            ) : (
              <div className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-md">
                جدید
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;
