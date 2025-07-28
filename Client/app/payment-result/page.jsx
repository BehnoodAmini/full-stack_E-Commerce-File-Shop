import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import PaymentResultComp from "@/components/PaymentResultComp";

const getAuthData = async (cookieValue) => {
  const goalData = await fetch(
    "https://behnood-fileshop-server.liara.run/api/get-user-data",
    { cache: "no-store", headers: { auth_cookie: cookieValue } }
  );
  const data = await goalData.json();
  if (!data._id) {
    redirect("/login");
  } else {
    return data;
  }
};

const PaymentResultPage = async ({ searchParams }) => {
  const resolvedParams = await searchParams;

  const cookieStore = await cookies();
  const auth_cookie = cookieStore.get("auth_cookie");
  const cookieValue =
    auth_cookie && auth_cookie.value ? auth_cookie.value : undefined;
  const data = await getAuthData(cookieValue);

  return (
    <div>
      <>
        <meta charSet="utf-8" />
        <title> لطفا صبر کنید...</title>
        <meta name="description" content=" لطفا صبر کنید..." />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="/payment-result" />
      </>
      <section className="container mx-auto p-12 flex justify-center items-center">
        <PaymentResultComp
          resolvedParams={resolvedParams}
          cookie={cookieValue}
        />
      </section>
    </div>
  );
};

export default PaymentResultPage;
