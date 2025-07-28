import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import MainDashboard from "@/components/dashboard/mainDashboard";

const getAuthData = async (cookieValue) => {
  const goalData = await fetch(
    "https://behnood-fileshop-server.liara.run/api/get-user-admin-data",
    { cache: "no-store", headers: { auth_cookie: cookieValue } }
  );
  const data = await goalData.json();
  if (!data._id) {
    notFound();
  } else {
    return data;
  }
};

const Page = async () => {
  const cookieStore = await cookies();
  const auth_cookie = cookieStore.get("auth_cookie");
  if (!auth_cookie || auth_cookie.length < 10) {
    notFound();
  }
  const cookieValue =
    auth_cookie && auth_cookie.value ? auth_cookie.value : undefined;
  const data = await getAuthData(cookieValue);

  return (
    <div>
      <>
        <meta charSet="utf-8" />
        <title> داشبورد مدیریتی </title>
        <meta name="description" content=" داشبورد مدیریتی " />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="/dashboard" />
      </>
      <MainDashboard />
    </div>
  );
};

export default Page;
