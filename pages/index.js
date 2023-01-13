import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Simple Cart" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <section className={styles.header}>
          <h1>Simple Cart</h1>
          <p>
            We have carefully selected the best products for you so your
            don&apos;t have to sweat it. Browse our collections and purchase
            whatever catches your fancy.
          </p>
        </section>

        <section className={styles.products__section__container}>
          <div className={styles.products__section}>
            {products.map((product) => (
              <div key={product.id} className={styles.product}>
                <Link href={`/product/${product.id}`}>
                  <div className={styles.product__image__container}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.product__image}
                    />
                  </div>
                  <p className={styles.product__title}>{product.title}</p>
                  <p className={styles.product__price}>${product.price}</p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </>
    </>
  );
}

export async function getStaticProps() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const response = await fetch("https://fakestoreapi.com/products", options);
  const products = await response.json();

  return {
    props: {
      products,
    },
  };
}
