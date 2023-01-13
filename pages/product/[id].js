import Head from "next/head";
import styles from "../../styles/Product.module.css";
import { useContext, useState } from "react";
import { CartDispatchContext } from "../../contexts/cartContext";
import Image from "next/image";
import Alert from "@mui/material/Alert";

export default function ProductPage({ product }) {
  const dispatch = useContext(CartDispatchContext);
  const [showAlert, setShowAlert] = useState(false);

  const notifyAddToCartIsSuccessful = () => {
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3500);
  };

  const handleAddToCart = () => {
    dispatch({
      type: "add_item",
      data: {
        id: product.id,
        quantity: 1,
      },
    });

    notifyAddToCartIsSuccessful();
  };

  return (
    <>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <section className={styles.product__section}>
          {showAlert && (
            <Alert className={styles.alert}>Item added to cart</Alert>
          )}
          <div className={styles.product__image__column}>
            <div className={styles.product__image__container}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.product__image}
              />
            </div>
          </div>
          <div className={styles.product__details__column}>
            <div className={styles.product__title__and__price__container}>
              <h1 className={styles.product__title}>{product.title}</h1>
              <p className={styles.product__price}>${product.price}</p>
            </div>

            <div className={styles.product__description}>
              <h2>Description</h2>
              <p>{product.description}</p>
            </div>

            <p className={styles.product__reviews}>
              {product.rating.count} reviews
            </p>

            <button
              className={styles.cta__button}
              onClick={handleAddToCart}
              data-testid="add-to-cart-button"
            >
              Add to cart
            </button>
          </div>
        </section>
      </>
    </>
  );
}

export async function getStaticPaths() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${params.id}`
    );
    const product = await response.json();

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}
