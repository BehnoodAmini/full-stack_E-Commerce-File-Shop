"use client";

import { AppContext } from "../appContext";
import { useState,useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ContextProvider = ({ children }) => {
  const [cartNumber, setCartNumber] = useState(-1);
    const auth_Cookie = Cookies.get("auth_cookie");
  
    useEffect(() => {
      const url = "https://behnood-fileshop-server.liara.run/api/cart-number";
      axios
        .get(url, { headers: { auth_cookie: auth_Cookie } })
        .then((d) => setCartNumber(d.data.number))
        .catch((e) => {
          setCartNumber(0);
          console.log(e);
        });
    }, []);

  return (
    <AppContext.Provider value={{ cartNumber, setCartNumber }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
