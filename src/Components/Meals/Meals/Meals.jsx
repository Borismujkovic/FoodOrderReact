import { MealItem } from "../MealItem/MealItem";

import "./Meals.css";

export const Meals = (props) => {
  return (
    <div id="Meals">
      <div>
        <h2>Something delicious to eat</h2>
      </div>
      {props.meals.map((e) => (
        <MealItem singleMeal={e} key={e.id} />
      ))}
    </div>
  );
};
