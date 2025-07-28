"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const CommentCounter = ({ goalId }) => {
  const [commentsNumber, setCommentsNumber] = useState(-1);
  useEffect(() => {
    axios
      .get(
        `https://behnood-fileshop-server.liara.run/api/get-model-comments-number/${goalId}`
      )
      .then((d) => {
        setCommentsNumber(d.data.number);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [goalId]);

  return (
    <span>
      {commentsNumber == -1 ? (
        <div className="flex justify-center items-center">
          <Image alt="loading" width={10} height={10} src={"/loading.svg"} />
        </div>
      ) : (
        commentsNumber
      )}
    </span>
  );
};

export default CommentCounter;
