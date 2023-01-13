import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import IncreaseDecreaseQuantity from "../components/IncreaseDecreaseQuantity";
import { CartContext, CartDispatchContext } from "../contexts/cartContext";

export default function Cart() {
  const cart = useContext(CartContext);
  const dispatch = useContext(CartDispatchContext);
  const [products, setProducts] = useState(null);

  const handleRemoveFromCart = (id) => {
    dispatch({
      type: "remove_item",
      data: {
        id,
      },
    });

    console.log("item removed from cart: ", id);
  };

  const itemDetails = (id) => {
    const item = products.find((product) => product.id === id);

    return item;
  };

  const itemCost = (id, quantity) => {
    const item = products.find((product) => product.id === id);
    const total = item.price * quantity;

    return total;
  };

  const totalCartCost = () => {
    const itemsCosts = cart.map((item) => itemCost(item.id, item.quantity));
    const total = itemsCosts.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return total;
  };

  async function fetchProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    if (products) {
      setProducts(products);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className={styles.cart__section} data-testid="cart-container">
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Empty cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className={styles.cart__item__container}>
              {products ? (
                <>
                  <div className={styles.cart__item__image__container}>
                    <Image
                      src={itemDetails(item.id).image}
                      alt={itemDetails(item.id).title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.cart__item__image}
                    />
                  </div>

                  <div className={styles.cart__item__title__and__quantity}>
                    <p>{itemDetails(item.id).title}</p>

                    <IncreaseDecreaseQuantity
                      id={item.id}
                      initialQuantity={item.quantity}
                    />
                  </div>

                  <div
                    className={styles.cart__item__price__and__remove__button}
                  >
                    <p className={styles.cart__item__price}>
                      ${itemCost(item.id, item.quantity).toFixed(2)}
                    </p>
                    <button
                      className={styles.remove__item__button}
                      onClick={() => handleRemoveFromCart(item.id)}
                      data-testid={`remove-from-cart-button-product-${item.id}`}
                    >
                      Remove
                    </button>
                  </div>
                </>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          ))}

          <div className={styles.cart__total__cost__section}>
            <p>Total cost:</p>
            {products ? <p> {totalCartCost().toFixed(2)}</p> : null}
          </div>
        </>
      )}
    </section>
  );
}
