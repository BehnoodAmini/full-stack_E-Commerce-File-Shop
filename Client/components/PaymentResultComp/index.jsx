"use client";

import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import { useAppContext } from "@/context/appContext";

const PaymentResultComp = ({ resolvedParams, cookie }) => {
  const router = useRouter();
  // CONTEXT OF CART NUMBER
  const { setCartNumber } = useAppContext();
  let oneRequest = 0;

  useEffect(() => {
    if (resolvedParams.Status !== "OK" && oneRequest == 0) {
      oneRequest = 1;
      toast.error("پرداخت انجام نشد!", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push("/cart");
    } else if (resolvedParams.Status == "OK" && oneRequest == 0) {
      oneRequest = 1;
      const formData = {
        resnumber: resolvedParams.Authority,
        payed: true,
      };
      axios
        .post(
          "https://behnood-fileshop-server.liara.run/api/payment-result-check",
          formData,
          { headers: { auth_cookie: cookie } }
        )
        .then((d) => {
          const message =
            d.data && d.data.msg ? d.data.msg : "پرداخت انجام شد.";
          toast.success(message, {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setCartNumber(0);
          router.push("/account/purchased");
        })
        .catch((e) => {
          console.log(e);
          const message =
            e.response && e.response.data && e.response.data.msg
              ? e.response.data.msg
              : "خطا در پرداخت!";
          toast.error(message, {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          router.push("/cart");
        });
    }
  }, [resolvedParams.Authority, resolvedParams.Status]);

  return <div>لطفا صبر کنید...</div>;
};

export default PaymentResultComp;
