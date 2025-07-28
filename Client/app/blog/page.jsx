"use client";

import { useSearchParams } from "next/navigation";

import BlogPageComp from "@/components/blogPage";

const BlogPage = () => {
  const searchParams = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const pn = searchParams.get("pn") || "";
  const pgn = searchParams.get("pgn") || "";

  const url = { keyword, pn, pgn };

  return (
    <div className="container mx-auto">
            <BlogPageComp url={url}/>
    </div>
  );
};

export default BlogPage;
