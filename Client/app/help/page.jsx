const Page = () => {
  return (
    <div>
      <>
        <meta charSet="utf-8" />
        <title> قوانین و... </title>
        <meta name="description" content=" قوانین و... " />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="/help" />
      </>
      <section className="container mx-auto p-12 flex justify-center items-center gap-4 flex-wrap">
        <div className="px-8 py-4 rounded-md bg-orange-500 text-white">
          قوانین سایت
        </div>
        <div className="px-8 py-4 rounded-md bg-orange-500 text-white">
          حریم خصوصی
        </div>
        <div className="px-8 py-4 rounded-md bg-orange-500 text-white">
          سوالات متداول
        </div>
        <div className="px-8 py-4 rounded-md bg-orange-500 text-white">
          چگونه خرید کنم؟
        </div>
      </section>
    </div>
  );
};

export default Page;
