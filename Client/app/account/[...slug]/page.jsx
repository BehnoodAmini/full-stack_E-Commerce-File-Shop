import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import AccountMainComp from "@/components/account/accountMain";

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

const AccountPage = async ({ params }) => {
  const resolvedParams = await params;

  const cookieStore = await cookies();
  const auth_cookie = cookieStore.get("auth_cookie");
  const cookieValue =
    auth_cookie && auth_cookie.value ? auth_cookie.value : undefined;
  const data = await getAuthData(cookieValue);
  // if (!data._id) {
  //   redirect("/login");
  // }

  return (
    <section className="container mx-auto flex justify-center items-center">
      <AccountMainComp items={resolvedParams} />
    </section>
  );
};

export default AccountPage;
