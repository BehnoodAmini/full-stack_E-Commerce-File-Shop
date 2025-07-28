"use client";

import { useState, useEffect } from "react";

import AllCategories from "./allCategories";
import NewCategory from "./newCategory";
import CategoryDetails from "./categoryDetails";

const CategoryMain = () => {
  const [categoryDetCtrl, setCategoryDetCtrl] = useState("");
  const [randNumForBannerClick, setRandNumForBannerClick] = useState(1);
  const [det, setDet] = useState(
    <AllCategories
      setCategoryDetCtrl={setCategoryDetCtrl}
      setRandNumForBannerClick={setRandNumForBannerClick}
    />
  );

  useEffect(() => {
    if (categoryDetCtrl != "") {
      setDet(<CategoryDetails categoryId={categoryDetCtrl} />);
    }
  }, [randNumForBannerClick]);

  return (
    <div className="flex flex-col gap-8 p-2">
      <section className="flex justify-center md:justify-between items-center gap-2 flex-wrap">
        <h1 className="text-blue-500 text-lg">دسته بندی محصولات</h1>
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() =>
              setDet(
                <AllCategories
                  setCategoryDetCtrl={setCategoryDetCtrl}
                  setRandNumForBannerClick={setRandNumForBannerClick}
                />
              )
            }
            className="cursor-pointer flex justify-center items-center w-32 h-10 rounded-md bg-indigo-600 text-white transition-all duration-300 hover:bg-orange-500"
          >
            همه
          </button>
          <button
            onClick={() => setDet(<NewCategory />)}
            className="cursor-pointer flex justify-center items-center w-32 h-10 rounded-md bg-indigo-600 text-white transition-all duration-300 hover:bg-orange-500"
          >
            دسته جدید
          </button>
        </div>
      </section>
      <section>{det}</section>
    </div>
  );
};

export default CategoryMain;
