import { useState, useRef, useContext } from "react";
import { CartContext } from "../../../store/cart-context";

import "./MealItem.scss";

export const MealItem = (props) => {
  const amountInputRef = useRef();

  const { addItemToCart } = useContext(CartContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    const selectedMeal = {
      quantity: enteredAmountNumber,
      ...props.singleMeal,
    };

    addItemToCart(selectedMeal);
  };

  return (
    <div
      id="MealItem"
      key={props.singleMeal.id ? props.singleMeal.id : new Date().getTime()}
    >
      <div className="singleMeal">
        <h3 className="mealName">{props.singleMeal.name}</h3>
        <p className="mealDescription">{props.singleMeal.description}</p>
        <h3 className="mealPrice">{props.singleMeal.price}$</h3>
      </div>
      <div>
        <img className="singleMealImg" src={props.singleMeal.image} alt="" />
      </div>
      <div className="addAmount">
        <form action="" className="form" onSubmit={submitHandler}>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input
              ref={amountInputRef}
              id="amount"
              type="number"
              min="1"
              max="5"
              defaultValue="1"
            />
          </div>
          <div>
            <button>+ Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};
