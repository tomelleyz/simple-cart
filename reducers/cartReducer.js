export function cartReducer(cart, action) {
  switch (action.type) {
    case "initialise_cart": {
      localStorage.setItem("simpleCart", JSON.stringify(action.value));
      return action.value;
    }
    case "add_item": {
      const itemAlreadyInCart = cart.find((item) => item.id === action.data.id);

      if (itemAlreadyInCart) {
        const updatedCart = cart.map((item) => {
          if (item.id === itemAlreadyInCart.id) {
            return { ...item, quantity: item.quantity + action.data.quantity };
          } else {
            return item;
          }
        });

        localStorage.setItem("simpleCart", JSON.stringify(updatedCart));
        return updatedCart;
      } else {
        const updatedCart = [
          ...cart,
          {
            id: action.data.id,
            quantity: action.data.quantity,
          },
        ];

        localStorage.setItem("simpleCart", JSON.stringify(updatedCart));
        return updatedCart;
      }
    }
    case "remove_item": {
      const updatedCart = cart.filter((item) => item.id !== action.data.id);
      localStorage.setItem("simpleCart", JSON.stringify(updatedCart));
      return updatedCart;
    }
    case "change_quantity": {
      const updatedCart = cart.map((item) => {
        if (item.id === action.data.id) {
          return { ...item, quantity: action.data.quantity };
        } else {
          return item;
        }
      });

      localStorage.setItem("simpleCart", JSON.stringify(updatedCart));
      return updatedCart;
    }
    default: {
      return cart;
    }
  }
}
