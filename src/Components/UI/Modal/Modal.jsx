import React, { useContext, useState } from "react";
import { CartContext } from "../../../store/cart-context";
import { CartItems } from "../../Cart/CartItems/CartItems";

import "./Modal.scss";

export const Modal = (props) => {
  const { orderedItems } = useContext(CartContext);

  const { clearCartItem } = useContext(CartContext);

  const itemsInCart = orderedItems.map((item) => (
    <CartItems singleItem={item} />
  ));

  const sum = orderedItems.reduce(
    (partialSum, a) => partialSum + a.price * a.quantity,
    0
  );

  const buttonDisableClass = `${orderedItems.length < 1 ? "disabled" : ""}`;

  const buttonHandler = (
    <div className="closeModal">
      <button onClick={props.openModal}>Close</button>
      <button
        className={buttonDisableClass}
        onClick={() => {
          if (orderedItems.length >= 1) {
            props.openCheckout();
            props.setDataHandler(orderedItems);
          } else {
          }
        }}
      >
        Confirm
      </button>
    </div>
  );

  const modalContent = (
    <div className="modalCheckout">
      {itemsInCart}
      <div className="priceCheckout">
        <h2>Total Amount</h2>
        <div className="priceCan">
          <h2>€ {sum.toFixed(2)}</h2>
        </div>
      </div>
      {buttonHandler}
    </div>
  );

  return <div id="Modal">{modalContent}</div>;
};
