"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

import Cookies from "js-cookie";

const NewComment = ({ commentProps, text, itemParentId }) => {
  //PREVENT FORM TO BE SENT WITH ENTER
  const FormKeyNotSuber = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
    }
  };

  const router = useRouter();
  const [authCookie, setAuthCookie] = useState(Cookies.get("auth_cookie"));

  const messageRef = useRef();

  let theParentId="null";
  useEffect(()=>{
    if(itemParentId!=undefined){
      theParentId=itemParentId;
    }
  },[])

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (authCookie == undefined || authCookie.length < 10) {
      Cookies.remove("auth_cookie");
      router.push("/login");
    } else {
      const formData = {
        message: messageRef.current.value,
        src_id: commentProps.src_id,
        parentId: theParentId,
        typeOfModel: commentProps.typeOfModel,
      };
      const backendUrl =
        "https://behnood-fileshop-server.liara.run/api/new-comment";
      axios
        .post(backendUrl, formData, {
          headers: { auth_cookie: authCookie },
        })
        .then((d) => {
          const message = d.data.msg
            ? d.data.msg
            : "دیدگاه شما پس از بررسی منتشر خواهد شد.";
          toast.success(message, {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          messageRef.current.value = "";
        })
        .catch((err) => {
          const errorMsg =
            err.response && err.response.data && err.response.data.msg
              ? err.response.data.msg
              : "خطا در ثبت دیدگاه!";
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
    }
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      onKeyDown={FormKeyNotSuber}
      className="flex flex-col gap-6 bg-zinc-100 p-4 rounded-md"
    >
      <textarea
        ref={messageRef}
        rows="5"
        placeholder="دیدگاهتان را اینجا بنویسید..."
        className="p-2 rounded-lg w-full outline-none border-zinc-400 border-2 focus:border-orange-300 shadow-[0px_0px_5px_rgba(0,0,0,.15)] transition-all duration-500 focus:shadow-orange-400"
      />
      <button
        type="submit"
        className="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.50)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium"
      >
        {text}
      </button>
    </form>
  );
};

export default NewComment;
