"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";
import Image from "next/image";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

const TextEditor = dynamic(() => import("@/components/richTextEditor"), {
  ssr: false,
});

const NewPost = () => {
  //PREVENT FORM TO BE SENT WITH ENTER
  const FormKeyNotSuber = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
    }
  };

  const [authCookie, setAuthCookie] = useState(Cookies.get("auth_cookie"));

  const titleRef = useRef();
  const slugRef = useRef();
  const imageRef = useRef();
  const imageAltRef = useRef();
  const shortDescRef = useRef();
  const publishedRef = useRef();
  const keywordsRef = useRef();
  const [longDescContent, setLongDescContent] = useState("");

  // TAG MANAGING
  const tagRef = useRef();
  const [tag, setTag] = useState([]);
  const tagSuber = (e) => {
    if (e.key === "Enter") {
      let tagList = [...tag];
      const data = tagRef.current.value;
      if (data.length > 0) {
        tagList = [...tag, data.replace(/\s+/g, "_").toLowerCase()];
        setTag(tagList);
      }
      tagRef.current.value = "";
    }
  };
  const [tagreloader, settagreloader] = useState(-1);
  const tagDeleter = (indexToRemove) => {
    tag.splice(indexToRemove, 1);
    setTag(tag);
    settagreloader(tagreloader * -1);
  };
  useEffect(() => {
    setTag(tag);
  }, [tagreloader]);

  // RELATED POSTS MANAGING
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [relPosts, setRelPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const postsUrl = `https://behnood-fileshop-server.liara.run/api/posts-rel`;
    setLoadingPosts(true);
    axios
      .get(postsUrl)
      .then((d) => {
        setAllPosts(d.data);
        setFilteredPosts(d.data);
        setLoadingPosts(false);
      })
      .catch((e) => {
        console.error("Error in loading posts:", e);
        setLoadingPosts(false);
        toast.error("خطا در بارگذاری مقالات.", { autoClose: 3000 });
      });
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredPosts(allPosts);
    } else {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = allPosts.filter((post) =>
        post.title.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, allPosts]);

  const postsRelatedMan = (e) => {
    const postId = e.target.value;
    if (e.target.checked) {
      setRelPosts((prevRelPosts) => [...prevRelPosts, postId]);
    } else {
      setRelPosts((prevRelPosts) => prevRelPosts.filter((id) => id !== postId));
    }
  };

  const selectedRelatedPosts = useMemo(() => {
    return allPosts.filter((post) => relPosts.includes(post._id));
  }, [relPosts, allPosts]);

  const removeSelectedRelatedPost = (postIdToRemove) => {
    setRelPosts((prevRelPosts) =>
      prevRelPosts.filter((id) => id !== postIdToRemove)
    );
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    const formData = {
      title: titleRef.current.value,
      createdAt: new Date().toLocaleDateString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      UpdatedAt: new Date().toLocaleDateString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      slug: slugRef.current.value,
      image: imageRef.current.value,
      imageAlt: imageAltRef.current.value,
      shortDesc: shortDescRef.current.value,
      longDesc: longDescContent,
      keywords: keywordsRef.current.value,
      tags: tag,
      type: "post",
      pageView: 0,
      published: publishedRef.current.value,
      comments: [],
      relatedPosts: relPosts,
    };
    const url = `https://behnood-fileshop-server.liara.run/api/new-post`;
    axios
      .post(url, formData, {
        headers: { auth_cookie: authCookie },
      })
      .then((d) => {
        formData.published === "true"
          ? toast.success("مقاله با موفقیت منتشر شد.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          : toast.success("مقاله به صورت پیش‌نویس ذخیره شد.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
      })
      .catch((e) => {
        let message = "متاسفانه ناموفق بود.";
        if (e.response && e.response.data && e.response.data.msg) {
          message = e.response.data.msg;
        }

        toast.error(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      <h2 className="text-orange-500 text-lg">پست جدید</h2>
      <form
        onSubmit={SubmitHandler}
        onKeyDown={FormKeyNotSuber}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-medium text-gray-700">
            عنوان مقاله
          </label>
          <input
            required={true}
            type="text"
            id="title"
            ref={titleRef}
            className="p-3 rounded-lg w-full outline-none border-2 border-zinc-300 focus:border-orange-400 transition-colors duration-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="slug" className="font-medium text-gray-700">
            اسلاگ پست
          </label>
          <input
            required={true}
            type="text"
            id="slug"
            ref={slugRef}
            className="inputLtr p-3 rounded-lg w-full outline-none border-2 border-zinc-300 focus:border-orange-400 transition-colors duration-200 text-left"
            dir="ltr"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="font-medium text-gray-700">
            آدرس عکس
          </label>
          <input
            required={true}
            type="text"
            id="image"
            ref={imageRef}
            className="inputLtr p-3 rounded-lg w-full outline-none border-2 border-zinc-300 focus:border-orange-400 transition-colors duration-200 text-left"
            dir="ltr"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="imageAlt" className="font-medium text-gray-700">
            alt عکس
          </label>
          <input
            required={true}
            type="text"
            id="imageAlt"
            ref={imageAltRef}
            className="p-3 rounded-lg w-full outline-none border-2 border-zinc-300 focus:border-orange-400 transition-colors duration-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="shortDesc" className="font-medium text-gray-700">
            توضیحات کوتاه
          </label>
          <input
            required={true}
            type="text"
            id="shortDesc"
            ref={shortDescRef}
            className="p-3 rounded-lg w-full outline-none border-2 border-zinc-300 focus:border-orange-400 transition-colors duration-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">توضیحات کامل</label>
          <TextEditor
            initialContent={longDescContent}
            onChange={setLongDescContent}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="keywords" className="font-medium text-gray-700">
            کلمات کلیدی جدید (با ویرگول جدا کنید)
          </label>
          <input
            required={true}
            type="text"
            id="keywords"
            ref={keywordsRef}
            className="p-2 rounded-lg w-full outline-none border-2 border-zinc-300 focus:border-orange-400 transition-colors duration-200"
          />
        </div>
        <div className="tags flex flex-col gap-4">
          <h3 className="font-medium text-gray-700">برچسب‌ها</h3>
          <div className="tags w-full flex flex-col gap-4">
            <div className="input flex gap-2 items-center">
              <input
                type="text"
                onKeyDown={tagSuber}
                ref={tagRef}
                className="p-3 rounded-lg w-full outline-none border-2 border-zinc-300 focus:border-orange-400 transition-colors duration-200"
                placeholder="تگ را وارد کنید و Enter بزنید..."
              />
            </div>
            <div className="tagResults flex gap-3 justify-start flex-wrap">
              {tag.map((t, index) => (
                <div
                  key={t}
                  className="res flex gap-1 text-sm py-2 px-3 rounded-full bg-zinc-100 border-2 border-zinc-300 items-center shadow-sm"
                >
                  <span className="text-xs text-gray-700">{t}</span>
                  <button
                    type="button"
                    onClick={() => tagDeleter(index)}
                    className="text-indigo-500 hover:text-indigo-700 transition-colors duration-200 focus:outline-none"
                    aria-label={`حذف تگ ${t}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="tags flex flex-col gap-4">
          <h3 className="font-medium text-gray-700">مقاله‌های مرتبط</h3>
          {/* Display selected related posts as chips */}
          {selectedRelatedPosts.length > 0 && (
            <div className="flex gap-3 justify-start flex-wrap mb-4 p-2 bg-blue-50 rounded-lg border border-blue-200 shadow-inner">
              {selectedRelatedPosts.map((post) => (
                <div
                  key={post._id}
                  className="flex gap-1 text-sm py-2 px-3 rounded-full bg-blue-100 border border-blue-300 items-center shadow-sm"
                >
                  <span className="text-xs text-blue-800">{post.title}</span>
                  <button
                    type="button"
                    onClick={() => removeSelectedRelatedPost(post._id)}
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-200 focus:outline-none"
                    aria-label={`حذف مقاله مرتبط ${post.title}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
          {/* Search Input for Related Posts */}
          <input
            type="text"
            placeholder="جستجو برای مقالات مرتبط..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 rounded-lg w-full outline-none border-2 border-zinc-300 focus:border-blue-400 transition-colors duration-200 mb-4"
          />

          {loadingPosts ? (
            <div className="flex justify-center items-center p-12">
              <Image
                alt="loading"
                width={120}
                height={120}
                src={"/loading.svg"}
              />
            </div>
          ) : filteredPosts.length < 1 ? (
            <div className="p-3 text-gray-600">مقاله‌ای یافت نشد.</div>
          ) : (
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto border border-zinc-200 rounded-lg p-3 bg-white shadow-sm">
              {filteredPosts.map((po) => (
                <div
                  key={po._id}
                  className="flex items-center gap-2 px-3 py-2 bg-zinc-50 hover:bg-zinc-100 rounded-md transition-colors duration-200 cursor-pointer"
                >
                  <input
                    name={`related_post_${po._id}`}
                    id={`related_post_${po._id}`}
                    type="checkbox"
                    value={po._id}
                    onChange={postsRelatedMan}
                    checked={relPosts.includes(po._id)}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`related_post_${po._id}`}
                    className="text-gray-800 text-sm font-medium flex-grow cursor-pointer"
                  >
                    {po.title}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="published" className="font-medium text-gray-700">
            وضعیت
          </label>
          <select
            id="published"
            ref={publishedRef}
            className="p-3 rounded-lg w-full outline-none border-2 border-zinc-300 focus:border-orange-400 transition-colors duration-200"
          >
            <option value={true}>انتشار</option>
            <option value={false}>پیش‌نویس</option>
          </select>
        </div>
        <button
          type="submit"
          className="cursor-pointer p-2 bg-indigo-600 text-white w-full rounded-lg transition-all duration-300 hover:bg-orange-500 shadow-md hover:shadow-lg"
        >
          ارسال
        </button>
      </form>
    </div>
  );
};

export default NewPost;
