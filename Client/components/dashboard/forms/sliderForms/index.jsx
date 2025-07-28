"use client";

import { useState, useEffect } from "react";

import AllSliders from "./allSliders";
import NewSlider from "./newSlider";
import SliderDetails from "./sliderDetails";

const SliderAll = () => {
  const [midBanDetCtrl, setMidBanDetCtrl] = useState("");
  const [randNumForBannerClick, setRandNumForBannerClick] = useState(1);
  const [det, setDet] = useState(
    <AllSliders
      setMidBanDetCtrl={setMidBanDetCtrl}
      setRandNumForBannerClick={setRandNumForBannerClick}
    />
  );

  useEffect(() => {
    if (midBanDetCtrl != "") {
      setDet(<SliderDetails midBanId={midBanDetCtrl} />);
    }
  }, [randNumForBannerClick]);

  return (
    <div className="flex flex-col gap-8 p-2">
      <section className="flex justify-center md:justify-between items-center gap-2 flex-wrap">
        <h1 className="text-blue-500 text-lg">اسلایدرها</h1>
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() =>
              setDet(
                <AllSliders
                  setMidBanDetCtrl={setMidBanDetCtrl}
                  setRandNumForBannerClick={setRandNumForBannerClick}
                />
              )
            }
            className="cursor-pointer flex justify-center items-center w-32 h-10 rounded-md bg-indigo-600 text-white transition-all duration-300 hover:bg-orange-500"
          >
            همه
          </button>
          <button
            onClick={() => setDet(<NewSlider />)}
            className="cursor-pointer flex justify-center items-center w-32 h-10 rounded-md bg-indigo-600 text-white transition-all duration-300 hover:bg-orange-500"
          >
            اسلایدر جدید
          </button>
        </div>
      </section>
      <section>{det}</section>
    </div>
  );
};

export default SliderAll;
