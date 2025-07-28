"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";

import CommentBox from "../commentsManagement/CommentBox";

const CommentRepliesList = ({ goalId, commentProps }) => {
  const [commentReplies, setCommentReplies] = useState([-1]);

  useEffect(() => {
    const backendUrl =
      `https://behnood-fileshop-server.liara.run/api/get-comment-childrens/${goalId}`;
    
    axios
      .get(backendUrl)
      .then((d) => {
        setCommentReplies(d.data);
      })
      .catch((err) => {
        const errorMsg =
          err.response && err.response.data && err.response.data.msg
            ? err.response.data.msg
            : "خطا در لود دیدگاه‌ها!";
        console.log(err);
        toast.error(errorMsg, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }, [goalId]);

  return (
    <div>
      {commentReplies[0] == -1 ? (
        <div className="flex justify-center items-center p-12">
          <Image alt="loading" width={100} height={100} src={"/loading.svg"} />
        </div>
      ) : commentReplies.length < 1 ? (
        <div>
          اولین نفری باشید که برای این دیدگاه، پاسخ ثبت می‌کنید...
        </div>
      ) : (
        <div className="flex flex-col gap-6 border-2 border-indigo-200 rounded-lg p-0.5">
          {commentReplies.map((da, i) => (
            <CommentBox key={i} data={da} commentProps={commentProps} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentRepliesList;
