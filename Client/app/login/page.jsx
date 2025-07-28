import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LoginForm from "@/components/auth/loginForm";

const getAuthData = async (cookieValue) => {
  const goalData = await fetch(
    "https://behnood-fileshop-server.liara.run/api/get-user-data",
    { cache: "no-store", headers: { auth_cookie: cookieValue } }
  );
  const data = await goalData.json();
  if (data._id) {
    redirect("/account/info");
  } else {
    return data;
  }
};

const LoginPage = async () => {
  const cookieStore = await cookies();
  const auth_cookie = cookieStore.get("auth_cookie");
  const cookieValue =
    auth_cookie && auth_cookie.value ? auth_cookie.value : undefined;
  const data = await getAuthData(cookieValue);
  // if (data._id) {
  //   redirect("/account/info");
  // }

  return (
    <div>
      <>
        <meta charSet="utf-8" />
        <title> ورود به حساب </title>
        <meta name="description" content=" ورود به حساب " />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="/login" />
      </>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
