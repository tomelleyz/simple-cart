import "../styles/globals.css";
import { Inter } from "@next/font/google";
import { useEffect, useReducer, useState } from "react";
import { cartReducer } from "../reducers/cartReducer";
import { CartContext, CartDispatchContext } from "../contexts/cartContext";
import HeaderNavigation from "../components/HeaderNavigation";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("simpleCart"));

    if (savedCart) {
      dispatch({
        type: "initialise_cart",
        value: savedCart,
      });
    } else {
      localStorage.setItem("simpleCart", JSON.stringify([]));
    }
  }, []);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        <main className={inter.className}>
          <HeaderNavigation />
          <Component {...pageProps} />
        </main>
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}
