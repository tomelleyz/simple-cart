import { useContext, useEffect, useState } from "react";
import { CartContext, CartDispatchContext } from "../contexts/cartContext";

export default function IncreaseDecreaseQuantity({ id, initialQuantity }) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const dispatch = useContext(CartDispatchContext);
  const cart = useContext(CartContext);

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const handleQuantityChange = () => {
      dispatch({
        type: "change_quantity",
        data: {
          id,
          quantity,
        },
      });
    };

    handleQuantityChange();
  }, [quantity, dispatch, id]);

  return (
    <div>
      <button onClick={decrease}>-</button>
      <span> {quantity} </span>
      <button onClick={increase}>+</button>
    </div>
  );
}
