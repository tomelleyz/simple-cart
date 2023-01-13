import styles from "../styles/IncreaseDecreaseQuantity.module.css";
import { useContext, useEffect, useState } from "react";
import { CartDispatchContext } from "../contexts/cartContext";

export default function IncreaseDecreaseQuantity({ id, initialQuantity }) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const dispatch = useContext(CartDispatchContext);

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
    <div className={styles.quantity__control}>
      <button onClick={decrease} disabled={quantity <= 1}>
        -
      </button>
      <span> {quantity} </span>
      <button onClick={increase}>+</button>
    </div>
  );
}
