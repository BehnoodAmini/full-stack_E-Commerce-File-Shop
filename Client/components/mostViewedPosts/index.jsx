"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const MostViewedPosts = () => {
  const [posts, setposts] = useState([-1]);
  useEffect(() => {
    axios
      .get("https://behnood-fileshop-server.liara.run/api/get-most-viewed-posts")
      .then((d) => {
        setposts(d.data);
      })
      .catch((e) => console.log(e));
  },[]);

  return (
    <div className=" flex flex-col gap-4 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
      <h3 className=" text-blue-500">پربازدیدترین مقالات</h3>
      <ul className=" flex flex-col gap-3">
        {posts[0] == -1 ? (
          <div className=" flex justify-center items-center p-12">
            <Image alt="loading" width={40} height={40} src={"/loading.svg"} />
          </div>
        ) : posts.length < 1 ? (
          <div>مقاله موجود نیست.</div>
        ) : (
          posts.map((po, i) => (
            <li key={i}>
              <Link
                className="p-2 flex justify-start items-center text-base sm:text-sm border-r-2 border-zinc-600 hover:text-indigo-600! hover:border-indigo-600 transition-all duration-300"
                href={`/blog/${po.slug}`}
              >
                {po.title}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MostViewedPosts;
