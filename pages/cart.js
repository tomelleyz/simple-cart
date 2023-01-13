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
  });

  return (
    <>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Empty cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id}>
              <h2>Item ID: {item.id}</h2>
              <p>Quantity: {item.quantity}</p>
              {products ? (
                <>
                  <p>Details: {itemDetails(item.id).title}</p>
                  <Image
                    src={itemDetails(item.id).image}
                    alt={itemDetails(item.id).title}
                    width={200}
                    height={100}
                  />
                  <p>Price: ${itemCost(item.id, item.quantity).toFixed(2)}</p>
                </>
              ) : (
                <div>Loading...</div>
              )}

              <button onClick={() => handleRemoveFromCart(item.id)}>
                delete
              </button>

              <IncreaseDecreaseQuantity
                id={item.id}
                initialQuantity={item.quantity}
              />
            </div>
          ))}

          <h4>
            Total cost:
            {products ? <span> {totalCartCost().toFixed(2)}</span> : null}
          </h4>
        </>
      )}
    </>
  );
}
