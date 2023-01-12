import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";

export default function HeaderNavigation() {
  const cart = useContext(CartContext);

  return (
    <nav style={{ display: "flex", gap: "16px" }}>
      <Link href="/">Home</Link>
      <Link href="/cart">
        Cart <span>{cart.length > 0 ? `(${cart.length})` : null}</span>
      </Link>
    </nav>
  );
}
