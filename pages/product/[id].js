import { useRouter } from "next/router";
import { useContext } from "react";
import { CartDispatchContext } from "../../contexts/cartContext";

export default function Product({ product }) {
  const router = useRouter();
  const dispatch = useContext(CartDispatchContext);

  const handleAddToCart = () => {
    dispatch({
      type: "add_item",
      data: {
        id: product.id,
        quantity: 1,
      },
    });

    console.log("item added to cart");
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>{product.title}</h1>
      <button onClick={handleAddToCart}>Add to cart</button>
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
    fallback: true,
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
