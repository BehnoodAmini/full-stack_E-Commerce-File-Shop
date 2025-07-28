"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import BlogBox from "../newBlogs/BlogBox";
import SearchBlog from "../search-blog";

const BlogPageComp = ({ url }) => {
  const [result, setResult] = useState([-1]);
  const [btns, setBtns] = useState([-1]);
  const [searchedPostsNumber, setSearchedPostsNumber] = useState(0);

  const [pgn, setPgn] = useState(url.pgn ? `pgn=${url.pgn}` : "pgn=4");
  const [pn, setPn] = useState(url.pn ? `&pn=${url.pn}` : "&pn=1");
  const [keyword, setKeyword] = useState(
    url.keyword ? `&keyword=${unescape(url.keyword).replace(/\s+/g, "_")}` : ""
  );

  useEffect(() => {
    setResult([-1]);
    setBtns([-1]);
    setKeyword(
      url.keyword && url.keyword.length > 0
        ? `&keyword=${unescape(url.keyword).replace(/\s+/g, "_")}`
        : ""
    );
  }, [url.keyword]);

  useEffect(() => {
    axios
      .get(
        `https://behnood-fileshop-server.liara.run/api/search-posts?${pgn}${pn}${keyword}`
      )
      .then((d) => {
        setResult(d.data.allPosts);
        setBtns(d.data.btns);
        setSearchedPostsNumber(d.data.postsNumber);
      })
      .catch((e) => console.log(e));
  }, [pn, keyword]);

  const goTopCtrl = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col gap-8 p-2">
      <div>
        <meta charSet="utf-8" />
        <title> وبلاگ </title>
        <meta name="description" content=" وبلاگ فروشگاه فایل " />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="وبلاگ فروشگاه فایل" />
        <link rel="canonical" href="/blog" />
      </div>
      <section className="flex justify-center md:justify-between items-center gap-8 flex-wrap max-md:my-8 max-md:mx-2">
        <div className="flex justify-start items-center gap-4">
          <h1 className="text-center text-xl text-indigo-600">
            وبلاگ فروشگاه فایل
          </h1>
          <div className="flex justify-center items-center w-20 h-7 rounded text-base sm:text-sm border-2 border-indigo-500">
            {searchedPostsNumber} مقاله
          </div>
        </div>
        <SearchBlog />
      </section>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          {result[0] == -1 ? (
            <div className="flex justify-center items-center p-12">
              <Image
                alt="loading"
                width={120}
                height={120}
                src={"/loading.svg"}
              />
            </div>
          ) : result.length < 1 ? (
            <div className="flex justify-center items-center w-full p-8">
              مقاله‌ای موجود نیست...
            </div>
          ) : (
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-2">
              {result.map((da, i) => (
                <BlogBox key={i} data={da} />
              ))}
            </div>
          )}
        </div>
        <section className="flex justify-center items-center gap-4 flex-wrap">
          {btns[0] == -1 ? (
            <div className="w-full flex justify-center items-center p-12">
              <Image
                alt="loading"
                width={50}
                height={50}
                src={"/loading.svg"}
              />
            </div>
          ) : (
            btns.map((da, i) => (
              <button
                onClick={() => {
                  if (pn == `&pn=${da + 1}`) {
                    goTopCtrl();
                  } else {
                    setPn(`&pn=${da + 1}`);
                    goTopCtrl();
                    setResult([-1]);
                  }
                }}
                className={
                  pn == `&pn=${da + 1}`
                    ? "cursor-pointer w-8 h-8 rounded border-2 border-indigo-500 transition-all duration-300 bg-indigo-500 text-white hover:text-zinc-700 hover:bg-[#571fdb2a]"
                    : "cursor-pointer w-8 h-8 rounded border-2 border-indigo-500 transition-all duration-300 hover:bg-[#571fdb2a]"
                }
                key={i}
              >
                {da + 1}
              </button>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default BlogPageComp;
