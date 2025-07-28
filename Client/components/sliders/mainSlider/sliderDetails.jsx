"use client";

import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

import { useState } from "react";
import "animate.css";

const SliderDetails = ({ data }) => {
  const [nowSlide, setnowSlide] = useState(0);
  const sliderChangingHandler = (inp) => {
    let newNumber = nowSlide + inp;
    if (newNumber > data.length - 1) {
      newNumber = 0;
    }
    if (newNumber < 0) {
      newNumber = data.length - 1;
    }
    setnowSlide(newNumber);
  };
  const [slideHandler, setslideHandler] = useState(1);

  return (
    <>
      {data.length < 1 ? (
        <></>
      ) : (
        <section className="container mx-auto flex flex-col gap-40 relative p-2">
          <div className=" btns z-30 absolute left-4 top-4 flex gap-1">
            <FaChevronRight
              onClick={() => {
                setslideHandler(0);
                setTimeout(() => {
                  sliderChangingHandler(-1);
                  setslideHandler(1);
                }, 1000);
              }}
              className="bg-white md:w-10 md:h-10 w-8 h-8 md:p-3 p-2 rounded border-zinc-800 border-3 md:border-[.2rem] cursor-pointer hover:border-zinc-500 transition-all duration-500"
            />

            <FaChevronLeft
              onClick={() => {
                setslideHandler(0);
                setTimeout(() => {
                  sliderChangingHandler(1);
                  setslideHandler(1);
                }, 1000);
              }}
              className="bg-white md:w-10 md:h-10 w-8 h-8 md:p-3 p-2 rounded border-zinc-800 border-3 md:border-[.2rem] cursor-pointer hover:border-zinc-500 transition-all duration-500"
            />
          </div>
          <Link
            href={data[nowSlide].link}
            className="mt-11 md:mt-0 z-20 flex justify-center items-center gap-6"
          >
            <Image
              width={1280}
              height={300}
              className={
                slideHandler == 1
                  ? "rounded-xl animate__animated  animate__fadeIn"
                  : "rounded-xl animate__animated  animate__fadeOut"
              }
              alt={data[nowSlide].imageAlt}
              src={data[nowSlide].image}
            />
          </Link>
        </section>
      )}
    </>
  );
};

export default SliderDetails;
