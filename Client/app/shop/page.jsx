"use client";

import { useSearchParams } from "next/navigation";

import ShopComp from "@/components/ShopComp";

const ShopPage = () => {
  const searchParams = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const orderBy = searchParams.get("orderBy") || "";
  const type = searchParams.get("type") || "";
  const maxP = searchParams.get("maxP") || "";
  const minP = searchParams.get("minP") || "";
  const categories = searchParams.get("categories") || "";
  const pn = searchParams.get("pn") || "";
  const pgn = searchParams.get("pgn") || "";

  const url = { keyword, orderBy, type, maxP, minP, categories, pn, pgn };

  return (
    <div>
      <>
        <meta charSet="utf-8" />
        <title> فروشگاه </title>
        <meta name="description" content=" فروشگاه " />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="/shop" />
      </>
      <ShopComp url={url} />
    </div>
  );
};

export default ShopPage;
