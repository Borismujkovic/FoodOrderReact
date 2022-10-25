import CartIcon from "../CartIcon/CartIcon";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../store/cart-context";

import "./Cart.css";

export const Cart = (props) => {
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);

  const { numberOfItems } = useContext(CartContext);

  const btnClasses = `cart ${buttonIsHighlighted ? "bump" : ""} `;

  useEffect(() => {
    if (numberOfItems === 0) {
      return;
    }
    setButtonIsHighlighted(true);

    const timer = setTimeout(() => {
      setButtonIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [numberOfItems]);

  return (
    <div className={btnClasses} onClick={props.openModal}>
      <span className="cartIcon">
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className="badge">{numberOfItems}</span>
    </div>
  );
};
