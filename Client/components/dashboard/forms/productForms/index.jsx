"use client";

import { useState, useEffect } from "react";

import AllProducts from "./allProducts";
import NewProduct from "./newProduct";
import ProductDetails from "./productDetails";

const PostsMain = () => {
  const [productDetCtrl, setProductDetCtrl] = useState("");
  const [randNumForProductClick, setRandNumForProductClick] = useState(1);
  const [det, setDet] = useState(
    <AllProducts
      setProductDetCtrl={setProductDetCtrl}
      setRandNumForProductClick={setRandNumForProductClick}
    />
  );

  useEffect(() => {
    if (productDetCtrl != "") {
      setDet(<ProductDetails goalId={productDetCtrl} />);
    }
  }, [randNumForProductClick]);

  return (
    <div className="flex flex-col gap-8 p-2">
      <section className="flex justify-center md:justify-between items-center gap-2 flex-wrap max-md:flex-col">
        <h1 className="text-blue-500 text-lg">محصولات</h1>
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() =>
              setDet(
                <AllProducts
                  setProductDetCtrl={setProductDetCtrl}
                  setRandNumForProductClick={setRandNumForProductClick}
                />
              )
            }
            className="cursor-pointer flex justify-center items-center w-32 h-10 rounded-md bg-indigo-600 text-white transition-all duration-300 hover:bg-orange-500"
          >
            همه
          </button>
          <button
            onClick={() => setDet(<NewProduct />)}
            className="cursor-pointer flex justify-center items-center w-32 h-10 rounded-md bg-indigo-600 text-white transition-all duration-300 hover:bg-orange-500"
          >
            محصول جدید
          </button>
        </div>
      </section>
      <section>{det}</section>
    </div>
  );
};

export default PostsMain;
