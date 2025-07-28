"use client";

import { useRef } from "react";
import Link from "next/link";

import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

import SlideBox from "../product-slider-box";

const ProductsSlider = ({ title, linkComp, goalData }) => {
  const carouselRef = useRef();
  const carouselSwitcher = (data) => {
    if (carouselRef.current) {
      const width = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo(
        carouselRef.current.scrollLeft + width * data,
        0
      );
    }
  };

  return (
    <>
      {goalData.length < 1 ? (
        <div></div>
      ) : (
        <div className="bg-indigo-500">
          <div className="container mx-auto py-8">
            <section className="flex flex-col gap-4 px-2">
              <header className=" flex justify-between items-center">
                <h2 className="text-xl md:text-2xl border-r-white border-r-2 pr-1  text-white">
                  {title}
                </h2>
                <div className="flex gap-1">
                  <div className=" flex items-center gap-1 text-zinc-600">
                    <FaChevronRight
                      onClick={() => {
                        carouselSwitcher(1);
                      }}
                      className=" cursor-pointer bg-zinc-200 transition-all duration-300 hover:text-white hover:bg-orange-400 md:w-10 md:h-10 w-8 h-8 p-2.5 md:p-3 rounded"
                    />
                    <FaChevronLeft
                      onClick={() => {
                        carouselSwitcher(-1);
                      }}
                      className=" cursor-pointer bg-zinc-200 transition-all duration-300 hover:text-white hover:bg-orange-400 md:w-10 md:h-10 w-8 h-8 p-2.5 md:p-3 rounded"
                    />
                  </div>
                  <Link
                    href={`/shop?&orderBy=date&type=${linkComp}&maxP=1000000000&minP=0&pgn=12&pn=1`}
                    className="flex items-center text-white! border-white border-2 bg-orange-500 px-4 py-1 rounded-md transition-all duration-500 hover:bg-orange-600"
                  >
                    همگی
                  </Link>
                </div>
              </header>
              <div
                ref={carouselRef}
                className="sliderContainer w-full max-w-7xl overflow-x-scroll px-4"
              >
                <div className=" flex justify-between items-center gap-4 ">
                  {goalData.map((da, i) => (
                    <SlideBox key={i} itemData={da} linkComp={linkComp}/>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsSlider;
