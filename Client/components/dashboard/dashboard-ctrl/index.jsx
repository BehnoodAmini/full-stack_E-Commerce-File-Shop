"use client";

import { useState } from "react";

import DCBtn from "./btn";

const DashboardCtrl = ({ setContentChanger }) => {
  const [colorChanger, setColorChanger] = useState("admin-panel");

  return (
    <div className="w-full md:w-60 flex justify-center items-center h-[100vh]">
      <div className="flex flex-col bg-transparent md:bg-zinc-200 rounded-lg md:w-full h-[98vh] items-center justify-around p-4 md:shadow-[1px_0px_5px_rgba(0,0,0,.3)]">
        <DCBtn
          title={"پیشخوان"}
          content={"admin-panel"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
        />
        <DCBtn
          title={"بنرهای تبلیغاتی"}
          content={"midBan"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
        />
        <DCBtn
          title={"اسلایدرها"}
          content={"sliders"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
        />
        <DCBtn
          title={"پست‌ها"}
          content={"posts"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
        />
        <DCBtn
          title={"دسته بندی محصولات"}
          content={"categories"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
        />
        <DCBtn
          title={"محصولات"}
          content={"products"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
        />
        <DCBtn
          title={"کاربرها"}
          content={"users"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
        />
        <DCBtn
          title={"سفارش‌ها"}
          content={"payments"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
        />
        <DCBtn
          title={"دیدگاه‌ها"}
          content={"comments"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
        />
      </div>
    </div>
  );
};

export default DashboardCtrl;
