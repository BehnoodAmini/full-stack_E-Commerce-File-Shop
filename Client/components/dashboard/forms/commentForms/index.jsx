"use client";

import { useState, useEffect } from "react";

import AllComments from "./allComments";
import CommentDetails from "./commentDetails";
import AllNewComments from "./allComments/newComments";

const CommentsMain = () => {
  const [commentCtrl, setCommentCtrl] = useState("");
  const [randNumForCommentClick, setRandNumForCommentClick] = useState(1);
  const [det, setDet] = useState(
    <AllComments
      setCommentCtrl={setCommentCtrl}
      setRandNumForCommentClick={setRandNumForCommentClick}
    />
  );

  useEffect(() => {
    if (commentCtrl != "") {
      setDet(<CommentDetails goalId={commentCtrl} />);
    }
  }, [randNumForCommentClick]);

  return (
    <div className="flex flex-col gap-8 p-2">
      <section className="flex justify-center md:justify-between items-center gap-2 flex-wrap">
        <h1 className="text-blue-500 text-lg">دیدگاه‌ها</h1>
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() =>
              setDet(
                <AllComments
                  setCommentCtrl={setCommentCtrl}
                  setRandNumForCommentClick={setRandNumForCommentClick}
                />
              )
            }
            className="cursor-pointer flex justify-center items-center w-32 h-10 rounded-md bg-indigo-600 text-white transition-all duration-300 hover:bg-orange-500"
          >
            همه
          </button>
          <button
            onClick={() =>
              setDet(
                <AllNewComments
                  setCommentCtrl={setCommentCtrl}
                  setRandNumForCommentClick={setRandNumForCommentClick}
                />
              )
            }
            className="cursor-pointer flex justify-center items-center w-32 h-10 rounded-md bg-indigo-600 text-white transition-all duration-300 hover:bg-orange-500"
          >
            جدید
          </button>
        </div>
      </section>
      <section>{det}</section>
    </div>
  );
};

export default CommentsMain;
