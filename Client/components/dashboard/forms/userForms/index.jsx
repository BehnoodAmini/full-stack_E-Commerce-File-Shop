"use client";

import { useState, useEffect } from "react";

import AllUsers from "./allUsers";
import FindUser from "./findUser";
import UserDetails from "./userDetails";

const PostsMain = () => {
  const [userCtrl, setUserCtrl] = useState("");
  const [randNumForUserClick, setRandNumForUserClick] = useState(1);
  const [det, setDet] = useState(
    <AllUsers
      setUserCtrl={setUserCtrl}
      setRandNumForUserClick={setRandNumForUserClick}
    />
  );

  useEffect(() => {
    if (userCtrl != "") {
      setDet(<UserDetails goalId={userCtrl} />);
    }
  }, [randNumForUserClick]);

  return (
    <div className="flex flex-col gap-8 p-2">
      <section className="flex justify-center md:justify-between items-center gap-2 flex-wrap">
        <h1 className="text-blue-500 text-lg">کاربرها</h1>
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() =>
              setDet(
                <AllUsers
                  setUserCtrl={setUserCtrl}
                  setRandNumForUserClick={setRandNumForUserClick}
                />
              )
            }
            className="cursor-pointer flex justify-center items-center w-32 h-10 rounded-md bg-indigo-600 text-white transition-all duration-300 hover:bg-orange-500"
          >
            همه
          </button>
          <button
            onClick={() => setDet(<FindUser />)}
            className="cursor-pointer flex justify-center items-center w-32 h-10 rounded-md bg-indigo-600 text-white transition-all duration-300 hover:bg-orange-500"
          >
            پیدا کردن کاربر
          </button>
        </div>
      </section>
      <section>{det}</section>
    </div>
  );
};

export default PostsMain;
