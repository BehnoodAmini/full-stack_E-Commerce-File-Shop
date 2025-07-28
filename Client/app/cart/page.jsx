import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import CartPageComp from "@/components/cartPageComp";

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

const CartPage = async () => {
  const cookieStore = await cookies();
  const auth_cookie = cookieStore.get("auth_cookie");
  const cookieValue =
    auth_cookie && auth_cookie.value ? auth_cookie.value : undefined;
  const data = await getAuthData(cookieValue);

  return (
    <main className="container mx-auto">
      <div>
        <meta charSet="utf-8" />
        <title> سبد خرید </title>
        <meta name="description" content=" سبد خرید " />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="/cart" />
      </div>
      <CartPageComp cookie={cookieValue} />
    </main>
  );
};

export default CartPage;
