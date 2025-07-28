import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FaRegEye } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";

import BreadCrumb from "@/components/breadCrumb";
import MostViewedPosts from "@/components/mostViewedPosts";
import RelatedPosts from "@/components/sliders/related-posts";
import CommentsManager from "@/components/commentsManagement";
import SearchBlog from "@/components/search-blog";
import CommentCounter from "@/components/commentCounter";

const getData = async (slug) => {
  const data = await fetch(
    `https://behnood-fileshop-server.liara.run/api/get-post/${slug}`,
    {
      cache: "no-store",
    }
  );
  return data.json();
};

const getProductsData = async (slug) => {
  const data = await fetch(
    `https://behnood-fileshop-server.liara.run/api/get-most-viewed-products`,
    {
      cache: "no-store",
    }
  );
  return data.json();
};

const SingleBlog = async ({ params }) => {
  const resolvedParams = await params;
  const data = await getData(resolvedParams.slug);
  if (!data._id && !data.msg) {
    notFound();
  }

  const productsData = await getProductsData();
  const commentProps = { src_id: data._id, typeOfModel: "post" };

  //SEO
  const postSlug = `/blog/${data.slug}`;
  const postShortDesc = data.shortDesc;
  const postTitle = data.title;
  const postKeywords = data.keywords;

  return (
    <div className="flex justify-between items-start container mx-auto gap-2">
      <meta charSet="utf-8" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {data.msg ? (
        <>
          <div>
            <title> مقاله هنوز منتشر نشده است </title>
            <link rel="canonical" href="/blog" />
          </div>
          <div>مقاله هنوز منتشر نشده است...</div>
        </>
      ) : (
        <div className="flex items-start justify-between gap-2 w-full flex-wrap md:flex-nowrap my-12 px-2 md:p-0 md:m-0">
          <>
            <title>{postTitle}</title>
            <meta name="description" content={postShortDesc} />
            <meta name="keywords" content={postKeywords} />
            <link rel="canonical" href={postSlug} />
          </>
          <main className="w-full">
            {" "}
            <div className="flex flex-col gap-12 max-[424px]:text-xs">
              <BreadCrumb
                secondTitle={"وبلاگ"}
                secondLink={"/blog"}
                title={data.title}
              />
              <section className="flex justify-center items-center">
                <Image
                  className="rounded-xl"
                  src={data.image}
                  alt={data.imageAlt}
                  title={data.imageAlt}
                  width={800}
                  height={400}
                  priority={true}
                />
              </section>
              <section className="flex flex-col gap-6">
                <h1 className="text-blue-400 text-lg">{data.title}</h1>
                <div className="flex justify-start items-center gap-4 max-md:flex-col max-md:items-start text-sm flex-wrap">
                  <div className="bg-zinc-100 rounded-md p-2 flex justify-between items-center gap-2">
                    <FaRegEye className="w-6 h-6 text-black" />
                    <span>تعداد بازدید:</span>
                    <span>{data.pageView}</span>
                  </div>
                  <div className="bg-zinc-100 rounded-md p-2 flex justify-between items-center gap-2">
                    <FaRegComment className="w-6 h-6 text-black" />
                    <span>تعداد دیدگاه:</span>
                    <CommentCounter goalId={data._id} />
                  </div>
                  <div className="bg-zinc-100 rounded-md p-2 flex justify-between items-center gap-2">
                    <SlCalender className="w-6 h-6 text-black" />
                    <span>آخرین بروزرسانی:</span>
                    <span>{data.UpdatedAt}</span>
                  </div>
                </div>
              </section>
              <section className="flex flex-col gap-6">
                <h2 className="text-xl">توضیحات کامل</h2>
                <div
                  className="custom-tiptap-content leading-9 w-[96%] text-justify"
                  dangerouslySetInnerHTML={{ __html: data.longDesc }}
                />
              </section>
              <section>
                <RelatedPosts
                  typeOfModel="post"
                  relPostsData={data.relatedPosts}
                  title={"مقالات مرتبط"}
                />
              </section>
              <CommentsManager commentProps={commentProps} />
            </div>
          </main>
          <aside className="mt-8 md:mt-0 w-full md:w-80 md:max-w-80 rounded-md flex flex-col gap-12">
            <SearchBlog />
            <div className="flex flex-col gap-4 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
              <h3 className="text-blue-500">توضیحات خلاصه</h3>
              <p className="leading-8 text-base sm:text-sm text-justify">
                {data.shortDesc}
              </p>
            </div>
            <div className="flex flex-col gap-4 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
              <h3 className="text-blue-500">برچسب‌ها</h3>
              <div className="flex justify-start items-center gap-2 flex-wrap">
                {data.tags.length < 1 ? (
                  <div className="flex justify-center items-center p-3">
                    بدون برچسب
                  </div>
                ) : (
                  data.tags.map((ta, i) => (
                    <Link
                      key={i}
                      href={`/blog?keyword=${escape(ta)}`}
                      className="p-2 flex justify-center items-center rounded-md text-base sm:text-sm bg-zinc-100 transition-all duration-300 hover:text-white! hover:bg-orange-500"
                    >
                      #{ta}
                    </Link>
                  ))
                )}
              </div>
            </div>
            <MostViewedPosts />
            <div className="flex flex-col gap-4 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
              <h3 className="text-blue-500">پر فروش‌ترین محصولات</h3>
              <ul className="flex flex-col gap-3">
                {productsData.length < 1 ? (
                  <div></div>
                ) : (
                  productsData.map((da, i) => (
                    <li key={i}>
                      <Link
                        href={`/shop/${da.slug}`}
                        className="p-2 flex justify-start items-center text-base sm:text-sm border-r-2 border-zinc-600 hover:text-indigo-600! hover:border-indigo-600 transition-all duration-300"
                      >
                        {da.title}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
