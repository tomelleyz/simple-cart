import { useContext } from "react";
import IncreaseDecreaseQuantity from "../components/IncreaseDecreaseQuantity";
import { CartContext, CartDispatchContext } from "../contexts/cartContext";

export default function Cart() {
  const cart = useContext(CartContext);
  const dispatch = useContext(CartDispatchContext);

  const handleRemoveFromCart = (id) => {
    dispatch({
      type: "remove_item",
      data: {
        id,
      },
    });

    console.log("item removed from cart: ", id);
  };

  return (
    <>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Empty cart</p>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            <h2>Item ID: {item.id}</h2>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleRemoveFromCart(item.id)}>
              delete
            </button>

            <IncreaseDecreaseQuantity
              id={item.id}
              initialQuantity={item.quantity}
            />
          </div>
        ))
      )}
    </>
  );
}
