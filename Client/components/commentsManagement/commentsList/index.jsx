"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";

import CommentBox from "../CommentBox";

const CommentsList = ({ commentProps }) => {
  const [modelAllComments, setModelAllComments] = useState([-1]);

  useEffect(() => {
    const backendUrl =
      "https://behnood-fileshop-server.liara.run/api/get-model-comments";
    const formData = {
      _id: commentProps.src_id,
    };
    axios
      .post(backendUrl, formData)
      .then((d) => {
        setModelAllComments(d.data);
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
  }, [commentProps.src_id]);

  return (
    <div>
      {modelAllComments[0] == -1 ? (
        <div className="flex justify-center items-center p-12">
          <Image alt="loading" width={100} height={100} src={"/loading.svg"} />
        </div>
      ) : modelAllComments.length < 1 ? (
        <div>
          اولین نفری باشید که برای این مطلب، دیدگاهتان را ثبت می‌کنید...
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {modelAllComments.map((da, i) => (
            <CommentBox key={i} data={da} commentProps={commentProps} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;
