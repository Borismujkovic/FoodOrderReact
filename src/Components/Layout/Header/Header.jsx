import { Cart } from "../../Cart/Cart/Cart";

import "./Header.scss";

export const Header = (props) => {
  return (
    <div id="header">
      <h1>FoodOrderApp</h1>
      <Cart openModal={props.openModal} />
    </div>
  );
};
