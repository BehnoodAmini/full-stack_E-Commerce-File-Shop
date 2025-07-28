"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

import Loading from "@/app/loading";

const AdminPanel = () => {
  const [authCookie, setAuthCookie] = useState(Cookies.get("auth_cookie"));

  const [newItemsData, setNewItemsData] = useState(-1);

  useEffect(() => {
    axios
      .get(`https://behnood-fileshop-server.liara.run/api/get-new-events`, {
        headers: { auth_cookie: authCookie },
      })
      .then((d) => {
        setNewItemsData(d.data);
      })
      .catch((e) => {
        toast.error("خطا در لود اطلاعات!", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setNewItemsData(0);
      });
  }, []);

  return (
    <div className="p-8 flex flex-col gap-8">
      <div>به پنل مدیریت وبسایت خوش آمدید.</div>
      <div>
        {newItemsData == -1 ? (
          <Loading />
        ) : newItemsData == 0 ? (
          <div>خطا در لود اطلاعات!</div>
        ) : (
          <div className="flex flex-col gap-6">
            {newItemsData.newUsersNum > 0 ? (
              <div>👨🏻‍💻 {newItemsData.newUsersNum} کاربر جدید</div>
            ) : (
              <></>
            )}
            {newItemsData.newPaymentsNum > 0 ? (
              <div>🛒 {newItemsData.newPaymentsNum} سفارش جدید</div>
            ) : (
              <></>
            )}
            {newItemsData.newCommentsNum > 0 ? (
              <div>💬 {newItemsData.newCommentsNum} دیدگاه جدید</div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
