"use client";

const DCBtn = ({
  title,
  content,
  setContentChanger,
  colorChanger,
  setColorChanger,
}) => {
  const goTopCtrl = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={() => {
        setContentChanger(content);
        setColorChanger(content);
        goTopCtrl();
      }}
      className={
        colorChanger == content
          ? "cursor-pointer rounded-md w-40 h-12 flex justify-center items-center bg-indigo-600 text-white transition-all duration-300 hover:bg-indigo-500"
          : "cursor-pointer rounded-md w-40 h-12 flex justify-center items-center bg-orange-500 text-white transition-all duration-300 hover:bg-indigo-500"
      }
    >
      {title}
    </button>
  );
};

export default DCBtn;
