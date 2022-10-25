import { useState } from "react";
import { CartContext } from "./cart-context";

export const CartProvider = (props) => {
  const [orderedItems, setOrderedItems] = useState([]);
  const [numberOfItems, setNumberOfItems] = useState(0);

  const findNumberOfSelectedItems = (array) => {
    // const initialValue = 0
    // const numberOfSelectedItems = orderedItems.reduce(
    //     (previousValue, currentValue) => previousValue + currentValue.quantity,
    //     initialValue)
    //     console.log(numberOfSelectedItems + 1);

    const itemsQuantity = array.map((item) => item.quantity);

    const sum = itemsQuantity.reduce((partialSum, a) => partialSum + a, 0);

    setNumberOfItems(sum);
  };

  const addItemToCart = (item) => {
    if (orderedItems.some((orderedItem) => orderedItem.id === item.id)) {
      const index = orderedItems.findIndex(
        (orderedItem) => orderedItem.id === item.id
      );
      const filteredItems = [...orderedItems];
      filteredItems.splice(index, 1, item);
      setOrderedItems(filteredItems);
      findNumberOfSelectedItems(filteredItems);
    } else {
      setOrderedItems([...orderedItems, item]);
      findNumberOfSelectedItems([...orderedItems, item]);
    }
  };

  const removeItemCart = (id) => {
    const filteredArray = orderedItems.filter((item) => item.id !== id);
    setOrderedItems(filteredArray);
    console.log("object");
  };

  const clearCartItem = () => {
    setOrderedItems([]);
    setNumberOfItems(0);
    console.log("WORKING");
  };

  return (
    <CartContext.Provider
      value={{
        orderedItems,
        setOrderedItems,
        addItemToCart,
        removeItemCart,
        numberOfItems,
        setNumberOfItems,
        clearCartItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
