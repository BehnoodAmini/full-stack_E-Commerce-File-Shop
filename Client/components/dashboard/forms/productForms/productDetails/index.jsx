"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

const TextEditor = dynamic(() => import("@/components/richTextEditor"), {
  ssr: false,
});

const ProductDetails = ({ goalId }) => {
  //PREVENT FORM TO BE SENT WITH ENTER
  const FormKeyNotSuber = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const goTopCtrl = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SPLITER FOR CATEGORIES
  const spliterForCategories = (value) => {
    return value.split("*");
  };

  const [authCookie, setAuthCookie] = useState(Cookies.get("auth_cookie"));

  const titleRef = useRef();
  const slugRef = useRef();
  const mainFileRef = useRef();
  const imageRef = useRef();
  const imageAltRef = useRef();
  const priceRef = useRef();
  const shortDescRef = useRef();
  const typeOfProductRef = useRef();
  const publishedRef = useRef();
  const keywordsRef = useRef();
  const [longDescState, setLongDescState] = useState("");

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

  // FEATURES MANAGING
  const featuresRef = useRef();
  const [feature, setFeature] = useState([]);
  const featureSuber = (e) => {
    if (e.key === "Enter") {
      let featureList = [...feature];
      const data = featuresRef.current.value;
      if (data.length > 0) {
        featureList = [...feature, data];
        setFeature(featureList);
      }
      featuresRef.current.value = "";
    }
  };
  const featureDeleter = (indexToRemove) => {
    setFeature(feature.filter((_, index) => index !== indexToRemove));
  };

  // RELATED PRODUCTS MANAGING
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [relProducts, setRelProducts] = useState([]);
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const productsUrl = `https://behnood-fileshop-server.liara.run/api/products-rel`;
    setLoadingProducts(true);
    axios
      .get(productsUrl)
      .then((d) => {
        setAllProducts(d.data);
        setFilteredProducts(d.data);
        setLoadingProducts(false);
      })
      .catch((e) => {
        console.error("Error in loading products:", e);
        setLoadingProducts(false);
        toast.error("خطا در بارگذاری محصولات.", { autoClose: 3000 });
      });
  }, []);

  // Filter products based on search term
  useEffect(() => {
    if (productSearchTerm === "") {
      setFilteredProducts(allProducts);
    } else {
      const lowercasedSearchTerm = productSearchTerm.toLowerCase();
      const filtered = allProducts.filter((product) =>
        product.title.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredProducts(filtered);
    }
  }, [productSearchTerm, allProducts]);

  const productsRelatedMan = (e) => {
    const productId = e.target.value;
    if (e.target.checked) {
      setRelProducts((prevRelProducts) => [...prevRelProducts, productId]);
    } else {
      setRelProducts((prevRelProducts) =>
        prevRelProducts.filter((id) => id !== productId)
      );
    }
  };

  const selectedRelatedProducts = useMemo(() => {
    return allProducts.filter((product) => relProducts.includes(product._id));
  }, [relProducts, allProducts]);

  const removeSelectedRelatedProduct = (productIdToRemove) => {
    setRelProducts((prevRelProducts) =>
      prevRelProducts.filter((id) => id !== productIdToRemove)
    );
  };

  // CATEGORIES MANAGING
  const [allCategories, setAllCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [relCategories, setRelCategories] = useState([]);
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const categoriesUrl = `https://behnood-fileshop-server.liara.run/api/products-categories-rel`;
    setLoadingCategories(true);
    axios
      .get(categoriesUrl)
      .then((d) => {
        setAllCategories(d.data);
        setFilteredCategories(d.data);
        setLoadingCategories(false);
      })
      .catch((e) => {
        console.error("Error in loading categories:", e);
        setLoadingCategories(false);
        toast.error("خطا در بارگذاری دسته‌بندی‌ها.", { autoClose: 3000 });
      });
  }, []);

  // Filter categories based on search term
  useEffect(() => {
    if (categorySearchTerm === "") {
      setFilteredCategories(allCategories);
    } else {
      const lowercasedSearchTerm = categorySearchTerm.toLowerCase();
      const filtered = allCategories.filter((category) =>
        category.title.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredCategories(filtered);
    }
  }, [categorySearchTerm, allCategories]);

  const productsCategoriesMan = (e) => {
    const goalArr = spliterForCategories(e.target.value);
    const categoryObject = {
      _id: goalArr[0],
      title: goalArr[1],
      slug: goalArr[2],
    };

    if (e.target.checked) {
      setRelCategories((prevRelCategories) => [
        ...prevRelCategories,
        categoryObject,
      ]);
    } else {
      setRelCategories((prevRelCategories) =>
        prevRelCategories.filter((cat) => cat._id !== categoryObject._id)
      );
    }
  };

  const removeSelectedCategory = (categoryIdToRemove) => {
    setRelCategories((prevRelCategories) =>
      prevRelCategories.filter((cat) => cat._id !== categoryIdToRemove)
    );
  };

  const UpdateHandler = (e) => {
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
      mainFile: mainFileRef.current.value,
      image: imageRef.current.value,
      imageAlt: imageAltRef.current.value,
      price: priceRef.current.value,
      shortDesc: shortDescRef.current.value,
      longDesc: longDescState,
      keywords: keywordsRef.current.value,
      tags: tag,
      features: feature,
      typeOfProduct: typeOfProductRef.current.value,
      published: publishedRef.current.value,
      relatedProducts: relProducts,
      categories: relCategories,
    };
    const url = `https://behnood-fileshop-server.liara.run/api/update-product/${goalId}`;
    axios
      .post(url, formData, {
        headers: { auth_cookie: authCookie },
      })
      .then((d) => {
        formData.published === "true"
          ? toast.success("محصول با موفقیت به‌روزرسانی و منتشر شد.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          : toast.success(
              "محصول با موفقیت به‌روزرسانی و به صورت پیش‌نویس ذخیره شد.",
              {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
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

  const RemoveHandler = () => {
    const url = `https://behnood-fileshop-server.liara.run/api/delete-product/${goalId}`;
    axios
      .post(
        url,
        { item: 1 },
        {
          headers: { auth_cookie: authCookie },
        }
      )
      .then((d) => {
        toast.success("محصول با موفقیت حذف شد.", {
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

  // LOADING DEFAULT VALUES
  const [fullData, setFullData] = useState([-1]);
  useEffect(() => {
    goTopCtrl();
    axios
      .get(
        `https://behnood-fileshop-server.liara.run/api/get-product-by-id/${goalId}`,
        {
          headers: { auth_cookie: authCookie },
        }
      )
      .then((d) => {
        setFullData(d.data);
        setTag(d.data.tags);
        setFeature(d.data.features);
        setRelProducts(d.data.relatedProducts);
        setRelCategories(d.data.categories);
        setLongDescState(d.data.longDesc || "");
      })
      .catch((e) => {
        toast.error("خطا در لود اطلاعات!", {
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
    <div className="flex flex-col gap-8">
      {fullData[0] === -1 ? (
        <div className="flex justify-center items-center p-12">
          <Image alt="loading" width={120} height={120} src={"/loading.svg"} />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h2 className="text-orange-500">جزئیات محصول</h2>
            <div className="flex justify-end items-center gap-4">
              <Link
                target="_blank"
                href={`/shop/${fullData.slug}`}
                className="bg-indigo-600 text-white! px-1 md:px-4 py-1.5 rounded-md text-sm transition-all duration-300 hover:bg-indigo-700"
              >
                لینک محصول
              </Link>
              <div className="w-20 h-6 flex justify-center items-center m-1">
                <button
                  onClick={() => RemoveHandler()}
                  className="cursor-pointer h-8 inline-flex items-center px-4 py-2 bg-rose-600 transition ease-in-out delay-75 hover:bg-rose-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                >
                  حذف
                  <svg
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      strokeWidth={2}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center flex-wrap max-xl:gap-5">
            <div className="bg-zinc-100 rounded px-3 py-1 text-sm">
              شناسه محصول: {fullData._id ? fullData._id : ""}
            </div>
            <div className="bg-zinc-100 rounded px-3 py-1 text-sm">
              تاریخ ایجاد: {fullData.createdAt ? fullData.createdAt : ""}
            </div>
            <div className="bg-zinc-100 rounded px-3 py-1 text-sm">
              به‌روزرسانی: {fullData.updatedAt ? fullData.updatedAt : ""}
            </div>
            <div className="bg-zinc-100 rounded px-3 py-1 text-sm">
              {fullData.pageView ? fullData.pageView : 0} بازدید
            </div>
            <div className="bg-zinc-100 rounded px-3 py-1 text-sm">
              {fullData.buyNumber ? fullData.buyNumber : 0} فروش
            </div>
            <div className="bg-zinc-100 rounded px-3 py-1 text-sm">
              {fullData.comments ? fullData.comments.length : 0} دیدگاه
            </div>
            <div
              className={
                fullData.published
                  ? "bg-emerald-600 rounded px-3 py-1 text-sm text-white"
                  : "bg-orange-500 rounded px-3 py-1 text-sm text-white"
              }
            >
              {fullData.published ? "منتشر شده" : "پیش‌نویس"}
            </div>
          </div>
          <form
            onSubmit={UpdateHandler}
            onKeyDown={FormKeyNotSuber}
            className="flex flex-col gap-10"
          >
            <div className="flex flex-col gap-2">
              <div>عنوان جدید محصول</div>
              <input
                defaultValue={fullData.title ? fullData.title : ""}
                required={true}
                type="text"
                ref={titleRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>اسلاگ جدید محصول</div>
              <input
                defaultValue={fullData.slug ? fullData.slug : ""}
                required={true}
                type="text"
                ref={slugRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>URL فایل اصلی جدید محصول</div>
              <input
                defaultValue={fullData.mainFile ? fullData.mainFile : ""}
                required={true}
                type="text"
                ref={mainFileRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>آدرس جدید عکس</div>
              <input
                defaultValue={fullData.image ? fullData.image : ""}
                required={true}
                type="text"
                ref={imageRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>alt جدید عکس</div>
              <input
                defaultValue={fullData.imageAlt ? fullData.imageAlt : ""}
                required={true}
                type="text"
                ref={imageAltRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>قیمت جدید محصول(تومان)</div>
              <input
                defaultValue={fullData.price ? fullData.price : ""}
                required={true}
                type="number"
                ref={priceRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>توضیحات کوتاه جدید</div>
              <input
                defaultValue={fullData.shortDesc ? fullData.shortDesc : ""}
                required={true}
                type="text"
                ref={shortDescRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>توضیحات کامل جدید</div>
              {longDescState !== undefined ? (
                <TextEditor
                  initialContent={longDescState}
                  onChange={setLongDescState}
                />
              ) : (
                <div className="p-4 text-center">
                  در حال بارگذاری ویرایشگر...
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div>کلمات کلیدی جدید(با ویرگول جدا کنید)</div>
              <input
                defaultValue={fullData.keywords ? fullData.keywords : ""}
                required={true}
                type="text"
                ref={keywordsRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
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
                  {tag.map((t, index) => {
                    return (
                      <div
                        key={t}
                        className="flex gap-1 text-sm py-2 px-3 rounded-full bg-zinc-100 border-2 border-zinc-300 items-center shadow-sm"
                      >
                        <span className="text-xs text-gray-700">{t}</span>
                        <button
                          type="button"
                          onClick={() => {
                            tagDeleter(index);
                          }}
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
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="tags flex flex-col gap-4">
              <h3 className="font-medium text-gray-700">ویژگی‌ها</h3>
              <div className="tags w-full flex flex-col gap-4">
                <div className="input flex gap-2 items-center">
                  <input
                    type="text"
                    onKeyDown={featureSuber}
                    ref={featuresRef}
                    className="p-3 rounded-lg w-full outline-none border-2 border-zinc-300 focus:border-orange-400 transition-colors duration-200"
                    placeholder="نام ویژگی : توضیح ویژگی"
                  />
                </div>
                <div className="tagResults flex gap-3 justify-start flex-wrap">
                  {feature.map((f, index) => {
                    return (
                      <div
                        key={f}
                        className="flex gap-1 text-sm py-2 px-3 rounded-full bg-purple-100 border-2 border-purple-300 items-center shadow-sm"
                      >
                        <span className="text-xs text-purple-800">{f}</span>
                        <button
                          type="button"
                          onClick={() => {
                            featureDeleter(index);
                          }}
                          className="text-purple-500 hover:text-purple-700 transition-colors duration-200 focus:outline-none"
                          aria-label={`حذف ویژگی ${f}`}
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
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>نوع محصول</div>
              <select
                ref={typeOfProductRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              >
                {fullData.typeOfProduct &&
                fullData.typeOfProduct == "book" ? (
                  <>
                    <option value={"book"}>کتاب</option>
                    <option value={"app"}>اپلیکیشن</option>
                    <option value={"gr"}>فایل گرافیکی</option>
                  </>
                ) : fullData.typeOfProduct &&
                  fullData.typeOfProduct == "app" ? (
                  <>
                    <option value={"app"}>اپلیکیشن</option>
                    <option value={"book"}>کتاب</option>
                    <option value={"gr"}>فایل گرافیکی</option>
                  </>
                ) : (
                  <>
                    <option value={"gr"}>فایل گرافیکی</option>
                    <option value={"book"}>کتاب</option>
                    <option value={"app"}>اپلیکیشن</option>
                  </>
                )}
              </select>
            </div>
            <div className="tags flex flex-col gap-4">
              <h3 className="font-medium text-gray-700">دسته‌بندی‌های محصول</h3>
              {/* Display selected categories as chips */}
              {relCategories.length > 0 && (
                <div className="flex gap-3 justify-start flex-wrap mb-4 p-2 bg-indigo-50 rounded-lg border border-indigo-200 shadow-inner">
                  {relCategories.map((category) => (
                    <div
                      key={category._id}
                      className="flex gap-1 text-sm py-2 px-3 rounded-full bg-indigo-100 border border-indigo-300 items-center shadow-sm"
                    >
                      <span className="text-xs text-indigo-800">
                        {category.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeSelectedCategory(category._id)}
                        className="text-indigo-500 hover:text-indigo-700 transition-colors duration-200 focus:outline-none"
                        aria-label={`حذف دسته‌بندی ${category.title}`}
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
              {/* Search Input for Categories */}
              <input
                type="text"
                placeholder="جستجو برای دسته‌بندی‌ها..."
                value={categorySearchTerm}
                onChange={(e) => setCategorySearchTerm(e.target.value)}
                className="p-3 rounded-lg w-full outline-none border-2 border-zinc-300 focus:border-indigo-400 transition-colors duration-200 mb-4"
              />

              {loadingCategories ? (
                <div className="flex justify-center items-center p-12">
                  <Image
                    alt="loading"
                    width={60}
                    height={60}
                    src={"/loading.svg"}
                    className="animate-spin"
                  />
                </div>
              ) : filteredCategories.length < 1 ? (
                <div className="p-3 text-gray-600">دسته‌ای یافت نشد.</div>
              ) : (
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto border border-zinc-200 rounded-lg p-3 bg-white shadow-sm">
                  {filteredCategories.map((cat) => (
                    <div
                      key={cat._id}
                      className="flex items-center gap-2 px-3 py-2 bg-zinc-50 hover:bg-zinc-100 rounded-md transition-colors duration-200 cursor-pointer"
                    >
                      <input
                        name={`category_${cat._id}`}
                        id={`category_${cat._id}`}
                        type="checkbox"
                        value={`${cat._id}*${cat.title}*${cat.slug}`}
                        onChange={productsCategoriesMan}
                        checked={relCategories.some(
                          (selectedCat) => selectedCat._id === cat._id
                        )}
                        className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`category_${cat._id}`}
                        className="text-gray-800 text-sm font-medium flex-grow cursor-pointer"
                      >
                        {cat.title}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="tags flex flex-col gap-4">
              <h3 className="font-medium text-gray-700">محصولات مرتبط</h3>
              {/* Display selected related products as chips */}
              {selectedRelatedProducts.length > 0 && (
                <div className="flex gap-3 justify-start flex-wrap mb-4 p-2 bg-blue-50 rounded-lg border border-blue-200 shadow-inner">
                  {selectedRelatedProducts.map((product) => (
                    <div
                      key={product._id}
                      className="flex gap-1 text-sm py-2 px-3 rounded-full bg-blue-100 border border-blue-300 items-center shadow-sm"
                    >
                      <span className="text-xs text-blue-800">
                        {product.title}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          removeSelectedRelatedProduct(product._id)
                        }
                        className="text-blue-500 hover:text-blue-700 transition-colors duration-200 focus:outline-none"
                        aria-label={`حذف محصول مرتبط ${product.title}`}
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
              {/* Search Input for Related Products */}
              <input
                type="text"
                placeholder="جستجو برای محصولات مرتبط..."
                value={productSearchTerm}
                onChange={(e) => setProductSearchTerm(e.target.value)}
                className="p-3 rounded-lg w-full outline-none border-2 border-zinc-300 focus:border-blue-400 transition-colors duration-200 mb-4"
              />
              {loadingProducts ? (
                <div className="flex justify-center items-center p-12">
                  <Image
                    alt="loading"
                    width={60}
                    height={60}
                    src={"/loading.svg"}
                    className="animate-spin"
                  />
                </div>
              ) : filteredProducts.length < 1 ? (
                <div className="p-3 text-gray-600">محصولی یافت نشد.</div>
              ) : (
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto border border-zinc-200 rounded-lg p-3 bg-white shadow-sm">
                  {filteredProducts.map((pr) => (
                    <div
                      key={pr._id}
                      className="flex items-center gap-2 px-3 py-2 bg-zinc-50 hover:bg-zinc-100 rounded-md transition-colors duration-200 cursor-pointer"
                    >
                      <input
                        name={`product_${pr._id}`}
                        id={`product_${pr._id}`}
                        type="checkbox"
                        value={pr._id}
                        onChange={productsRelatedMan}
                        checked={relProducts.includes(pr._id)}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`product_${pr._id}`}
                        className="text-gray-800 text-sm font-medium flex-grow cursor-pointer"
                      >
                        {pr.title}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div>وضعیت</div>
              <select
                ref={publishedRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              >
                {fullData.published && fullData.published == true ? (
                  <>
                    <option value={true}>انتشار</option>
                    <option value={false}>پیش‌نویس</option>
                  </>
                ) : (
                  <>
                    <option value={false}>پیش‌نویس</option>
                    <option value={true}>انتشار</option>
                  </>
                )}
              </select>
            </div>
            <button
              type="submit"
              className="cursor-pointer p-2 bg-indigo-600 text-white w-full rounded-md transition-all duration-300 hover:bg-orange-500"
            >
              به روز رسانی
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
