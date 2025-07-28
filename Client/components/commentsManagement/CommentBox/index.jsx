"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { FaReply } from "react-icons/fa";

import NewComment from "../newComment";
import CommentRepliesList from "@/components/commentRepliesList";

const CommentBox = ({ data, commentProps }) => {
  const [replyDisplayer, setReplyDisplayer] = useState(1);
  const [childrensDisplayer, setchildrensDisplayer] = useState(1);

  return (
    <div className="bg-zinc-100 p-2 rounded-md flex flex-col gap-2 shadow-[0px_0px_5px_rgba(0,0,0,.15)] border-zinc-200">
      <div className="flex justify-between items-center flex-wrap">
        <div className="px-2 py-1 rounded-lg bg-zinc-200">
          {data.displayname}:
        </div>
        <div className="px-2 py-1 rounded-lg bg-indigo-500 text-white!">
          {data.createdAt}
        </div>
      </div>
      <p className="text-black leading-7 text-justify p-2">{data.message}</p>
      <div className="flex justify-end items-center gap-4">
        <div
          onClick={() => setchildrensDisplayer(childrensDisplayer * -1)}
          className="cursor-pointer text-base sm:text-sm px-2 h-8 rounded-md bg-cyan-600 text-white! flex justify-center items-center"
        >
          نمایش پاسخ‌ها
        </div>
        <FaReply
          onClick={() => setReplyDisplayer(replyDisplayer * -1)}
          className="cursor-pointer w-8 h-8 p-2 rounded-md bg-cyan-600 text-white! rotate-180"
        />
      </div>
      <AnimatePresence>
        {replyDisplayer == -1 && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            transition={{ duration: 0.7, ease: "backOut" }}
            style={{ overflow: "hidden" }}
          >
            <NewComment
              text={"ثبت پاسخ"}
              itemParentId={data._id}
              commentProps={commentProps}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {childrensDisplayer == -1 && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            transition={{ duration: 0.7, ease: "backOut" }}
            style={{ overflow: "hidden" }}
          >
            <CommentRepliesList commentProps={commentProps} goalId={data._id} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommentBox;
