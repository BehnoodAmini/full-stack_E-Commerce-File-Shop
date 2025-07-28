import CatBox from "./Box";

const getData = async () => {
  const data = await fetch("https://behnood-fileshop-server.liara.run/api/get-active-categories", {
    cache: "no-store",
  });
  return data.json();
};

const Categories = async () => {
  const data = await getData();
  return (
    <>
      {data.length < 1 ? (
        <div></div>
      ) : (
        <section className="container mx-auto flex justify-center sm:justify-between items-center flex-wrap gap-2 gap-x-8">
          {data.map((da, i) => (
            <CatBox key={i} data={da} />
          ))}
        </section>
      )}
    </>
  );
};

export default Categories;
