import React from "react";

export const CartContext = React.createContext({
  orderedItems: [],
  totalAmount: 0,
  addItemToCart: (item) => {},
  removeItemCart: (id) => {},
  clearCart: () => {},
  numberOfItems: 0,
  clearCartItem: () => {},
});
