import Head from "next/head";
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
        <h1>Simple Cart</h1>
        <h2>All Products</h2>
        {products.map((product) => (
          <section key={product.id}>
            <h4>{product.title}</h4>
            <p>
              <strong>Price: $</strong>
              {product.price}
            </p>
            <Link href={`/product/${product.id}`}>View item</Link>
          </section>
        ))}
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
