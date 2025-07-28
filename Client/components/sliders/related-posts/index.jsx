"use client";

import { useRef, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

import BlogBox from "@/components/newBlogs/BlogBox";
import GraphicSlideBox from "../graphic-slider-box";

const RelatedPosts = ({ typeOfModel, title, relPostsData }) => {
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

  const [relModelDataState, setrelModelDataState] = useState([-1]);
  const sendingDataForRel = { goalIds: relPostsData };
  useEffect(() => {
    const url =
      typeOfModel == "post"
        ? "https://behnood-fileshop-server.liara.run/api/get-related-posts"
        : "https://behnood-fileshop-server.liara.run/api/get-related-products";
    axios
      .post(url, sendingDataForRel)
      .then((d) => {
        setrelModelDataState(d.data);
      })
      .catch((e) => console.log(e));
  }, [relPostsData]);

  return (
    <div>
      <div className="container mx-auto py-8 bg-zinc-100 rounded-lg">
        <div className="flex flex-col gap-6 px-2">
          <header className=" flex justify-between items-center">
            <h2 className="text-xl">{title}</h2>
            <div className="flex gap-1">
              <div className=" flex items-center gap-1 text-zinc-600">
                <FaChevronRight
                  onClick={() => {
                    carouselSwitcher(1);
                  }}
                  className=" cursor-pointer bg-indigo-500 transition-all duration-300 text-white hover:bg-orange-400 w-10 h-10 p-3 rounded"
                />
                <FaChevronLeft
                  onClick={() => {
                    carouselSwitcher(-1);
                  }}
                  className=" cursor-pointer bg-indigo-500 transition-all duration-300 text-white hover:bg-orange-400 w-10 h-10 p-3 rounded"
                />
              </div>
            </div>
          </header>
          <div
            ref={carouselRef}
            className="sliderContainer w-full max-w-5xl overflow-x-scroll md:px-4"
          >
            <div className=" flex justify-between items-center gap-4">
              {relModelDataState[0] == -1 ? (
                <div className="w-full flex justify-center items-center p-12">
                  <Image
                    alt="loading"
                    width={120}
                    height={120}
                    src={"/loading.svg"}
                  />
                </div>
              ) : relModelDataState.length < 1 ? (
                <div className=" justify-center flex items-center p-4">
                  محتوای مرتبطی موجود نیست.
                </div>
              ) : typeOfModel == "post" ? (
                relModelDataState.map((po, i) => <BlogBox data={po} key={i} />)
              ) : (
                relModelDataState.map((po, i) => (
                  <GraphicSlideBox itemData={po} key={i} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedPosts;
