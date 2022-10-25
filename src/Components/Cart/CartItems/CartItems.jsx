import { useContext, useState } from "react";
import { CartContext } from "../../../store/cart-context";

import "./CartItems.scss";

export const CartItems = (props) => {
  const { removeItemCart } = useContext(CartContext);

  const mealPrice = props.singleItem.quantity * props.singleItem.price;

  return (
    <div id="CartItems">
      <div className="orderedItem">
        <h2>{props.singleItem.name}</h2>
        <div>
          <img
            className="trashcan"
            src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"
            alt="delete order"
            onClick={() => {
              removeItemCart(props.singleItem.id);
            }}
          />
        </div>
      </div>
      <div>
        <div className="amountPrice">
          <div>
            <span className="spanPrice">€ {props.singleItem.price}</span>
            <span className="spanQuantity">x{props.singleItem.quantity}</span>
          </div>
          <div>
            <span className="totalMealPrice">€ {mealPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
