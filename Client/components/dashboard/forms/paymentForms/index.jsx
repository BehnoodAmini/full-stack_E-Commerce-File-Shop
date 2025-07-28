"use client";

import { useState, useEffect } from "react";

import AllPayments from "./allPayments";
import PaymentDetails from "./paymentDetails";
import AllNewPayments from "./allPayments/newPayments";

const PaymentsMain = () => {
  const [paymentCtrl, setPaymentCtrl] = useState("");
  const [randNumForPaymentClick, setRandNumForPaymentClick] = useState(1);
  const [det, setDet] = useState(
    <AllPayments
      setPaymentCtrl={setPaymentCtrl}
      setRandNumForPaymentClick={setRandNumForPaymentClick}
    />
  );

  useEffect(() => {
    if (paymentCtrl != "") {
      setDet(<PaymentDetails goalId={paymentCtrl} />);
    }
  }, [randNumForPaymentClick]);

  return (
    <div className="flex flex-col gap-8 p-2">
      <section className="flex justify-center md:justify-between items-center gap-2 flex-wrap">
        <h1 className="text-blue-500 text-lg">سفارش‌ها</h1>
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() =>
              setDet(
                <AllPayments
                  setPaymentCtrl={setPaymentCtrl}
                  setRandNumForPaymentClick={setRandNumForPaymentClick}
                />
              )
            }
            className="cursor-pointer flex justify-center items-center w-32 h-10 rounded-md bg-indigo-600 text-white transition-all duration-300 hover:bg-orange-500"
          >
            همه
          </button>
          <button
            onClick={() =>
              setDet(
                <AllNewPayments
                  setPaymentCtrl={setPaymentCtrl}
                  setRandNumForPaymentClick={setRandNumForPaymentClick}
                />
              )
            }
            className="cursor-pointer flex justify-center items-center w-32 h-10 rounded-md bg-indigo-600 text-white transition-all duration-300 hover:bg-orange-500"
          >
            جدید
          </button>
        </div>
      </section>
      <section>{det}</section>
    </div>
  );
};

export default PaymentsMain;
