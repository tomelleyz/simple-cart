import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import IncreaseDecreaseQuantity from "../components/IncreaseDecreaseQuantity";
import { CartContext, CartDispatchContext } from "../contexts/cartContext";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

export default function Cart() {
  const cart = useContext(CartContext);
  const dispatch = useContext(CartDispatchContext);
  const [products, setProducts] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const notifyRemoveFromCartIsSuccessful = () => {
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3500);
  };

  const handleRemoveFromCart = (id) => {
    dispatch({
      type: "remove_item",
      data: {
        id,
      },
    });

    notifyRemoveFromCartIsSuccessful();
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
      {showAlert && (
        <Alert className={styles.alert}>Item removed from cart</Alert>
      )}

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
                <Grid container spacing={{ xs: 1, sm: 2, md: 4 }}>
                  <Grid item xs={3}>
                    <Skeleton variant="rounded" width="100%" height="10rem" />
                  </Grid>
                  <Grid
                    item
                    container
                    xs={9}
                    direction="column"
                    justifyContent="space-between"
                  >
                    <Grid item>
                      <Skeleton variant="text" height="1.5rem" />
                      <Skeleton variant="text" width="60%" height="1.5rem" />
                    </Grid>
                    <Grid item>
                      <Skeleton variant="rounded" height="2rem" />
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </div>
          ))}

          <div className={styles.cart__total__cost__section}>
            <p>Total cost:</p>
            {products ? (
              <p> {totalCartCost().toFixed(2)}</p>
            ) : (
              <Skeleton
                variant="text"
                width={55}
                sx={{ fontSize: "1.125rem" }}
              />
            )}
          </div>
        </>
      )}
    </section>
  );
}
