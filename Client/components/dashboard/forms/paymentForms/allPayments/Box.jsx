"use client";

const Box = ({ data, setPaymentCtrl, setRandNumForPaymentClick }) => {
  // PRICE BEAUTIFUL
  function priceChanger(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div
      onClick={() => {
        setPaymentCtrl(data._id);
        setRandNumForPaymentClick(Math.random());
      }}
      className="md:relative flex max-md:gap-5 flex-wrap justify-center md:justify-start gap-8 items-center cursor-pointer w-full p-6 rounded-lg bg-zinc-100 border-2 border-zinc-200 transition-all duration-300 hover:border-orange-500"
    >
      <div className="flex flex-col gap-4">
        <div>مبلغ: {priceChanger(data.amount)}</div>
        <div>ایمیل: {data.email}</div>
        <div className="flex flex-wrap justify-center gap-5">
          <div className="text-xs md:absolute left-3 top-3 bg-orange-500 text-white px-3 py-1 rounded-md">
            {data.updatedAt}
          </div>
          <div className="text-xs md:absolute left-32 top-3 text-white">
            {data.payed == true ? (
              <div className=" bg-emerald-600 text-white px-3 py-1 rounded-md">
                پرداخت شده
              </div>
            ) : (
              <div className=" bg-rose-600 text-white px-3 py-1 rounded-md">
                پرداخت نشده
              </div>
            )}
          </div>
          <div className="md:absolute bottom-3 left-3 flex justify-end items-center gap-2">
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
