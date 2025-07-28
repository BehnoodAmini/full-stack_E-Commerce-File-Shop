"use client";

import { useState, useEffect } from "react";

import AllPosts from "./allPosts";
import NewPost from "./newPost";
import PostDetails from "./postDetails";

const PostsMain = () => {
  const [midBanDetCtrl, setMidBanDetCtrl] = useState("");
  const [randNumForBannerClick, setRandNumForBannerClick] = useState(1);
  const [det, setDet] = useState(
    <AllPosts
      setMidBanDetCtrl={setMidBanDetCtrl}
      setRandNumForBannerClick={setRandNumForBannerClick}
    />
  );

  useEffect(() => {
    if (midBanDetCtrl != "") {
      setDet(<PostDetails goalId={midBanDetCtrl} />);
    }
  }, [randNumForBannerClick]);

  return (
    <div className="flex flex-col gap-8 p-2">
      <section className="flex justify-center md:justify-between items-center gap-2 flex-wrap">
        <h1 className="text-blue-500 text-lg">پست‌ها</h1>
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() =>
              setDet(
                <AllPosts
                  setMidBanDetCtrl={setMidBanDetCtrl}
                  setRandNumForBannerClick={setRandNumForBannerClick}
                />
              )
            }
            className="cursor-pointer flex justify-center items-center w-32 h-10 rounded-md bg-indigo-600 text-white transition-all duration-300 hover:bg-orange-500"
          >
            همه
          </button>
          <button
            onClick={() => setDet(<NewPost />)}
            className="cursor-pointer flex justify-center items-center w-32 h-10 rounded-md bg-indigo-600 text-white transition-all duration-300 hover:bg-orange-500"
          >
            پست جدید
          </button>
        </div>
      </section>
      <section>{det}</section>
    </div>
  );
};

export default PostsMain;
