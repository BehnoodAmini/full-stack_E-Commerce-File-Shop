import Image from "next/image";
import Link from "next/link";

const getData = async () => {
  const data = await fetch("https://behnood-fileshop-server.liara.run/api/get-active-mid-bans", {
    cache: "no-store",
  });
  return data.json();
};

const MiddleBanner = async () => {
  const data = await getData();

  return (
    <>
      {data.length < 1 ? (
        <></>
      ) : (
        <section className="container mx-auto px-1 flex justify-center xl:justify-between items-center flex-wrap">
          {data.map((banner, i) => (
            <Link className="my-4" href={banner.link} key={i}>
              <Image
                className="rounded-xl"
                alt={banner.imageAlt}
                title={banner.imageAlt}
                width={600}
                height={200}
                src={banner.image}
              />
            </Link>
          ))}
        </section>
      )}
    </>
  );
};

export default MiddleBanner;
