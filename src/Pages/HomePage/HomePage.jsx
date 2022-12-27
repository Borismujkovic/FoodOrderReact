import React, { useContext, useEffect, useState } from "react";
import { Description } from "../../Components/Layout/Description/Description";
import { Header } from "../../Components/Layout/Header/Header";
import { Meals } from "../../Components/Meals/Meals/Meals";
import { Modal } from "../../Components/UI/Modal/Modal";
import { CartProvider } from "../../store/cartProvider";
import "./HomePage.scss";
import { CartContext } from "../../store/cart-context";
import { Checkout } from "../../Components/Cart/Checkout/Checkout";

export const HomePage = () => {
  const [meals, setMeals] = useState([]);
  const [httpError, setHttpError] = useState(false);
  const [ordered, setOrdered] = useState(null);

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  const { clearCartItem } = useContext(CartContext);

  const openModal = () => {
    setModalOpen(!modalOpen);
  };

  const openCheckout = () => {
    setCheckoutOpen(!checkoutOpen);
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://orderapp-81935-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          image: responseData[key].image,
        });
      }
      setMeals(loadedMeals);
    };

    console.log(meals);

    fetchMeals().catch((error) => {
      setHttpError(error.message);
    });

    fetchMeals().catch((error) => {
      setHttpError(error.message);
    });
  }, []);

  const setDataHandler = (arr) => {
    setOrdered(arr);
  };

  const submitOrderHandler = async (userData) => {
    await fetch(
      "https://orderapp-81935-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          order: ordered,
        }),
      }
    );
    setModalOpen(false);
    setCheckoutOpen(false);
    setIsSubmited(true);
    clearCartItem();
  };

  const submitedOrderHandler = () => {
    setIsSubmited(false);
  };

  const modalContent = (
    <React.Fragment>
      {modalOpen && (
        <Modal
          openModal={openModal}
          openCheckout={openCheckout}
          setDataHandler={setDataHandler}
        />
      )}
      {checkoutOpen && (
        <Checkout openCheckout={openCheckout} onConfirm={submitOrderHandler} />
      )}
    </React.Fragment>
  );

  const didSubmitModalContent = (
    <React.Fragment>
      <div className="submitedOrder">
        <div className="actions">
          <p>Succesfully sent the order! :)</p>
          <button className="button" onClick={submitedOrderHandler}>
            Close
          </button>
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <CartProvider>
      <div id="HomePage">
        {!isSubmited && modalContent}
        {isSubmited && didSubmitModalContent}
        <Header openModal={openModal} />
        <img
          className="coverImg"
          src="https://www.precon-food.com/wp-content/uploads/header-home-precon-food.jpg"
          alt="coverImage"
        />
        <Description />
        <div>
          <Meals meals={meals} />
        </div>  
      </div>
    </CartProvider>
  );
};
